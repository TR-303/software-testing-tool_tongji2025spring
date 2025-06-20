import { mount } from '@vue/test-utils';
import TaskCreationTest from '@/components/TaskCreationTest.vue';
import axios from 'axios';

jest.mock('axios');

describe('任务创建功能测试', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TaskCreationTest);
  });

  describe('UT_TC_002_001_001 - 输入groupId为null', () => {
    const groupIndex = 0;

    it('用例001 - groupId=null, taskCreationDto={description:"测试任务"}', async () => {
      axios.post.mockRejectedValueOnce({
        response: { status: 400, data: { message: "必须指定组id" } }
      });
      
      const testCase = wrapper.vm.testGroups[groupIndex].cases[0];
      await wrapper.vm.runTest(wrapper.vm.testGroups[groupIndex], testCase);
      
      expect(testCase.actual).toBe('任务创建失败');
      expect(testCase.result).toBe(true);
    });

    it('用例002 - groupId=null, taskCreationDto=null', async () => {
      axios.post.mockRejectedValueOnce({
        response: { status: 400, data: { message: "必须指定组id" } }
      });
      
      const testCase = wrapper.vm.testGroups[groupIndex].cases[1];
      await wrapper.vm.runTest(wrapper.vm.testGroups[groupIndex], testCase);
      
      expect(testCase.actual).toBe('任务创建失败');
      expect(testCase.result).toBe(true);
    });

    it('用例003 - groupId=null, taskCreationDto={assigneeId:10}', async () => {
      axios.post.mockRejectedValueOnce({
        response: { status: 400, data: { message: "必须指定组id" } }
      });
      
      const testCase = wrapper.vm.testGroups[groupIndex].cases[2];
      await wrapper.vm.runTest(wrapper.vm.testGroups[groupIndex], testCase);
      
      expect(testCase.actual).toBe('任务创建失败');
      expect(testCase.result).toBe(true);
    });
  });

  describe('UT_TC_002_001_002 - 输入有效groupId，不分配任务给用户', () => {
    const groupIndex = 1;

    it('用例001 - groupId=1, taskCreationDto={assigneeId:null}', async () => {
      axios.post.mockResolvedValueOnce({
        status: 200,
        data: { message: "任务创建成功", taskId: 1 }
      });
      
      const testCase = wrapper.vm.testGroups[groupIndex].cases[0];
      await wrapper.vm.runTest(wrapper.vm.testGroups[groupIndex], testCase);
      
      expect(testCase.actual).toBe('任务创建成功');
      expect(testCase.result).toBe(true);
    });

    it('用例002 - groupId=1, taskCreationDto={assigneeId:null, description:""}', async () => {
      axios.post.mockResolvedValueOnce({
        status: 200,
        data: { message: "任务创建成功", taskId: 2 }
      });
      
      const testCase = wrapper.vm.testGroups[groupIndex].cases[1];
      await wrapper.vm.runTest(wrapper.vm.testGroups[groupIndex], testCase);
      
      expect(testCase.actual).toBe('任务创建成功');
      expect(testCase.result).toBe(true);
    });

    it('用例003 - groupId=1, taskCreationDto={assigneeId:null, description:"A".repeat(255)}', async () => {
      axios.post.mockResolvedValueOnce({
        status: 200,
        data: { message: "任务创建成功", taskId: 3 }
      });
      
      const testCase = wrapper.vm.testGroups[groupIndex].cases[2];
      await wrapper.vm.runTest(wrapper.vm.testGroups[groupIndex], testCase);
      
      expect(testCase.actual).toBe('任务创建成功');
      expect(testCase.result).toBe(true);
    });
  });

  describe('UT_TC_002_001_003 - 输入有效groupId，分配任务给用户', () => {
    const groupIndex = 2;

    it('用例001 - groupId=1, taskCreationDto={assigneeId:10}', async () => {
      axios.post.mockResolvedValueOnce({
        status: 200,
        data: { message: "任务创建成功", taskId: 4 }
      });
      
      const testCase = wrapper.vm.testGroups[groupIndex].cases[0];
      await wrapper.vm.runTest(wrapper.vm.testGroups[groupIndex], testCase);
      
      expect(testCase.actual).toBe('任务创建成功');
      expect(testCase.result).toBe(true);
    });

    it('用例002 - groupId=1, taskCreationDto={assigneeId:10, description:"紧急"}', async () => {
      axios.post.mockResolvedValueOnce({
        status: 200,
        data: { message: "任务创建成功", taskId: 5 }
      });
      
      const testCase = wrapper.vm.testGroups[groupIndex].cases[1];
      await wrapper.vm.runTest(wrapper.vm.testGroups[groupIndex], testCase);
      
      expect(testCase.actual).toBe('任务创建成功');
      expect(testCase.result).toBe(true);
    });

    it('用例003 - groupId=1, taskCreationDto={assigneeId:10, dueDate:"2023-12-31"}', async () => {
      axios.post.mockResolvedValueOnce({
        status: 200,
        data: { message: "任务创建成功", taskId: 6 }
      });
      
      const testCase = wrapper.vm.testGroups[groupIndex].cases[2];
      await wrapper.vm.runTest(wrapper.vm.testGroups[groupIndex], testCase);
      
      expect(testCase.actual).toBe('任务创建成功');
      expect(testCase.result).toBe(true);
    });
  });

  describe('UT_TC_002_001_004 - 输入无效groupId（不存在）', () => {
    const groupIndex = 3;

    it('用例001 - groupId=999, taskCreationDto={assigneeId:10}', async () => {
      axios.post.mockRejectedValueOnce({
        response: { status: 400, data: { message: "组不存在" } }
      });
      
      const testCase = wrapper.vm.testGroups[groupIndex].cases[0];
      await wrapper.vm.runTest(wrapper.vm.testGroups[groupIndex], testCase);
      
      expect(testCase.actual).toBe('任务创建失败');
      expect(testCase.result).toBe(true);
    });

    it('用例002 - groupId=0, taskCreationDto={assigneeId:10}', async () => {
      axios.post.mockRejectedValueOnce({
        response: { status: 400, data: { message: "无效的组ID" } }
      });
      
      const testCase = wrapper.vm.testGroups[groupIndex].cases[1];
      await wrapper.vm.runTest(wrapper.vm.testGroups[groupIndex], testCase);
      
      expect(testCase.actual).toBe('任务创建失败');
      expect(testCase.result).toBe(true);
    });

    it('用例003 - groupId=-1, taskCreationDto={assigneeId:10}', async () => {
      axios.post.mockRejectedValueOnce({
        response: { status: 400, data: { message: "无效的组ID" } }
      });
      
      const testCase = wrapper.vm.testGroups[groupIndex].cases[2];
      await wrapper.vm.runTest(wrapper.vm.testGroups[groupIndex], testCase);
      
      expect(testCase.actual).toBe('任务创建失败');
      expect(testCase.result).toBe(true);
    });
  });
});