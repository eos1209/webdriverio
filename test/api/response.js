const AllureReporter = require("@wdio/allure-reporter").default;

class Response {
    //response code判斷
    allureEndStep(response) {
        let responseInfo = {
            method: response.config.method,
            url: response.config.url,
            response: response.data
        };
        if (response.data.code === "0") {
            // AllureReporter.addAttachment("Success Response", responseInfo, "application/json");
            AllureReporter.endStep("passed");
        } else {
            AllureReporter.addAttachment("Fail Response", responseInfo, "application/json");
            AllureReporter.endStep("failed");
        }
    }
}

module.exports = new Response();