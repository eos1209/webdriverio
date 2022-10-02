const Page = require('./page');

/**
 * 登入頁(login)
 *
 * 包含：『測試資料、選擇器、覆寫分享面方法、自定義方法』
 * */
let LoginPage = Object.create(Page, {
    /**
     * 預設測試資料
     */
    content: {
        get: () => {
            return {
                account: 'cherry',
                password: 'cherry',
                worryAccount: 'rd123',
                worryPassword: '1234',
                errorMessage: '帳號或密碼錯誤',
                logoutMessage: '登出成功'
            }
        }
    },
    // =========================定義元素=========================
    /**
     * 帳號輸入框
     */
    account: {
        get: () => {
            return $('#account');
        }
    },
    /**
     * 密碼輸入框
     */
    Password: {
        get: () => {
            return $('#password');
        }
    },
    //登錄
    signIn: {
        get: function () {
            return $('#root > div > div.mainView_mainView__3oY3e > div > div > div.MuiCardActions-root.MuiCardActions-spacing.css-1xgg0et > form > button');
        }
    },
    alertDanger: {
        get: () => {
            // return browser.element('#root > div.SnackbarContainer-top.SnackbarContainer-right.SnackbarContainer-root.css-uwcd5u > div > div > div');
            return $('#notistack-snackbar');
        }
    },
    // ========================= override 方法 =========================
    /**
     * 開啟視窗
     */
    open: {
        value: async () => {
            await Page.open.call(this, 'login');
        }
    },
    pause: {
        value: async () => {
            await Page.pause.call(this, 8000);
        }
    },
    /**
     * 根據提供的寬度和高度調整瀏覽器窗口的外部大小。
     */
    setPageWindowSize: {
        value: async function () {
            await Page.setPageWindowSize.call(this, 1024, 1024);
        }
    },
    /**
     * 桌面截圖
     */
    savePageScreenshot: {
        value: async function () {
            let path = './some/path/screenshot.png'
            await Page.saveScreenshot.call(this, path);
        }
    },
    /**
     * 返回瀏覽器窗口大小
     */
    getPageWindowSize:{
        value: async () => {
            await Page.getPageWindowSize.call(this, 1024, 1024);
        }
    },
    // =========================自訂方法=========================
    /**
     * 點擊登入按鈕
     */
    signInClick: {
        value: function () {
            this.signIn.click();
        }
    },
    /**
     * 點擊登出按鈕
     */
    signOutClick: {
        value: async () => {
            this.signOut.click();
        }
    },
    /**
     * 取提示彈窗方法
     */
    waitAlertDangerIsExist: {
        value: async () => {
            await this.alertDanger.waitForExist();
        }
    },
    waitSignOutIsExist: {
        value: async () => {
            await this.signOut.waitForExist();
        }
    },
});
module.exports = LoginPage;

