const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MainPage extends Page {
    /**
     * define selectors using getter methods
     */
    get passwordConfirmCancel () { return $('body > div.MuiModal-root.MuiDialog-root.confirmDialog_root__vwbND.css-126xj0f > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div > div.MuiDialogActions-root.MuiDialogActions-spacing.confirmDialog_actionBlock__1oPw0.css-14b29qc > button.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeSmall.MuiButton-textSizeSmall.MuiButtonBase-root.confirmDialog_darkBtn__3JLoE.css-ozko0k') }
    get account () { return $('#root > div > div.MuiDrawer-root.MuiDrawer-docked.sidebar_sidebar__3_5Jb.sidebar_drawerOpen__6Os9t.css-1tu59u4 > div > div.footer_footer__202bU > div.footer_userInfo__2lV9m > div') }
    get sideMenu () { return $$('#root > div > div.MuiDrawer-root.MuiDrawer-docked.sidebar_sidebar__3_5Jb.sidebar_drawerOpen__6Os9t.css-1tu59u4 > div > nav > div') }
    get mainMenu () { return $$('#root > div > div.MuiDrawer-root.MuiDrawer-docked.sidebar_sidebar__3_5Jb.sidebar_drawerOpen__6Os9t.css-1tu59u4 > div > nav > button') }
    get notify () { return $('#root > div.SnackbarContainer-top.SnackbarContainer-right.SnackbarContainer-root.css-uwcd5u > div > div > div') }     
    get loadingCover () { return $('#loading-cover') }

    get ignorePages () { return ["七朵花數值調整", "彩金數值調整", "修改密碼"] }
    get ignoreStatus () { return [] }
    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open('index');
    }
}

module.exports = new MainPage();
