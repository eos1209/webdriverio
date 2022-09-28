const Page = require('./page');
let MainPage = Object.create(Page, {

    // 測試資料
    content: {
        get: () => {
            return {
                account: 'cherry',
                password: 'cherry',
                worryAccount: 'rd123',
                worryPassword: '1234',
                errorMessage: '帳號或密碼錯誤'
            }
        }
    },

    // 定義元素
    //帳號
    account: {
        get: function () {
            // return browser.element('#account'); //v5不再可用此方法
            return $('#root > div > div.MuiDrawer-root.MuiDrawer-docked.sidebar_sidebar__3_5Jb.sidebar_drawerOpen__6Os9t.css-1tu59u4 > div > div.footer_footer__202bU > div.footer_userInfo__2lV9m > div');
        }
    },
    //密碼
    Password: {
        get: function () {
            // return browser.element('#password');
            return $('#password');
        }
    },
    sideMenu: {
        get: function () {
            return $$('#root > div > div.MuiDrawer-root.MuiDrawer-docked.sidebar_sidebar__3_5Jb.sidebar_drawerOpen__6Os9t.css-1tu59u4 > div > nav > div');
        }
    },
    //登錄
    signIn: {
        get: function () {
            return $('#root > div > div.mainView_mainView__3oY3e > div > div > div.MuiCardActions-root.MuiCardActions-spacing.css-1xgg0et > form > button');
        }
    },
    mainMenu: {
        get: function () {
            return $$('#root > div > div.MuiDrawer-root.MuiDrawer-docked.sidebar_sidebar__3_5Jb.sidebar_drawerOpen__6Os9t.css-1tu59u4 > div > nav > button');
        }
    },
    alertDanger: {
        get: function () {
            // return browser.element('#root > div.SnackbarContainer-top.SnackbarContainer-right.SnackbarContainer-root.css-uwcd5u > div > div > div');
            return $('#notistack-snackbar');
        }
    },
    notify: {
        get: function () {
            return $('#root > div.SnackbarContainer-top.SnackbarContainer-right.SnackbarContainer-root.css-uwcd5u > div > div > div');
        }
    },
    passwordConfirmCancel: {
        get: function () {
            return $('body > div.MuiModal-root.MuiDialog-root.confirmDialog_root__vwbND.css-126xj0f > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogActions-root.MuiDialogActions-spacing.confirmDialog_actionBlock__1oPw0.css-14b29qc > button.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeSmall.MuiButton-textSizeSmall.MuiButtonBase-root.confirmDialog_darkBtn__3JLoE.css-ozko0k');
        }
    },
    loadingCover: {
        get: function () {
            return $('#loading-cover');
        }
    },
    ignorePages: {
        get: function () {
            return ["七朵花數值調整", "彩金數值調整", "修改密碼"];
        }
    },
    ignoreStatus: {
        get: function () {
            return [];
        }
    },
    // override 方法
    open: {
        value: function () {
            Page.open.call(this, 'index');
        }
    },
    pause: {
        value: function () {
            Page.pause.call(this, 8000);
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
    //取錯誤彈窗方法
    waitAlertDangerIsExist: {
        value: function () {
            console.log("進錯誤視窗==>")
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
module.exports = MainPage;