// const expect = require('chai').expect;
//
// const Axios = require('../../api/axios.js');
// const Response = require('../../api/response.js');
// const MachineHistory = require('../../api/getMachineHistory.js');
//
//
// describe('機台保留功能測試', () => {
//     let response, token;
//     before(async () => {
//         [response, token] = await Axios.getToken();
//         MachineHistory.newToken = token;
//         Response.allureEndStep(response);
//         expect(response.data.code, 'code').to.be.equal("0");
//     })
//
//     it('查詢機台', async () => {
//         response = await MachineHistory.getMachineHistory();
//         Response.allureEndStep(response);
//         expect(response.data.code, 'code').to.be.equal("0");
//     })
// });