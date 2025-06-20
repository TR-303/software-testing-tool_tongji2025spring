<script setup>
import { ref, onMounted } from 'vue'

const runningFiles = ref({})  // 记录每个文件的运行状态
const running = ref(false)  // 全局运行状态
const groups = ref([])
const results = ref({})
const allPassed = ref(null)
const tooltip = ref({ show: false, x: 0, y: 0, content: '' })
const activeTab = ref('test')  // 'test' 或 'api'
const activeApi = ref('IT_API_001')

const apiDocs = {
  'IT_MDL_001': {
    title: 'tryParseToken',
    desc: '模块间集成：Token解码',
    params: ['username: 用户名', 'email: 电子邮箱', 'phoneNumber: 手机号码', 'avatar: 头像URL'],
    returns: '200: 成功, 401: 未授权',
    notes: '以不同的Token请求获取用户基本信息的接口，从而验证Token鉴权模块与用户模块的集成情况。'
  },
  'IT_API_001': {
    title: 'PUT /api/user/resume',
    desc: '更新用户个人简历',
    params: ['school: 学校名称', 'grade: 年级', 'skillDescription: 技能描述'],
    returns: '200: 简历更新成功, 400: 参数错误',
    notes: '所有字段都为必填项。年级必须为合法值（如大一、大二等）。'
  },
  'IT_API_002': {
    title: 'POST /api/groups/filter',
    desc: '按条件筛选小组',
    params: [
      'keyword: 搜索关键词',
      'maxVolume: 最大容量',
      'minVolume: 最小容量',
      'createdBefore: 创建时间上限',
      'createdAfter: 创建时间下限'
    ],
    returns: '200: 返回符合条件的小组列表',
    notes: '所有筛选条件都是可选的。日期格式为 YYYY-MM-DD。'
  },
  'IT_API_003': {
    title: 'POST /api/groups',
    desc: '创建新组',
    params: [
      'name: 组名',
      'description: 描述',
      'volume: 容量限制',
      'visibility: 可见性',
      'approvalRequired: 是否需要批准'
    ],
    returns: '200: 创建成功, 400: 参数错误',
    notes: '容量必须为正整数。visibility 和 approvalRequired 必须为布尔值。'
  },
  'IT_API_004': {
    title: 'POST /api/groups/{group_id}/apply',
    desc: '申请加入小组',
    params: [
      'group_id: 目标组ID',
      'description: 申请描述'
    ],
    returns: '200: 申请成功, 400: 参数错误',
    notes: '不能重复申请已加入的组。description 不能为空。'
  },
  'IT_API_005': {
    title: 'GET /api/groups/{group_id}/{member_id}',
    desc: '查看组员个人信息',
    params: [
      'group_id: 组ID',
      'member_id: 目标成员ID'
    ],
    returns: '200: 返回成员信息, 400: 参数错误',
    notes: '必须是同组成员才能查看。'
  },
  'IT_API_006': {
    title: 'DELETE /api/groups/{group_id}',
    desc: '解散小组',
    params: ['group_id: 目标组ID'],
    returns: '200: 解散成功, 400: 参数错误',
    notes: '仅组长可以解散小组。解散后数据不可恢复。'
  },
  // 'IT_ET_001': {
  //   title: 'POST /api/groups/match',
  //   desc: 'AI匹配推荐小组',
  //   params: ['无'],
  //   returns: '200: 返回推荐小组列表',
  //   notes: '基于用户画像和组画像进行智能匹配。可能返回空列表。'
  // }
}

async function prepareDB() {
  await fetch('http://localhost:5001/prepare_db', { method: 'POST' })
}

async function loadGroups() {
  const caseFiles = ['IT_MDL_001_001.json','IT_MDL_001_002.json',
    'IT_API_001_001.json','IT_API_001_002.json','IT_API_001_003.json',
    'IT_API_002_001.json','IT_API_002_002.json','IT_API_002_003.json',
    'IT_API_003_001.json','IT_API_003_002.json','IT_API_003_003.json',
    'IT_API_004_001.json','IT_API_004_002.json','IT_API_004_003.json','IT_API_004_004.json',
    'IT_API_005_001.json','IT_API_005_002.json','IT_API_005_003.json','IT_API_005_004.json',
    'IT_API_006_001.json','IT_API_006_002.json','IT_API_006_003.json',
    // 'IT_ET_001_001.json','IT_ET_001_002.json'
  ]
  const groupMap = {}
  for (const file of caseFiles) {
    const group = file.split('_').slice(0,3).join('_')
    if (!groupMap[group]) groupMap[group] = []
    const cases = await fetch(`/test_cases/${file}`).then(r => r.json())
    groupMap[group].push({ file, cases })
  }
  groups.value = Object.entries(groupMap).map(([group, files]) => ({ group, files }))
}

async function runGroup(file) {
  runningFiles.value[file] = true
  running.value = true
  const caseId = file.replace('.json','')
  const res = await fetch(`http://localhost:5001/run_inttest?case_id=${caseId}`)
  results.value[file] = await res.json()
  runningFiles.value[file] = false
  running.value = false
}

async function runAll() {
  running.value = true
  allPassed.value = null
  results.value = {}
  for (const group of groups.value) {
    for (const f of group.files) {
      await runGroup(f.file)
    }
  }
  allPassed.value = Object.values(results.value).flat().every(r => r.result === '通过')
  running.value = false
}

function showTooltip(event, content) {
  tooltip.value = {
    show: true,
    x: event.clientX + 10,
    y: event.clientY + 10,
    content: typeof content === 'object' ? JSON.stringify(content, null, 2) : String(content)
  }
}
function hideTooltip() {
  tooltip.value.show = false
}

onMounted(async () => {
  loadGroups()
  await prepareDB()
  await loadGroups()
})
</script>

<template>
  <div class="mb-8 p-8 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-gray-900 mb-4 border-l-4 border-blue-500 pl-4">集成测试</h1>
    
    <!-- Tab 导航 -->
    <div class="border-b border-gray-200 mb-4">
      <nav class="flex space-x-8" aria-label="Tabs">
        <button
          @click="activeTab = 'test'"
          :class="[
            activeTab === 'test'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
          ]"
        >
          测试总览
        </button>
        <button
          @click="activeTab = 'api'"
          :class="[
            activeTab === 'api'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
          ]"
        >
          接口详情
        </button>
      </nav>
    </div>

    <!-- 测试运行页面 -->
    <div v-if="activeTab === 'test'" class="space-y-6">
      <div class="flex justify-between items-center">
        <div class="text-base text-gray-700">
          支持分组展示、分组运行和一键全部运行
        </div>
        <div class="flex items-center space-x-4">
          <button 
            @click="runAll" 
            :disabled="running" 
            class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition"
          >
            {{ running ? '全部测试中...' : '一键全部运行' }}
          </button>
          <div v-if="allPassed !== null" class="font-medium" :class="allPassed ? 'text-green-600' : 'text-red-600'">
            {{ allPassed ? '✓ 全部通过' : '✗ 有失败用例' }}
          </div>
        </div>
      </div>
      
      <!-- 测试组 -->
      <div class="space-y-8">
        <div 
          v-for="group in groups" 
          :key="group.group" 
          class="border rounded-lg overflow-hidden shadow-sm"
        >
          <div class="bg-gray-50 px-4 py-3 border-b">
            <h2 class="font-bold text-lg text-gray-800">{{ group.group }}</h2>
          </div>
          
          <div class="divide-y">
            <div 
              v-for="f in group.files" 
              :key="f.file" 
              class="p-4"
            >
              <div class="flex items-center mb-2">
                <button 
                  @click="runGroup(f.file)" 
                  :disabled="runningFiles[f.file]" 
                  class="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition mr-3 min-w-[80px]"
                >
                  {{ runningFiles[f.file] ? '测试中...' : '运行' }}
                </button>
                <span class="font-mono text-sm px-2 py-1 bg-gray-100 rounded">{{ f.file }}</span>
              </div>
              
              <table v-if="results[f.file]" class="w-full mt-3 text-sm border rounded overflow-hidden">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="text-left py-2 px-3 w-3/4">描述</th>
                    <th class="text-center py-2 px-3 w-1/4">结果</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(c, idx) in results[f.file]" :key="idx" class="border-t hover:bg-gray-50">
                    <td class="py-2 px-3">{{ c.desc }}</td>
                    <td class="py-2 px-3 text-center">
                      <span
                        :class="[
                          'inline-block px-3 py-1 rounded-full text-sm font-medium w-16',
                          c.result === '通过' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        ]"
                        @mouseenter="e => showTooltip(e, c.response)"
                        @mouseleave="hideTooltip"
                      >
                        {{ c.result }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- API 文档页面 -->
    <div v-if="activeTab === 'api'" class="mt-4">
      <!-- API 选择器 -->
      <div class="flex space-x-2 mb-6 flex-wrap">
        <button
          v-for="(doc, key) in apiDocs"
          :key="key"
          @click="activeApi = key"
          :class="[
            activeApi === key
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            'px-3 py-1 rounded text-sm mb-2'
          ]"
        >
          {{ key }}
        </button>
      </div>

      <!-- API 详情 -->
      <div v-if="apiDocs[activeApi]" class="space-y-4">
        <h3 class="text-xl font-bold text-gray-800">{{ apiDocs[activeApi].title }}</h3>
        <p class="text-gray-600">{{ apiDocs[activeApi].desc }}</p>
        
        <div>
          <h4 class="font-bold text-gray-700 mb-2">参数</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li v-for="param in apiDocs[activeApi].params" :key="param" class="text-gray-600">
              {{ param }}
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-gray-700 mb-2">返回值</h4>
          <p class="text-gray-600">{{ apiDocs[activeApi].returns }}</p>
        </div>

        <div>
          <h4 class="font-bold text-gray-700 mb-2">注意事项</h4>
          <p class="text-gray-600">{{ apiDocs[activeApi].notes }}</p>
        </div>
        
        <!-- 测试用例组按钮 -->
        <div class="mt-6 space-y-4">
          <h4 class="font-bold text-gray-700">相关测试用例</h4>
          <div class="flex flex-wrap gap-2">
            <div v-for="group in groups.filter(g => g.group === activeApi)" :key="group.group">
              <div v-for="f in group.files" :key="f.file" class="mb-3">
                <div class="flex items-center">
                  <button 
                    @click="runGroup(f.file)" 
                    :disabled="runningFiles[f.file]" 
                    class="px-3 py-1 bg-blue-500 text-white rounded mr-2 text-sm"
                  >
                    {{ runningFiles[f.file] ? '测试中...' : '运行' }}
                  </button>
                  <span class="font-mono text-sm">{{ f.file }}</span>
                </div>
                
                <table v-if="results[f.file]" class="w-full mt-2 text-sm border">
                  <thead>
                    <tr class="bg-gray-200">
                      <th>描述</th>
                      <th>结果</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(c, idx) in results[f.file]" :key="idx">
                      <td>{{ c.desc }}</td>
                      <td>
                        <span
                          :style="{color: c.result === '通过' ? 'green' : 'red', cursor: 'pointer'}"
                          @mouseenter="e => showTooltip(e, c.response)"
                          @mouseleave="hideTooltip"
                        >
                          {{ c.result }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div v-if="!groups.some(g => g.group === activeApi)" class="text-gray-500 italic">
              该 API 暂无关联测试用例
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="tooltip.show" :style="{position:'fixed', left: tooltip.x+'px', top: tooltip.y+'px', background:'#fff', border:'1px solid #888', padding:'8px', 'z-index':9999, 'max-width':'400px', 'white-space':'pre-wrap', 'box-shadow':'0 2px 8px #8884'}">
      <pre style="margin:0; font-size:13px;">{{ tooltip.content }}</pre>
    </div>
  </div>
</template>

<style scoped>
table { border-collapse: collapse; }
th, td { border: 1px solid #ddd; padding: 4px 8px; }
</style>
