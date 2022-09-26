const assert = require('assert')
const AllureReporter = require("@wdio/allure-reporter").default
const LoginPage = require('../../pageobjects/login.page');
const MainPage = require('../../pageobjects/main.page');
let allLogs = {}
let notSuccessRes = {}
let errorPages = {}

describe('登入/登出測試', () => {
    beforeEach(function() {
        LoginPage.pause();
    });

    it('登入失敗', () => {
        LoginPage.open();
        LoginPage.max()
        LoginPage.login('rd123', 'rd123');
        MainPage.passwordConfirmCancel.click()
        expect(MainPage.account).toBeExisting();
        expect(MainPage.account).toHaveTextContaining('Hi ~ , rd123');
        MainPage.mainMenu[0].waitForDisplayed()
        MainPage.mainMenu[0].click()
    });

    it('登入成功', () => {
        LoginPage.open();
        LoginPage.max()
    });

    it('登出', () => {
        LoginPage.open();
    });

    after(() => {
        // 整理報告
        AllureReporter.addAttachment("logs", allLogs, "application/json")
        AllureReporter.addAttachment("allNotSuccessRes", notSuccessRes, "application/json")
        AllureReporter.addAttachment("allErrorPage", errorPages, "application/json")
    })
});
