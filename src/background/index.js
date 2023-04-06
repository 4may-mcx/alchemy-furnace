/* eslint-disable */

/*global chrome*/
// TODO: 现在看起来好像没什么用，搞不清楚为什么
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    const rule = {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            hostEquals: "openai.zhenguanyu.com",
          },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowAction()],
    };
    chrome.declarativeContent.onPageChanged.addRules([rule]);
  });
});
