const Page = require('./page');
let LoginPage = Object.create(Page, {

    // 測試資料
    content: {
        get: () => {
            return {
                account: 'cherry',
                Password: 'cherry',
                worryPassword: '1234',
                errorMessage: '帳號或密碼錯誤'
            }
        }
    },

    // 定義元素
    //帳號
    account: {
        get: function () {
            return browser.element('#account');
        }
    },
    //密碼
    Password: {
        get: function () {
            return browser.element('#password');
        }
    },
    //登錄
    signIn: {
        get: function () {
            return browser.element('#root > div > div.mainView_mainView__3oY3e > div > div > div.MuiCardActions-root.MuiCardActions-spacing.css-1xgg0et > form > button');
        }
    },
    alertDanger: {
        get: function () {
            return browser.element('#root > div.SnackbarContainer-top.SnackbarContainer-right.SnackbarContainer-root.css-uwcd5u > div > div > div');
        }
    },

    // override 方法
    open: {
        value: function () {
            Page.open.call(this, 'login');
        }
    },
    pause: {
        value: function () {
            Page.pause.call(this, 3000);
        }
    },

    /**
     *
     * 自訂方法
     *
     * */
    //按送出按鈕
    signInClick: {
        value: function () {
            this.signIn.click();
        }
    },
    signOutClick: {
        value: function () {
            this.signOut.click();
        }
    },
    //錯誤彈窗
    waitAlertDangerIsExist: {
        value: function () {
            this.alertDanger.waitForExist();
        }
    },
    waitAlertInfoIsExist: {
        value: function () {
            this.alertInfo.waitForExist();
        }
    },
    waitSignOutIsExist: {
        value: function () {
            this.signOut.waitForExist(7000);
        }
    },



});
module.exports = LoginPage;
