// const expect = require('chai').expect;
//
// const Axios = require('../../api/axios.js');
// const Response = require('../../api/response.js');
// const MemberGroup = require('../../api/memberGroup.js');
//
// describe('群組功能測試', () => {
//     let response, token, insertId;
//     before(async () => {
//         [response, token] = await Axios.getToken();
//         MemberGroup.newToken = token;
//         Response.allureEndStep(response);
//         expect(response.data.code, 'code').to.be.equal("0");
//     })
//
//     it('新增群組', async () => {
//         response = await MemberGroup.memberGroupAdd();
//         Response.allureEndStep(response);
//         insertId = response.data.data;
//         expect(response.data.code, 'code').to.be.equal("0");
//     })
//
//     it('修改群組', async () => {
//         response = await MemberGroup.memberGroupModify(insertId);
//         Response.allureEndStep(response);
//         expect(response.data.code, 'code').to.be.equal("0");
//     })
//
//     it('會員加入群組', async () => {
//         response = await MemberGroup.insertMemberToGroup(insertId);
//         Response.allureEndStep(response);
//         expect(response.data.code, 'code').to.be.equal("0");
//     })
//
//     it('會員踢出群組', async () => {
//         response = await MemberGroup.groupManual_Delete(insertId);
//         Response.allureEndStep(response);
//         expect(response.data.code, 'code').to.be.equal("0");
//     })
//
//     it('刪除群組', async () => {
//         response = await MemberGroup.memberGroupDelete(insertId);
//         Response.allureEndStep(response);
//         expect(response.data.code, 'code').to.be.equal("0");
//     })
// });