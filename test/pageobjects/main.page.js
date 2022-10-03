const Page = require('./page');

/**
 * 首頁(Index)
 *
 * 包含：『測試資料、選擇器、覆寫分享面方法、自定義方法』
 * */
let MainPage = Object.create(Page, {

    // 測試資料
    content: {
        get: () => {
            return {
                accountText: 'Hi ~ , cherry'
            }
        }
    },
    // 定義元素
    /**
     * 使用者歡迎字
     */
    UserWelcomeWord: {
        get: function () {
            return $('#root > div > div.MuiDrawer-root.MuiDrawer-docked.sidebar_sidebar__3_5Jb.sidebar_drawerOpen__6Os9t.css-1tu59u4 > div > div.footer_footer__202bU > div.footer_userInfo__2lV9m > div');
        }
    },
    sideMenu: {
        get: function () {
            //$$ 取得復數元素
            return $$('#root > div > div.MuiDrawer-root.MuiDrawer-docked.sidebar_sidebar__3_5Jb.sidebar_drawerOpen__6Os9t.css-1tu59u4 > div > nav > div');
        }
    },
    //登出按鍵
    signOut:{
        get: () => {
            return $('#root > div > div.MuiDrawer-root.MuiDrawer-docked.sidebar_sidebar__3_5Jb.sidebar_drawerOpen__6Os9t.css-1tu59u4 > div > div.footer_footer__202bU > div.footer_functionalFooter__nd8uA > div:nth-child(1) > button')
        }
    },
    mainMenu: {
        get: function () {
            return $$('#root > div > div.MuiDrawer-root.MuiDrawer-docked.sidebar_sidebar__3_5Jb.sidebar_drawerOpen__6Os9t.css-1tu59u4 > div > nav > button');
        }
    },
    alertDanger: {
        get: () => {
            return $('#notistack-snackbar');
        }
    },
    //登出確認彈窗
    signOutDanger: {
        get: function () {
            return $('body > div.MuiDialog-root.root--T\+awg.MuiModal-root.css-126xj0f > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogContent-root.MuiDialogContent-dividers.contentBlock--v1Q7k.css-1r09u4m');
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
        value: async () => {
            await Page.open.call(this, 'index');
        }
    },
    pause: {
        value: async () => {
           await Page.pause.call(this, 2000);
        }
    },
    getWindowSize: {
        value: () => {
            Page.getWindowSize.call(this);
        }
    },
    acceptAlert: {
        value: () => {
            Page.acceptAlert.call(this);
        }
    },
    //自訂方法

    /**
     * 按登錄按鈕
     */
    signInClick: {
        value: function () {
            this.signIn.click();
        }
    },
    /**
     * 按登出按鈕
     */
    signOutClick: {
        value: function () {
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
    /**
     * 取登出確認視窗
     */
    waitSignOutIsExist: {
        value: async () => {
            await this.signOutDanger.waitForExist();
        }
    },
    /**
     * 攔截服務器請求
     */
    setupPageInterceptor: {
        value: async () => {
            await Page.setupPageInterceptor.call(this);
        }
    }
});
module.exports = MainPage;
