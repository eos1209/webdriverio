const assert = require('assert')
const AllureReporter = require("@wdio/allure-reporter").default
const LoginPage = require('../../backstagePage/login.page');
const MainPage = require('../../backstagePage/main.page');
let allLogs = {}
let notSuccessRes = {}
let errorPages = {}

describe('RD Test', () => {
    it('login', () => {
        LoginPage.open();
        LoginPage.max()
        LoginPage.login('rd123', 'rd123');
        MainPage.passwordConfirmCancel.click()
        expect(MainPage.account).toBeExisting();
        expect(MainPage.account).toHaveTextContaining('Hi ~ , rd123');
        MainPage.mainMenu[0].waitForDisplayed()
        MainPage.mainMenu[0].click()
    });

    after(() => {
        // 整理報告
        AllureReporter.addAttachment("logs", allLogs, "application/json")
        AllureReporter.addAttachment("allNotSuccessRes", notSuccessRes, "application/json")
        AllureReporter.addAttachment("allErrorPage", errorPages, "application/json")
    })
});