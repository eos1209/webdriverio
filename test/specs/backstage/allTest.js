const assert = require('assert')
const AllureReporter = require("@wdio/allure-reporter").default
const LoginPage = require('../../backstage/login.page');
const MainPage = require('../../backstage/main.page');
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
    it('no wrong protocol', () => {
        let needReopen = false
        // 開始點擊動作
        let mainCount = MainPage.mainMenu.length
        for (let i = 1;i < mainCount; i++) { // 點擊每個主選單展開
            MainPage.mainMenu[i].waitForDisplayed()
            MainPage.mainMenu[i].scrollIntoView()
            MainPage.mainMenu[i].click()
            let childCount = MainPage.sideMenu[i-1].$$('a').length
            for (let j = 0;j < childCount; j++) { // 點擊各主選單中，每個頁面
                // 取得下一個要點擊的頁面名稱
                let pageName = MainPage.sideMenu[i-1].$$('span')[j].getText()
                let pageData = {}
                pageData.name = pageName
                pageData.errors = []
                console.log(pageName)
                // 有遇到需跳過的項目即跳過
                if (MainPage.ignorePages.indexOf(pageName) > -1) {
                    console.log(`${pageName} ignore`)
                    AllureReporter.addAttachment(`ignorePage ${pageName}`, "")
                    continue
                }
            
                // 點擊項目開啟頁面
                MainPage.sideMenu[i-1].$$('a')[j].waitForDisplayed()
                MainPage.sideMenu[i-1].$$('a')[j].scrollIntoView()
                MainPage.sideMenu[i-1].$$('a')[j].click()
                browser.setupInterceptor();
                browser.pause(200);
                pageData.url = browser.getUrl()
                try {
                    MainPage.loadingCover.waitForDisplayed({timeoust: 10000, reverse: true}) // 等待遮罩消失
                } catch (error) {
                    AllureReporter.addAttachment(`Page ${pageName} error`, "遮罩未消失")
                    addError(pageName, `Page ${pageName} error 遮罩未消失`)
                    pageData.errors = []
                    browser.takeScreenshot()
                    needReopen = true
                }

                if (!MainPage.account.isDisplayed()) { // 空頁面需紀錄
                    AllureReporter.addAttachment(`emptyPage ${pageName} ${browser.getUrl()}`, "")
                    addError(pageName, `emptyPage ${browser.getUrl()}`)
                    pageData.errors.push(`emptyPage ${browser.getUrl()}`)
                    browser.takeScreenshot()
                    needReopen = true
                }
            
                // 檢查是否有彈出提示窗，彈出表示可能有問題
                browser.pause(600);
                if (MainPage.notify.isDisplayed()) {
                    console.log('****出現錯誤彈窗啊')
                    AllureReporter.addAttachment(`Page ${pageName} error 出現彈窗`, "")
                    addError(pageName, `Page ${pageName} error 出現彈窗`)
                    pageData.errors.push(`Page ${pageName} error 出現彈窗`)
                    browser.takeScreenshot()
                }

                // 判斷res StatusCode
                let reqs = browser.getRequests()
                pageData.reqs = []
                pageData.errorReqs = []
                pageData.reqTotal = reqs.length
                reqs.forEach((req) => {
                    console.log(req.url,req.response.statusCode)
                    pageData.reqs.push({
                        url: req.url,
                        statusCode: req.response.statusCode
                    })
                    if (req.response.statusCode != 200) {
                        if (ignoreStatus.indexOf(req.response.statusCode) != -1) {
                            if (!notSuccessRes[pageName]) {
                                notSuccessRes[pageName] = []
                            }
                            errorReqs.push(req)
                            notSuccessRes[pageName].push(req)
                        }
                    }
                })

                if (notSuccessRes[pageName]) {
                    AllureReporter.addAttachment(`Page ${pageName} error`, "api 異常")
                    addError(pageName, `Page ${pageName} error api 異常`)
                    pageData.errors.push(`Page ${pageName} error api 異常`)
                    browser.takeScreenshot()
                }

                if (needReopen) {
                    needReopen = false
                    MainPage.open()
                    MainPage.mainMenu[i].click()
                }
                allLogs[pageName] = pageData
                // AllureReporter.addAttachment(`Page ${pageName} ${browser.getUrl()}`, pageData)
            }
            browser.pause(200);
        }
        if (errorPages.length > 0) {
            assert.fail("有出錯的頁面")
        }
    })

    after(() => {
        // 整理報告
        AllureReporter.addAttachment("logs", allLogs, "application/json")
        AllureReporter.addAttachment("allNotSuccessRes", notSuccessRes, "application/json")
        AllureReporter.addAttachment("allErrorPage", errorPages, "application/json")
    })
});

function addError(page, err) {
    if (!errorPages[page]) {
        errorPages[page] = []
    }
    errorPages[page].push(err)
}