const Axios = require('../api/axios.js');

class MachineHistory {
    constructor() {
        this.scgGameId = "200001";
        this.hallDataId = "3";
        this.machineNumber = "1";
    }

    set newToken(token) {
        this.token = token
    }

    //查詢機台保留紀錄
    getMachineHistory() {
        let body = {
            searchData: `{"SCGGameId": ${this.scgGameId},"HallDataId": ${this.hallDataId},"MachineNumber": ${this.machineNumber}}`
        };
        return Axios.request('post', '/GetMachineHistory', this.token, body);
    }
}

module.exports = new MachineHistory();