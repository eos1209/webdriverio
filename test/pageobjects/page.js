var con = require('../../wdio.conf');

/**
* 包含所有方法、選擇器和功能的主頁對象
* 在所有頁面對象之間共享
*/
function Page() {
    this.title = 'My Page';
}
Page.prototype.open = async function (path) {
    console.log('調用Uri=>', `${con.config.baseUrl}/${path}`);
    await browser.url(`${con.config.baseUrl}/${path}`);
};
Page.prototype.pause = async function (milliseconds) {
    console.log('暫停秒數=>', milliseconds);
    await browser.pause(milliseconds);
};

Page.prototype.max = function () {
    browser.setWindowSize(1024, 1024);
}

module.exports = new Page();