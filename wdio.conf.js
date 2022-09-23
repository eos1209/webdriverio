const NODE_ENV = process.env.NODE_ENV || 'development';

const allure = require("allure-commandline")
exports.config = {
    //
    // ====================
    // 流道配置
    // ====================
    //
    // WebdriverIO 允許它在任意位置（例如本地或遠程機器上）運行您的測試。
    // 
    runner: 'local',
    //
    // ==================
    // 指定測試文件
    // ==================
    // 定義應該運行哪些測試規範。 該模式與調用 `wdio` 的目錄相關。
    // 請注意，如果您從 NPM 腳本調用 `wdio`（請參閱 https://docs.npmjs.com/cli/run-script），
    // 則當前工作目錄是您的 package.json 所在的位置，因此 `wdio` 將 從那裡被調用。
    //
    specs: [
        './test/specs/**/allTest.js'
    ],
    // 要排除的模式。
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // 能力
    // ============
    // 在這裡定義你的能力。 WebdriverIO 可以同時運行多個功能。
    // 根據功能的數量，WebdriverIO 會啟動幾個測試會話。 在您的能力範圍內，
    // 您可以覆蓋規範並排除選項為了將特定規格分組到特定功能。
    //
    // 首先，您可以定義應該同時啟動多少個實例。 讓我們
    // 假設您有 3 種不同的功能（Chrome、Firefox 和 Safari）並且您有
    // 將 maxInstances 設置為 1； wdio 將產生 3 個進程。 因此，如果您有 10 個規格
    // 文件並將 maxInstances 設置為 10，所有規範文件將同時進行測試
    // 將產生 30 個進程。 屬性處理多少能力
    // 從同一個測試應該運行測試。
    //
    maxInstances: 10,
    //
    // 如果您無法將所有重要功能整合在一起，請查看
    // Sauce Labs 平台配置器 - 配置您的功能的絕佳工具：
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [
        {    
        // maxInstances 可以根據功能被覆蓋。 因此，如果您有內部 Selenium
        // 只有 5 個可用的 firefox 實例的網格，您可以確保不超過
        // 一次啟動 5 個實例。
        maxInstances: 5,
        //
        browserName: 'chrome',
        acceptInsecureCerts: true
        // 如果提供了 outputDir，WebdriverIO 可以捕獲驅動會話日誌
        // 可以配置要包含/排除的日誌類型。
        // excludeDriverLogs: ['*'], // 傳遞 '*' 排除所有驅動會話日誌
        // excludeDriverLogs: ['bugreport', 'server'],
        },
        {
            // maxInstances 可以根據功能被覆蓋。 因此，如果您有內部 Selenium
            // 只有 5 個可用的 firefox 實例的網格，您可以確保不超過
            // 一次啟動 5 個實例。
            maxInstances: 5,
            //
            browserName: 'firefox'
          }
    ],
    //
    // ===================
    // 測試配置
    // ===================
    // 在此處定義與 WebdriverIO 實例相關的所有選項
    //
    // 日誌詳細級別: trace | debug | info | warn | error | silent
    logLevel: 'warn',
    //
    // 為每個記錄器設置特定的日誌級別
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
    // 日誌記錄詳細程度: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // 如果您只想運行測試直到特定數量的測試失敗，請使用
    // 保釋（默認為 0 - 不保釋，運行所有測試）。
    bail: 0,
    //
    // 設置一個基本 URL 以縮短 url 命令調用。 如果您的 `url` 參數開始
    // 使用 `/`，基本 url 會被添加，不包括你的 baseUrl 的路徑部分。
    // 如果您的 `url` 參數以沒有方案或 `/`（如 `some/path`）開頭，則基本 url
    // 直接被前置。
    baseUrl: 'http://localhost',
    //
    // 所有 waitFor* 命令的默認超時。
    waitforTimeout: 10000,
    //
    // 請求的默認超時時間（以毫秒為單位）
    // 如果瀏覽器驅動程序或網格沒有發送響應
    connectionRetryTimeout: 120000,
    //
    // 默認請求重試次數
    connectionRetryCount: 3,
    //
    // 測試運行器服務
    // 服務接管您不想處理的特定工作。 他們增強
    // 你的測試設置幾乎不費吹灰之力。 與插件不同，它們不會添加新的
    // 命令。 相反，他們將自己融入到測試過程中。
    services: ['chromedriver','intercept'],
    
    // 您要運行規範的框架。
    // 支持以下幾種：Mocha、Jasmine 和 Cucumber
    // 另見：https://webdriver.io/docs/frameworks
    //
    // 確保您已安裝特定框架的 wdio 適配器包
    // 在運行任何測試之前。
    framework: 'mocha',
    //
    // 當整個spec文件失敗時重試整個spec文件的次數 
    // spec File Retries: 1,
    //
    // 規範文件重試嘗試之間的延遲（以秒為單位）
    // specFileRetriesDelay: 0,
    //
    // 重試的規範文件是否應該立即重試或推遲到隊列末尾
    // specFileRetriesDeferred: false,
    //
    // 標準輸出的測試報告器。
    // 默認支持的唯一一個是 'dot'
    // 另見：https://webdriver.io/docs/dot-reporter
    reporters: ['spec',
        [
            'allure', 
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false
            }
        ]
    ],
    
    //
    // 傳遞給 Mocha 的選項。
    // 查看完整列表 http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 9999000
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO 提供了幾個可以用來干擾測試過程的鉤子，以增強
    // 它並圍繞它構建服務。 您可以應用單個函數或數組
    // 方法。 如果其中一個返回一個承諾，WebdriverIO 將等到該承諾得到
    // 決定繼續。
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
     onPrepare: function (config, capabilities) {
        allure.removeDir("./allure-report"); // 每次執行測試前，會把之前的allure保留的測試結果清空
        allure.removeDir("./allure-results");
     },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    // beforeTest: function (test, context) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
    afterTest: function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            browser.takeScreenshot();
        }
        if (error) {
            browser.takeScreenshot();
        }
    },


    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * 在所有測試完成後執行。 您仍然可以訪問測試中的所有全局變量。
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * 在終止 webdriver 會話後立即執行。
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * 在所有工作人員關閉並且進程即將退出後執行。 一個錯誤
     * 在 onComplete 鉤子中拋出將導致測試運行失敗。
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    onComplete: function(exitCode, config, capabilities, results) {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },
    /**
    * 發生刷新時執行。
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}

// if (NODE_ENV === 'production') {
//   config.reporters = ['dot', 'spec', 'allure'];
//   config.reporterOptions = {
//     junit: {
//       outputDir: './allure-results'
//     }
//   };
//   config.host = 'hub';
//   config.port = 4444;
// }
