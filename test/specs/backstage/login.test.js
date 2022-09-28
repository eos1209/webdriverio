const assert = require('assert')
const AllureReporter = require("@wdio/allure-reporter").default
const LoginPage = require('../../pageobjects/login.page');
// const MainPage = require('../../pageobjects/main.page');
let allLogs = {}
let notSuccessRes = {}
let errorPages = {}

describe('登入/登出測試', () => {
    // beforeEach(function () {
    //     LoginPage.pause();
    // });

    it('登入失敗', async () => {
        LoginPage.open();
        LoginPage.max();
        // 輸入帳號
        // LoginPage.account.setValue(LoginPage.content.account); // 第二種導入測試資料的管理方式
        LoginPage.account.setValue(LoginPage.content.account);
        // 輸入錯誤密碼
        LoginPage.Password.setValue(LoginPage.content.worryPassword);
        // 按送出按鈕
        LoginPage.signInClick();

        LoginPage.pause();
        // 檢查是否出現警告訊息
        LoginPage.waitAlertDangerIsExist();
        // 警告訊息的文字內容，是否如預期        
        let text = await LoginPage.alertDanger.getText();
        console.log('取得文字為：', text);
        console.log('預期文字為：', LoginPage.content.errorMessage);
        expect(text).to.contain(LoginPage.content.errorMessage);
    });

    // it('登入成功', () => {
    //     LoginPage.open();
    //     LoginPage.max();
    //     LoginPage.login('rd123', 'rd123');
    //     MainPage.passwordConfirmCancel.click()
    //     expect(MainPage.account).toBeExisting();
    //     expect(MainPage.account).toHaveTextContaining('Hi ~ , rd123');
    //     MainPage.mainMenu[0].waitForDisplayed()
    //     MainPage.mainMenu[0].click()
    // });

    // it('登出', () => {
    //     LoginPage.open();
    // });

    after(() => {
        // 整理報告
        AllureReporter.addAttachment("logs", allLogs, "application/json")
        AllureReporter.addAttachment("allNotSuccessRes", notSuccessRes, "application/json")
        AllureReporter.addAttachment("allErrorPage", errorPages, "application/json")
    })
});
