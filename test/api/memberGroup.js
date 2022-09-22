const Axios = require('../api/axios.js');

class MemberGroup {
    constructor () {
        this.members = 'JCG6586863186';
    }

    set newToken(token) {
        this.token = token
    }

    //新增群組
    memberGroupAdd() {
        let body = {
            AudienceDescription: 'unitTest',
            AudienceName: 'unitTest'
        };
        return Axios.request('post', '/MemberGroupAdd', this.token, body);
    }

    //修改群組
    memberGroupModify(insertId) {
        let body = {
            Id: insertId,
            AudienceDescription: 'updateUnitTest',
            AudienceName: 'updateUnitTest'
        };
        return Axios.request('post', '/MemberGroupModify', this.token, body);
    }

    //會員加入群組
    insertMemberToGroup(insertId) {
        let body = {
            GroupId: insertId,
            Members: `["${this.members}"]`
        };
        return Axios.request('post', '/InsertMemberToGroup', this.token, body);
    }

    //會員踢出群組
    groupManual_Delete(insertId) {
        let body = {
            AudienceId: insertId,
            MemberId: `${this.members}`
        };
        return Axios.request('post', '/GroupManual_Delete', this.token, body);
    }

    //刪除群組
    memberGroupDelete(insertId) {
        let body = {
            Id: insertId
        };
        return Axios.request('post', '/MemberGroupDelete', this.token, body);
    }
}

module.exports = new MemberGroup();