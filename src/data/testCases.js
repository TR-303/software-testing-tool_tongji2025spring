export const testCases = {
  User: [
    {
      id: 'UT_TC_001_001_001',
      input: 'username="" password="Valid123"',
      expected: 'status=false "用户名不能为空"',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testRegisterEmptyUsername'
    },
    {
      id: 'UT_TC_001_001_002',
      input: 'username="newUser" password=""',
      expected: 'status=false "密码不能为空"',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testRegisterEmptyPassword'
    },
    {
      id: 'UT_TC_001_001_003',
      input: 'username="existingUser" password="Valid123"',
      expected: '抛出 InvalidLoginException',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testRegisterDuplicate'
    },
    {
      id: 'UT_TC_001_001_004',
      input: 'username="newValidUser" password="Valid123"',
      expected: 'status=true',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testRegisterSuccess'
    },
    {
      id: 'UT_TC_001_001_005',
      input: 'username="a...a"(65) password="Valid123"',
      expected: '用户名超长',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testRegisterUsernameTooLong'
    },
    {
      id: 'UT_TC_001_001_006',
      input: 'username="newValidUser" password="a...a"(129)',
      expected: '密码超长',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testRegisterPasswordTooLong'
    },
    {
      id: 'UT_TC_001_002_001',
      input: 'username="InvalidUser" password="aaa"',
      expected: 'status=false "用户不正确"',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testLoginFail'
    },
    {
      id: 'UT_TC_001_002_002',
      input: 'username="ValidUser" password="notmatch"',
      expected: 'status=false "用户不正确"',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testLoginWrongPassword'
    },
    {
      id: 'UT_TC_001_002_003',
      input: 'username="ValidUser" password="match"',
      expected: '返回token',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testLoginSuccess'
    },
    {
      id: 'UT_TC_001_002_004',
      input: 'username="" password="Valid123"',
      expected: 'status=false "用户不正确"',
      testName: 'com.tongji.chaigrouping.service.AuthServiceImplTest.testLoginEmptyUsername'
    },
    {
      id: 'UT_TC_001_003_001',
      input: 'userId=null',
      expected: 'status=false "用户不正确"',
      testName: 'com.tongji.chaigrouping.service.AccountServiceImplTest.testGetAccountInfoNullUserId'
    },
    {
      id: 'UT_TC_001_003_002',
      input: 'userId=999999',
      expected: 'status=false "用户不正确"',
      testName: 'com.tongji.chaigrouping.service.AccountServiceImplTest.testGetAccountInfoNotFound'
    },
    {
      id: 'UT_TC_001_003_003',
      input: 'userId=1001',
      expected: '返回账号信息',
      testName: 'com.tongji.chaigrouping.service.AccountServiceImplTest.testGetAccountInfoSuccess'
    },
    {
      id: 'UT_TC_001_004_001',
      input: 'userId=999999, dto={username:"newUser"}',
      expected: 'status=false "用户不正确"',
      testName: 'com.tongji.chaigrouping.service.AccountServiceImplTest.testUpdateAccountInfoUserNotFound'
    },
    {
      id: 'UT_TC_001_004_002',
      input: 'userId=1001, dto={username:"existingUser"}',
      expected: 'status=false "用户名已存在"',
      testName: 'com.tongji.chaigrouping.service.AccountServiceImplTest.testUpdateAccountInfoDuplicateUsername'
    },
    {
      id: 'UT_TC_001_004_003',
      input: 'userId=1001, dto={username:"uniqueUser"}',
      expected: 'status=true',
      testName: 'com.tongji.chaigrouping.service.AccountServiceImplTest.testUpdateAccountInfoSuccess'
    },
    {
      id: 'UT_TC_001_004_004',
      input: 'userId=1001, dto={username:"sameUser"}',
      expected: 'status=true',
      testName: 'com.tongji.chaigrouping.service.AccountServiceImplTest.testUpdateAccountInfoSameUsername'
    },
    {
      id: 'UT_TC_001_005_001',
      input: 'userId=99999',
      expected: 'status=false "用户不正确"',
      testName: 'com.tongji.chaigrouping.service.ResumeServiceImplTest.testGetResumeNotFound'
    },
    {
      id: 'UT_TC_001_005_002',
      input: 'userId=1001',
      expected: '返回简历',
      testName: 'com.tongji.chaigrouping.service.ResumeServiceImplTest.testGetResumeSuccess'
    },
    {
      id: 'UT_TC_001_006_001',
      input: 'userId=88888, resumeDto=valid',
      expected: 'status=false "用户不正确"',
      testName: 'com.tongji.chaigrouping.service.ResumeServiceImplTest.testUpdateResumeNotFound'
    },
    {
      id: 'UT_TC_001_006_002',
      input: 'userId=1001, resumeDto=valid',
      expected: 'status=true',
      testName: 'com.tongji.chaigrouping.service.ResumeServiceImplTest.testUpdateResumeSuccess'
    }
  ],
  JoinRequest: [
    {
      id: 'UT_TC_002_001_001',
      input: 'userId=1001, groupId=99999',
      expected: 'status=false "小组不存在"',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testCreateRequestGroupNotFound'
    },
    {
      id: 'UT_TC_002_001_002',
      input: 'userId=1001, groupId=2001',
      expected: 'status=false "用户不存在"',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testCreateRequestUserNotFound'
    },
    {
      id: 'UT_TC_002_001_003',
      input: 'userId=1001, groupId=2001 需审批',
      expected: '生成待审批请求',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testCreateRequestNeedApproval'
    },
    {
      id: 'UT_TC_002_001_004',
      input: 'userId=1001, groupId=2003 组已满',
      expected: 'status=false "组已满"',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testCreateRequestGroupFull'
    },
    {
      id: 'UT_TC_002_001_005',
      input: 'userId=1001, groupId=2002',
      expected: '直接入组',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testCreateRequestDirectJoin'
    },
    {
      id: 'UT_TC_002_002_001',
      input: 'leaderId=1002, requestId=99999',
      expected: 'status=false "请求不存在"',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testRespondToRequestRequestNotFound'
    },
    {
      id: 'UT_TC_002_002_002',
      input: 'leaderId=1002, requestId=2001, APPROVE',
      expected: '审批通过并添加成员',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testRespondToRequestApprove'
    },
    {
      id: 'UT_TC_002_002_003',
      input: 'leaderId=1002, requestId=2002, APPROVE (满员)',
      expected: 'status=false "组已满，无法加入！"',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testRespondToRequestApproveGroupFull'
    },
    {
      id: 'UT_TC_002_002_004',
      input: 'leaderId=1002, requestId=2003, REJECT',
      expected: '请求状态REJECTED',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testRespondToRequestReject'
    },
    {
      id: 'UT_TC_002_002_005',
      input: 'leaderId=1002, requestId=2004, action=CANCEL',
      expected: 'status=false "Unknown action"',
      testName: 'com.tongji.chaigrouping.service.JoinRequestServiceImplTest.testRespondToRequestInvalidAction'
    }
  ],
  Task: []
};
