/**
* 包含所有方法、選擇器和功能的主頁對象
* 在所有頁面對象之間共享
*/
function Page() {
    this.title = 'My Page';
}
Page.prototype.open = function (path) {
    browser.url(path);
};
Page.prototype.pause = function (milliseconds) {
    browser.pause(milliseconds);
};

module.exports = new Page();
// module.exports = class Page {
//     /**
//     * 打開頁面的子頁面
//     * @param path 子頁面的路徑（例如 /path/to/page.html）
//     */
//     open (path) {
//         return browser.url(`https://qa2-backstage.yile808.com/${path}`)
//     }
//
//     max () {
//         browser.maximizeWindow()
//     }
// }