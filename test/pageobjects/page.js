var con = require('../../wdio.conf');

/**
 * 包含所有方法、選擇器和功能的主頁對象
 * 在所有頁面對象之間共享
*/
function Page() {
    this.title = 'My Page';
}

/**
 * 打開測試頁面
 * @param {string} path Uri路徑
 */
Page.prototype.open = async function (path) {
    console.log('調用Uri=>', `${con.config.baseUrl}/${path}`);
    await browser.url(`${con.config.baseUrl}/${path}`);
};

/**
 * Pause()方法用於在給定時間內暫停執行。參數以毫秒為單位傳遞。
 * 避免使用這種持續的停頓。這將增加執行時間，
 * 因為我們給出了特定的持續時間。它類似於 Thread.sleep()
 * 暫停執行一段特定的時間。建議不要使用此命令等待元素出現。
 * 為了避免不穩定的測試結果，最好使用類似的命令 waitForExist或其他 waitFor* 命令。
 * @param {string} milliseconds 以毫秒為單位的時間
 */
Page.prototype.pause = async function (milliseconds) {
    // console.log('調用暫停秒數為：', milliseconds);
    await browser.pause(milliseconds);
};

/**
 * 設定cookies
 * @param {object} value
 */
Page.prototype.setPageCookies = async (value) => {
    await browser.setCookies(
        [
            {name: 'test', value: '123'}
        ]
    );
};

/**
 * 取得cookies
 * @param {Array.<String>} names 請求cookie的名稱，如果省略，將返回所有 cookie）
 */
Page.prototype.getPageCookies = async (names) => {
    // console.log('調用取得cookies名稱為：', names);
    await browser.getCookies(names);
    //範例
    // const testCookie = await browser.getCookies(['test'])
    // console.log(testCookie); // outputs: [{ name: 'test', value: '123' }]
};

/**
 * 返回瀏覽器窗口大小
 */
 Page.prototype.getPageWindowSize = () => {
    // console.log('取得營幕尺吋');
    browser.getWindowSize();
};

/**
 * 根據提供的寬度和高度調整瀏覽器窗口的外部大小。
 * @param {Number} width 寬
 * @param {Number} height 高
 */
Page.prototype.setPageWindowSize = function (width, height) {
    // console.log('調整營幕尺吋=>', `寬：${width}、高：${height}`);
    browser.setWindowSize(width, height);
};

/**
 * 瀏覽器窗口最大化
 */
Page.prototype.fullscreenWindow = () => {
    browser.fullscreenWindow();
};

/**
 * 在同一個窗口中，導到該路徑
 * @param {String} url 網頁路徑
 */
Page.prototype.navigateTo = (url) => {
    browser.navigateTo(url);
};

/**
 * 導航至上一頁
 */
Page.prototype.back = () => {
    browser.back();
};

/**
 * WebDriverIO 提供此命令來重新加載您當前的瀏覽器。
 */
Page.prototype.refresh = () => {
    browser.refresh();
};

/**
 * newWindow当您想在新的浏览器窗口中打开一个新的 url 时使用命令。
 * 包括的其他参数是windoname 和窗口功能。您可以使用它们分别设置窗口的名称及其大小、位置等。
 * @param {String} url 路徑
 */
Page.prototype.newWindow = (url) => {
    browser.newWindow(url);
    /**
     * 範例:
     * describe("Browser Commands ", function() {
            it("newWindow example ", function() {
               browser.url("https://www.<code>ikeepstudying</code>.com/");
               browser.newWindow( "https://www.google.com/", "Google Window", "width=800,height=700,resizable,scrollbars=yes,status=1" );
               browser.pause(5000); console.log(browser.getTitle());
             //opening Google and writing text on newly opened window $(".//input[@name='q']").setValue("lambdatest.com"); browser.pause(5000); }); });
     */
}

/**
 * closeWindow命令命令發現非常相似。在新窗口命令與命令closeWindow瀏覽器之間關閉關閉器。請記住，closeWindow 不會執行器。
 * 如果主瀏覽器沒有被父瀏覽器處理並且/主時間，那麼並沒有隨著時間的推移而被執行關閉所有瀏覽器。
 * @param {String} url
 */
Page.prototype.closeWindow = (url) => {
    browser.closeWindow(url);
}

/**
 * 將當前瀏覽上下文的屏幕截圖保存到操作系統上的 PNG 文件。
 * 請注意，某些瀏覽器驅動程序會截取整個文檔（例如 Geckodriver 和 Firefox），
 * 而其他瀏覽器驅動程序只截取當前視口（例如 Chromedriver 和 Chrome）。
 * @param {String} filepath 相對於執行目錄的生成圖像的路徑（.png需要後綴）
 */
Page.prototype.saveScreenshot = (filepath) => {
    browser.saveScreenshot(filepath);
}

/**
 * 將焦點切換到特定的選項卡/窗口。
 * @param {String} matcher
 */
Page.prototype.switchWindow = (matcher) => {
    browser.switchWindow(matcher);
}

//彈窗處理
/**
 * 單擊“確定”按鈕。
 * 方法类似于driver.switchTo().alert().accept() selenium java。
 * 它可以幫助用戶單擊警報彈出窗口中的“確定”按鈕。
 */
Page.prototype.acceptAlert = () => {
    browser.acceptAlert();
}

/**
 * 單擊“取消”按鈕。
 * 如果將此方法與 In selenium java 進行比較，
 * 則它就像driver.switchTo().alert().dismiss()
 */
Page.prototype.dismissAlert = () => {
    browser.dismissAlert();
}

/**
 * 獲取警報的文本。
 */
Page.prototype.getAlertText = () => {
    browser.getAlertText();
    /**
     * 範例:
     * const msg = browser.getAlertText();
     * console.log(msg);
     */
}

/**
 * 發送至輸入框的文本。
 * @param {String} text 輸入的文本
 */
Page.prototype.sendAlertText = (text) => {
    browser.sendAlertText(text);
}

/**
 * 方法用于检查警报是否可见。
 * 如果警报可見，則返回true，否則返回false。
 */
Page.prototype.isAlertOpen = () => {
    browser.isAlertOpen();
}

module.exports = new Page();
