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
 * 暫停執行一段特定的時間。建議不要使用此命令等待元素出現。
 * 為了避免不穩定的測試結果，
 * 最好使用類似的命令 waitForExist或其他 waitFor* 命令。
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
 * 調用此命令時，您會自動切換到新窗口。
 * @param {String} url 路徑
 */
Page.prototype.newWindow = (url) => {
    browser.newWindow(url);
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
    browser.saveScreenshot(filepath);
}

module.exports = new Page();