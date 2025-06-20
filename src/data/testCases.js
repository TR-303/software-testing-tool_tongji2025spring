export const testCases = {
  User: [
    {
      id: 'UT_TC_001_001_001',
      tag: 'Register',
      desc: '输入用户名为空，密码合法的情况。',
      input: 'username="" password="Valid123"',
      expected: 'status=false "用户名不能为空"',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testRegisterEmptyUsername'
    },
    {
      id: 'UT_TC_001_001_002',
      tag: 'Register',
      desc: '输入密码为空，用户名不为空且不重复的情况。',
      input: 'username="newUser" password=""',
      expected: 'status=false "密码不能为空"',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testRegisterEmptyPassword'
    },
    {
      id: 'UT_TC_001_001_003',
      tag: 'Register',
      desc: '用户名和密码都合法但用户名重复。',
      input: 'username="existingUser" password="Valid123"',
      expected: '抛出 InvalidLoginException',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testRegisterDuplicate'
    },
    {
      id: 'UT_TC_001_001_004',
      tag: 'Register',
      desc: '用户名和密码都合法且用户名不重复。',
      input: 'username="newValidUser" password="Valid123"',
      expected: 'status=true',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testRegisterSuccess'
    },
    {
      id: 'UT_TC_001_001_005',
      tag: 'Register',
      desc: '用户名长度为65，密码长度为8，且用户名不重复。',
      input: 'username="a...a"(65) password="Valid123"',
      expected: '用户名超长',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testRegisterUsernameTooLong'
    },
    {
      id: 'UT_TC_001_001_006',
      tag: 'Register',
      desc: '用户名长度为8，密码长度为129，且用户名不重复。',
      input: 'username="newValidUser" password="a...a"(129)',
      expected: '密码超长',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testRegisterPasswordTooLong'
    },
    {
      id: 'UT_TC_001_002_001',
      tag: 'login',
      desc: '输入用户名在数据库中不存在。',
      input: 'username="InvalidUser" password="aaa"',
      expected: 'status=false "用户不正确"',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testLoginFail'
    },
    {
      id: 'UT_TC_001_002_002',
      tag: 'login',
      desc: '输入密码与用户名不匹配。',
      input: 'username="ValidUser" password="notmatch"',
      expected: 'status=false "用户不正确"',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testLoginWrongPassword'
    },
    {
      id: 'UT_TC_001_002_003',
      tag: 'login',
      desc: '输入用户名在数据库中存在且密码与用户名匹配。',
      input: 'username="ValidUser" password="match"',
      expected: '返回token',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testLoginSuccess'
    },
    {
      id: 'UT_TC_001_002_004',
      tag: 'login',
      desc: '输入用户名为空。',
      input: 'username="" password="Valid123"',
      expected: 'status=false "用户不正确"',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testLoginEmptyUsername'
    },
    {
      id: 'UT_TC_001_003_001',
      tag: 'getAccountInfo',
      desc: 'userId为空',
      input: 'userId=null',
      expected: 'status=false "用户不正确"',
      testName: 'com.tongji.chaigrouping.service.AccountServiceImplTest.testGetAccountInfoNullUserId'
    },
    {
      id: 'UT_TC_001_003_002',
      tag: 'getAccountInfo',
      desc: 'userId在数据库中不存在',
      input: 'userId=999999',
      expected: 'status=false "用户不正确"',
      testName: 'com.tongji.chaigrouping.service.AccountServiceImplTest.testGetAccountInfoNotFound'
    },
    {
      id: 'UT_TC_001_003_003',
      tag: 'getAccountInfo',
      desc: 'userId在数据库中存在',
      input: 'userId=1001',
      expected: '返回账号信息',
      testName: 'com.tongji.chaigrouping.service.AccountServiceImplTest.testGetAccountInfoSuccess'
    },
    {
      id: 'UT_TC_001_004_001',
      tag: 'updateAccountInfo',
      desc: 'userId不存在',
      input: 'userId=999999, dto={username:"newUser"}',
      expected: 'status=false "用户不正确"',
      testName: 'com.tongji.chaigrouping.service.AccountServiceImplTest.testUpdateAccountInfoUserNotFound'
    },
    {
      id: 'UT_TC_001_004_002',
      tag: 'updateAccountInfo',
      desc: 'userId存在，username已被别人占用',
      input: 'userId=1001, dto={username:"existingUser"}',
      expected: 'status=false "用户名已存在"',
      testName: 'com.tongji.chaigrouping.service.AccountServiceImplTest.testUpdateAccountInfoDuplicateUsername'
    },
    {
      id: 'UT_TC_001_004_003',
      tag: 'updateAccountInfo',
      desc: 'userId存在，username为新用户名但未被其他人用。',
      input: 'userId=1001, dto={username:"uniqueUser"}',
      expected: 'status=true',
      testName: 'com.tongji.chaigrouping.service.AccountServiceImplTest.testUpdateAccountInfoSuccess'
    },
    {
      id: 'UT_TC_001_004_004',
      tag: 'updateAccountInfo',
      desc: 'userId存在，username为原用户名',
      input: 'userId=1001, dto={username:"sameUser"}',
      expected: 'status=true',
      testName: 'com.tongji.chaigrouping.service.AccountServiceImplTest.testUpdateAccountInfoSameUsername'
    },
    {
      id: 'UT_TC_001_005_001',
      tag: 'getResume',
      desc: 'userId不存在，查不到用户。',
      input: 'userId=99999',
      expected: 'status=false "用户不正确"',
      testName: 'com.tongji.chaigrouping.service.ResumeServiceImplTest.testGetResumeNotFound'
    },
    {
      id: 'UT_TC_001_005_002',
      tag: 'getResume',
      desc: 'userId存在，能查到用户。',
      input: 'userId=1001',
      expected: '返回简历',
      testName: 'com.tongji.chaigrouping.service.ResumeServiceImplTest.testGetResumeSuccess'
    },
    {
      id: 'UT_TC_001_006_001',
      tag: 'updateResume',
      desc: 'userId不存在。更新失败',
      input: 'userId=88888, resumeDto=valid',
      expected: 'status=false "用户不正确"',
      testName: 'com.tongji.chaigrouping.service.ResumeServiceImplTest.testUpdateResumeNotFound'
    },
    {
      id: 'UT_TC_001_006_002',
      tag: 'updateResume',
      desc: 'userId存在。更新成功',
      input: 'userId=1001, resumeDto=valid',
      expected: 'status=true',
      testName: 'com.tongji.chaigrouping.service.ResumeServiceImplTest.testUpdateResumeSuccess'
    }
  ],
  JoinRequest: [
    {
      id: 'UT_TC_002_001_001',
      tag: 'createRequest',
      desc: '小组ID（groupId）在数据库中不存在，创建请求失败',
      input: 'userId=1001, groupId=99999',
      expected: 'status=false "小组不存在"',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testCreateRequestGroupNotFound'
    },
    {
      id: 'UT_TC_002_001_002',
      tag: 'createRequest',
      desc: '用户ID（userId）在数据库中不存在，创建请求失败',
      input: 'userId=1001, groupId=2001',
      expected: 'status=false "用户不存在"',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testCreateRequestUserNotFound'
    },
    {
      id: 'UT_TC_002_001_003',
      tag: 'createRequest',
      desc: '小组ID和用户ID都存在，且小组需审批，成功创建待审批的请求并通知组长',
      input: 'userId=1001, groupId=2001 需审批',
      expected: '生成待审批请求',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testCreateRequestNeedApproval'
    },
    {
      id: 'UT_TC_002_001_004',
      tag: 'createRequest',
      desc: '小组ID和用户ID都存在，不需审批但小组人数已满，创建请求失败',
      input: 'userId=1001, groupId=2003 组已满',
      expected: 'status=false "组已满"',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testCreateRequestGroupFull'
    },
    {
      id: 'UT_TC_002_001_005',
      tag: 'createRequest',
      desc: '小组ID和用户ID都存在，且小组不需审批，直接入组并通知组长',
      input: 'userId=1001, groupId=2002',
      expected: '直接入组',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testCreateRequestDirectJoin'
    },
    {
      id: 'UT_TC_002_002_001',
      tag: 'respondToRequest',
      desc: '请求ID在数据库中不存在，审批或拒绝请求失败',
      input: 'leaderId=1002, requestId=99999',
      expected: 'status=false "请求不存在"',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testRespondToRequestRequestNotFound'
    },
    {
      id: 'UT_TC_002_002_002',
      tag: 'respondToRequest',
      desc: '请求ID存在，操作类型为APPROVE，且小组未满，审批请求成功并添加成员',
      input: 'leaderId=1002, requestId=2001, APPROVE',
      expected: '审批通过并添加成员',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testRespondToRequestApprove'
    },
    {
      id: 'UT_TC_002_002_003',
      tag: 'respondToRequest',
      desc: '请求ID存在，操作类型为APPROVE，但小组已满，审批请求失败',
      input: 'leaderId=1002, requestId=2002, APPROVE (满员)',
      expected: 'status=false "组已满，无法加入！"',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testRespondToRequestApproveGroupFull'
    },
    {
      id: 'UT_TC_002_002_004',
      tag: 'respondToRequest',
      desc: '请求ID存在，操作类型为REJECT，拒绝请求成功',
      input: 'leaderId=1002, requestId=2003, REJECT',
      expected: '请求状态REJECTED',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testRespondToRequestReject'
    },
    {
      id: 'UT_TC_002_002_005',
      tag: 'respondToRequest',
      desc: '请求ID存在，操作类型非法，审批或拒绝请求失败',
      input: 'leaderId=1002, requestId=2004, action=CANCEL',
      expected: 'status=false "Unknown action"',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testRespondToRequestInvalidAction'
    }
  ],
  Task: [
    // createTask test cases
    {
      id: 'UT_TC_003_001_001',
      tag: 'createTask',
      desc: '输入groupId为null，任务创建失败',
      input: 'groupId=null, taskCreationDto={description:"测试任务"}',
      expected: '任务创建失败',
      testName: 'com.tongji.chaigrouping.service.TaskCreationServiceTest.testCreateTask_GroupIdNull'
    },
    {
      id: 'UT_TC_003_001_002',
      tag: 'createTask',
      desc: '输入有效groupId，不分配任务给用户',
      input: 'groupId=1, taskCreationDto={assigneeId:null}',
      expected: '任务创建成功',
      testName: 'com.tongji.chaigrouping.service.TaskCreationServiceTest.testCreateTask_ValidGroupId_NoAssignee_DescriptionNull'
    },
    {
      id: 'UT_TC_003_001_003',
      tag: 'createTask',
      desc: '输入有效groupId，分配任务给用户',
      input: 'groupId=1, taskCreationDto={assigneeId:10}',
      expected: '任务创建成功',
      testName: 'com.tongji.chaigrouping.service.TaskCreationServiceTest.testCreateTask_WithAssignee_OnlyId'
    },
    {
      id: 'UT_TC_003_001_004',
      tag: 'createTask',
      desc: '输入无效groupId（不存在）',
      input: 'groupId=999, taskCreationDto={assigneeId:10}',
      expected: '任务创建失败',
      testName: 'com.tongji.chaigrouping.service.TaskCreationServiceTest.testCreateTask_InvalidGroupId_NotFound_999'
    },

    // getUserTaskList test cases
    {
      id: 'UT_TC_002_002_001',
      tag: 'getUserTaskList',
      desc: '输入用户ID为null',
      input: 'userId=null',
      expected: '返回空列表',
      testName: 'com.tongji.chaigrouping.service.UserTaskManagementServiceTest.testGetUserTaskList_WithNullUserId'
    },
    {
      id: 'UT_TC_002_002_002',
      tag: 'getUserTaskList',
      desc: '输入用户ID为非正整数（如-1）',
      input: 'userId=-1',
      expected: '返回空列表',
      testName: 'com.tongji.chaigrouping.service.UserTaskManagementServiceTest.testGetUserTaskList_WithInvalidUserId'
    },
    {
      id: 'UT_TC_002_002_003',
      tag: 'getUserTaskList',
      desc: '输入有效用户ID但用户无任务',
      input: 'userId=100',
      expected: '返回空列表',
      testName: 'com.tongji.chaigrouping.service.UserTaskManagementServiceTest.testGetUserTaskList_UserWithNoTasks'
    },
    {
      id: 'UT_TC_002_002_009',
      tag: 'getUserTaskList',
      desc: '验证返回的任务列表包含正确的任务信息',
      input: 'userId=6',
      expected: '返回包含正确任务信息的列表',
      testName: 'com.tongji.chaigrouping.service.UserTaskManagementServiceTest.testGetUserTaskList_WithValidUserId'
    },

    // getTaskList test cases
    {
      id: 'UT_TC_003_003_001',
      tag: 'getTaskList',
      desc: '输入groupId为null',
      input: 'groupId=null',
      expected: '返回空列表或抛出异常',
      testName: 'com.tongji.chaigrouping.service.GroupTaskManagementServiceTest.testGetTaskList_GroupIdIsNull'
    },
    {
      id: 'UT_TC_003_003_002',
      tag: 'getTaskList',
      desc: '输入groupId在数据库中不存在',
      input: 'groupId=999',
      expected: '返回空列表',
      testName: 'com.tongji.chaigrouping.service.GroupTaskManagementServiceTest.testGetTaskList_GroupIdNotExist'
    },
    {
      id: 'UT_TC_003_003_003',
      tag: 'getTaskList',
      desc: '输入groupId存在但对应任务列表为空',
      input: 'groupId=1',
      expected: '返回空列表',
      testName: 'com.tongji.chaigrouping.service.GroupTaskManagementServiceTest.testGetTaskList_EmptyListForExistingGroup'
    },
    {
      id: 'UT_TC_003_003_004',
      tag: 'getTaskList',
      desc: '输入groupId存在且对应任务列表不为空',
      input: 'groupId=2',
      expected: '返回任务列表',
      testName: 'com.tongji.chaigrouping.service.GroupTaskManagementServiceTest.testGetTaskList_NonEmptyListForExistingGroup'
    },
    {
      id: 'UT_TC_003_003_005',
      tag: 'getTaskList',
      desc: '输入groupId为负数或非法值',
      input: 'groupId=-1',
      expected: '返回空列表或抛出异常',
      testName: 'com.tongji.chaigrouping.service.GroupTaskManagementServiceTest.testGetTaskList_InvalidNegativeGroupId'
    },

    // reassignTask test cases
    {
      id: 'UT_TC_003_004_001',
      tag: 'reassignTask',
      desc: '输入taskId为null',
      input: 'taskId=null, assigneeId=1',
      expected: '抛出异常',
      testName: 'com.tongji.chaigrouping.service.TaskReassignmentServiceTest.testReassignTask_TaskIdIsNull'
    },
    {
      id: 'UT_TC_003_004_002',
      tag: 'reassignTask',
      desc: '输入assigneeId为null',
      input: 'taskId=1, assigneeId=null',
      expected: '抛出异常',
      testName: 'com.tongji.chaigrouping.service.TaskReassignmentServiceTest.testReassignTask_AssigneeIdIsNull'
    },
    {
      id: 'UT_TC_003_004_003',
      tag: 'reassignTask',
      desc: '输入taskId在数据库中不存在',
      input: 'taskId=999, assigneeId=1',
      expected: '抛出异常',
      testName: 'com.tongji.chaigrouping.service.TaskReassignmentServiceTest.testReassignTask_TaskIdDoesNotExist'
    },
    {
      id: 'UT_TC_003_004_004',
      tag: 'reassignTask',
      desc: '输入assigneeId在数据库中不存在',
      input: 'taskId=1, assigneeId=999',
      expected: '抛出异常',
      testName: 'com.tongji.chaigrouping.service.TaskReassignmentServiceTest.testReassignTask_AssigneeIdDoesNotExist'
    },
    {
      id: 'UT_TC_003_004_005',
      tag: 'reassignTask',
      desc: '输入taskId和assigneeId均存在',
      input: 'taskId=1, assigneeId=2',
      expected: '任务重新分配成功',
      testName: 'com.tongji.chaigrouping.service.TaskReassignmentServiceTest.testReassignTask_ValidTaskIdAndAssigneeId'
    },
    {
      id: 'UT_TC_003_004_006',
      tag: 'reassignTask',
      desc: '输入taskId或assigneeId为非法值',
      input: 'taskId=-1, assigneeId=2',
      expected: '抛出异常',
      testName: 'com.tongji.chaigrouping.service.TaskReassignmentServiceTest.testReassignTask_InvalidTaskIdAndAssigneeId'
    },
    {
      id: 'UT_TC_003_004_007',
      tag: 'reassignTask',
      desc: '输入taskId存在但任务状态不允许重新分配',
      input: 'taskId=1, assigneeId=2',
      expected: '抛出异常',
      testName: 'com.tongji.chaigrouping.service.TaskReassignmentServiceTest.testReassignTask_TaskStatusNotAllowReassign'
    },

    // getTaskDetail test cases
    {
      id: 'UT_TC_003_005_001',
      tag: 'getTaskDetail',
      desc: '输入taskId为null',
      input: 'taskId=null',
      expected: '抛出IllegalArgumentException',
      testName: 'com.tongji.chaigrouping.service.TaskDetailServiceTest.testGetTaskDetail_TaskIdIsNull'
    },
    {
      id: 'UT_TC_003_005_002',
      tag: 'getTaskDetail',
      desc: '输入taskId为非正整数（如-1）',
      input: 'taskId=-1',
      expected: '抛出IllegalArgumentException',
      testName: 'com.tongji.chaigrouping.service.TaskDetailServiceTest.testGetTaskDetail_InvalidTaskId'
    },
    {
      id: 'UT_TC_003_005_003',
      tag: 'getTaskDetail',
      desc: '输入taskId不存在',
      input: 'taskId=999',
      expected: '返回null',
      testName: 'com.tongji.chaigrouping.service.TaskDetailServiceTest.testGetTaskDetail_TaskIdDoesNotExist'
    },
    {
      id: 'UT_TC_003_005_004',
      tag: 'getTaskDetail',
      desc: '输入taskId存在但无提交记录',
      input: 'taskId=1',
      expected: '返回TaskDetailDto对象，submission相关字段为null',
      testName: 'com.tongji.chaigrouping.service.TaskDetailServiceTest.testGetTaskDetail_NoSubmission'
    },
    {
      id: 'UT_TC_003_005_005',
      tag: 'getTaskDetail',
      desc: '输入taskId存在且有提交记录',
      input: 'taskId=2',
      expected: '返回完整的TaskDetailDto对象，包含所有字段信息',
      testName: 'com.tongji.chaigrouping.service.TaskDetailServiceTest.testGetTaskDetail_WithSubmission'
    },
    {
      id: 'UT_TC_003_005_006',
      tag: 'getTaskDetail',
      desc: '验证返回的任务详情包含正确的任务基本信息',
      input: 'taskId=3',
      expected: '返回的TaskDetailDto包含正确的task_id, title, description, deadline, state',
      testName: 'com.tongji.chaigrouping.service.TaskDetailServiceTest.testGetTaskDetail_TaskBasicInfo'
    },
    {
      id: 'UT_TC_003_005_007',
      tag: 'getTaskDetail',
      desc: '验证返回的任务详情包含正确的小组信息',
      input: 'taskId=4',
      expected: '返回的TaskDetailDto包含正确的group_id和group_name',
      testName: 'com.tongji.chaigrouping.service.TaskDetailServiceTest.testGetTaskDetail_GroupInfo'
    },
    {
      id: 'UT_TC_003_005_008',
      tag: 'getTaskDetail',
      desc: '验证返回的任务详情包含正确的用户信息',
      input: 'taskId=5',
      expected: '返回的TaskDetailDto包含正确的user_id和username',
      testName: 'com.tongji.chaigrouping.service.TaskDetailServiceTest.testGetTaskDetail_UserInfo'
    },
    {
      id: 'UT_TC_003_005_009',
      tag: 'getTaskDetail',
      desc: '验证返回的任务详情包含正确的提交信息',
      input: 'taskId=6',
      expected: '返回的TaskDetailDto包含正确的submission_id, file_name, text, submission_username',
      testName: 'com.tongji.chaigrouping.service.TaskDetailServiceTest.testGetTaskDetail_SubmissionInfo'
    },
    {
      id: 'UT_TC_003_005_010',
      tag: 'getTaskDetail',
      desc: '验证无提交记录时相关字段为null',
      input: 'taskId=7',
      expected: '返回的TaskDetailDto的submission相关字段为null',
      testName: 'com.tongji.chaigrouping.service.TaskDetailServiceTest.testGetTaskDetail_NoSubmissionInfo'
    }
  ]
};
