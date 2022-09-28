var con = require('../../wdio.conf');

/**
* 包含所有方法、選擇器和功能的主頁對象
* 在所有頁面對象之間共享
*/
function Page() {
    this.title = 'My Page';
}
Page.prototype.open = function (path) {
    browser.url(`${con.config.baseUrl}/${path}`);
};
Page.prototype.pause = function (milliseconds) {
    browser.pause(milliseconds);
};

Page.prototype.max = function () {
    browser.maximizeWindow();
}

module.exports = new Page();