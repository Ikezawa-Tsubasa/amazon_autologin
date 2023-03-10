var toggle = true;

var sellerFilter = "&rh=p_6%3AAN1VRQENFRJN5";
var whitelist = [
  "aps",
  "stripbooks",
  "english-books",
  "popular",
  "classical",
  "dvd",
  "videogames",
  "software",
  "computers",
  "electronics",
  "office-products",
  "kitchen",
  "pets",
  "hpc",
  "beauty",
  "luxury-beauty",
  "food-beverage",
  "baby",
  "fashion",
  "fashion-womens",
  "fashion-mens",
  "fashion-baby-kids",
  "apparel",
  "shoes",
  "watch",
  "jewelry",
  "toys",
  "hobby",
  "mi",
  "sporting",
  "automotive",
  "diy",
  "appliances",
  "gift-cards",
  "industrial"
];

var targets = function (list) {
  let targetsString = "";
  for (let value of list) {
    targetsString += `&i=${value}|search-alias%3D${value}|`
  }
  return targetsString.slice(0, -1);

}

function a (tab) {
    targetURL = tab.url;
    if (toggle &&
      targetURL.match("amazon.co.jp/s/|amazon.co.jp/s?") &&
      targetURL.match(targets(whitelist)) &&
      !targetURL.match("&k=&|.*&field-keywords=$")
    ) {
      return {
        redirectUrl: targetURL + sellerFilter
      };
    }
    return {};
  }


chrome.browserAction.onClicked.addListener(function (tab) {
  toggle = !toggle;
  if (toggle) {
    chrome.browserAction.setIcon({
      path: "icons/on2.png"
    });

  } else {
    chrome.browserAction.setIcon({
      path: "icons/off2.png"
    });
  }
  chrome.tabs.reload();
  GEvent.addListener(a, {
    urls: ["*://www.amazon.co.jp/s*"],
    types: ["main_frame"]
  },
  ["blocking"]);

});

chrome.webRequest.onBeforeRequest.addListener(a, {
    urls: ["*://www.amazon.co.jp/s*"],
    types: ["main_frame"]
  },
  ["blocking"]);