const assert = require('assert')
const AllureReporter = require("@wdio/allure-reporter").default
const LoginPage = require('../../pageobjects/login.page');
const MainPage = require('../../pageobjects/main.page');
let allLogs = {}
let notSuccessRes = {}
let errorPages = {}

describe('選單測試', () => {
    beforeEach(function () {
        LoginPage.pause();
    });

    it('所有選單按鈕測試', async () => {
        LoginPage.open();
        // await LoginPage.setPageWindowSize();
        await LoginPage.account.setValue(LoginPage.content.account); // 輸入帳號
        await LoginPage.Password.setValue(LoginPage.content.password); // 輸入密碼
        // 按送出按鈕
        await LoginPage.signInClick();
        LoginPage.pause();
        let text = await MainPage.UserWelcomeWord.getText();
        expect(text).toHaveTextContaining(`Hi ~ , ${LoginPage.content.worryAccount}`);

        await MainPage.mainMenu[0].waitForDisplayed();
        await MainPage.mainMenu[0].click();
    });

    it('no wrong protocol', async () => {
        let needReopen = false;
        let mainCount = await MainPage.mainMenu.length;
        console.log('父層選單數量為：', mainCount);

        // 點擊每個主選單展開
        // 0為首頁，不測試
        for (let i = 1;i < mainCount; i++) {
           await MainPage.mainMenu[i].waitForDisplayed()
           await MainPage.mainMenu[i].scrollIntoView()
           await MainPage.mainMenu[i].click()
            let childCount = await MainPage.sideMenu[i-1].$$('a').length
            console.log('子層選單數量為：', childCount);
            // 點擊每個子選單
            for (let j = 0;j < childCount; j++) {
                // 取得下一個要點擊的頁面名稱
                let pageName = await MainPage.sideMenu[i-1].$$('span')[j].getText();
                console.log('點擊：', pageName);
                let pageData = {}
                pageData.name = pageName
                pageData.errors = []
                // 有遇到需跳過的項目即跳過
                if (MainPage.ignorePages.indexOf(pageName) > -1) {
                    console.log(`跳過： ${pageName} ignore`)
                    AllureReporter.addAttachment(`ignorePage ${pageName}`, "")
                    continue
                }

                // 點擊項目開啟頁面
                await MainPage.sideMenu[i-1].$$('a')[j].waitForDisplayed()
                await MainPage.sideMenu[i-1].$$('a')[j].scrollIntoView()
                await MainPage.sideMenu[i-1].$$('a')[j].click()

                await MainPage.setupPageInterceptor();
                // 等待頁面載入
                await MainPage.pause();

                pageData.url = await browser.getUrl();

                try {
                    // 等待遮罩消失
                   await MainPage.loadingCover.waitForDisplayed(
                       {
                              timeout: 1000,
                              reverse: true
                       }
                   )
                } catch (error) {
                    AllureReporter.addAttachment(
                        `Page ${pageName} error`,
                        "遮罩未消失",
                        "application/json"
                    )
                    addError(pageName, `Page ${pageName} error 遮罩未消失`)
                    pageData.errors = []
                    browser.takeScreenshot()
                    needReopen = true
                }

                if (!await MainPage.account.isDisplayed()) { // 空頁面需紀錄
                    AllureReporter.addAttachment(
                        `emptyPage ${pageName} ${browser.getUrl()}`,
                        "",
                        "application/json"
                    )
                    addError(pageName, `emptyPage ${browser.getUrl()}`)
                    pageData.errors.push(`emptyPage ${browser.getUrl()}`)
                    browser.takeScreenshot()
                    needReopen = true
                }

                // 檢查是否有彈出提示窗，彈出表示可能有問題
                await MainPage.pause();
                if (await MainPage.notify.isDisplayed()) {
                    console.log('****出現錯誤彈窗啊')
                    AllureReporter.addAttachment(
                        `Page ${pageName} error 出現彈窗`,
                        await MainPage.notify.getText(),
                        "application/json")
                    addError(pageName, `Page ${pageName} error 出現彈窗`)
                    pageData.errors.push(`Page ${pageName} error 出現彈窗`)
                    browser.takeScreenshot()
                }

                // 判斷res StatusCode
                let reqs = await browser.getRequests()
                console.log('reqs==>', reqs)
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
            await MainPage.pause();
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
