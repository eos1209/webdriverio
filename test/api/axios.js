const AllureReporter = require("@wdio/allure-reporter").default;

const axios = require('axios').create({ baseURL: 'http://127.0.0.1:8888/' });

class Axios {
    //登入取 Token
    getToken() {
        let token
        return axios.request({
            url: '/SCGBackendLogin',
            method: 'post',
            data: {
                Username: 'changyi',
                Password: 'changyi'
            }
        })
            .then(res => {
                if (res.headers['set-cookie']) {
                    token = res.headers['set-cookie'][0].substr(0, 200);
                } else {
                    token = '';
                }
                return [res, token];
            })
            .catch(err => AllureReporter.addAttachment("Error", err.toString(), "text/plain"))
    }

    //共用請求
    request(method, url, token, body = {}) {
        return axios.request({
            url: url,
            method: method,
            headers: {
                Cookie: token
            },
            data: body
        })
            .then(res => res)
            .catch(err => AllureReporter.addAttachment("Error", err.toString(), "text/plain"))
    }
}

module.exports = new Axios();