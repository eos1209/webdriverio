const Page = require('./page');

/**
 * 包含特定頁面的特定選擇器和方法的子頁面
 */
class LoginPage extends Page {
    /**
     * 使用 getter 方法定義選擇器
     */
    get iptUsername () { return $('#account') }
    get iptPassword () { return $('#password') }
    get btnLogin () { return $('#root > div > div.mainView_mainView__3oY3e > div > div > div.MuiCardActions-root.MuiCardActions-spacing.css-1xgg0et > form > button') }

    /**
     * 一種封裝自動化代碼以與頁面交互的方法
     * 例如 使用用戶名和密碼登錄
     */
    login (username, password) {
        this.iptUsername.setValue(username);
        this.iptPassword.setValue(password);
        this.btnLogin.click(); 
    }

    /**
     * 覆蓋特定選項以使其適應頁面對象
     */
    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
