const assert = require('assert')
const AllureReporter = require("@wdio/allure-reporter").default
const LoginPage = require('../../pageobjects/login.page');
const MainPage = require('../../pageobjects/main.page');
let allLogs = {}
let notSuccessRes = {}
let errorPages = {}

describe('登入/登出測試', () => {
    beforeEach(function () {
        LoginPage.pause();
    });

    // it('登入失敗測試', async () => {
    //     LoginPage.open();
    //     LoginPage.max();
    //     // 輸入帳號
    //     // LoginPage.account.setValue(LoginPage.content.account); // 第二種導入測試資料的管理方式
    //     await LoginPage.account.setValue(LoginPage.content.worryAccount);
    //     // 輸入錯誤密碼
    //     await LoginPage.Password.setValue(LoginPage.content.worryPassword);
    //     // 按送出按鈕
    //     await LoginPage.signInClick();
    //     // 檢查是否出現警告訊息
    //     LoginPage.waitAlertDangerIsExist();
    //     // 警告訊息的文字內容，是否如預期
    //     let text = await LoginPage.alertDanger.getText()
    //     console.log('取得文字為：', text);
    //     console.log('預期文字為：', LoginPage.content.errorMessage);
    //     // 斷言：警告訊息的文字內容包含『帳號或密碼錯誤』
    //     expect(text).toHaveTextContaining(LoginPage.content.errorMessage);
    // });

    // it('登入成功測試', async () => {
    //     LoginPage.open();
    //     LoginPage.max();
        
    //     await LoginPage.account.setValue(LoginPage.content.account); // 輸入帳號        
    //     await LoginPage.Password.setValue(LoginPage.content.password); // 輸入密碼
    //     // 按送出按鈕
    //     await LoginPage.signInClick();
    //     LoginPage.pause();
    //     let text = await MainPage.UserWelcomeWord.getText();
    //     console.log('取得歡迎詞=>', text);

    //     expect(text).toHaveTextContaining('Hi ~ , cherry');
    // });

    it('登出測試', async () => {
        LoginPage.open();
        LoginPage.max();
        
        await LoginPage.account.setValue(LoginPage.content.account); // 輸入帳號        
        await LoginPage.Password.setValue(LoginPage.content.password); // 輸入密碼
        // 按送出按鈕
        await LoginPage.signInClick();
        let text = await MainPage.UserWelcomeWord.getText();
        console.log('取得歡迎詞=>', text);
        expect(text).toHaveTextContaining('Hi ~ , cherry');
        await MainPage.signOutClick();
        
        await MainPage.waitSignOutIsExist();
        let logOutText = await MainPage.signOutDanger;
        console.log('555', logOutText);
    });

    after(() => {
        // 整理報告
        AllureReporter.addAttachment("logs", allLogs, "application/json")
        AllureReporter.addAttachment("allNotSuccessRes", notSuccessRes, "application/json")
        AllureReporter.addAttachment("allErrorPage", errorPages, "application/json")
    })
});
