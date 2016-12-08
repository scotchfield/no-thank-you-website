chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (! tab.url) {
    return;
  }

  chrome.storage.sync.get({
    blockedSites: '',
  }, function(storage) {
    var blockedSites = storage.blockedSites.split('\n'),
      shouldBlock = false;

    blockedSites.forEach(function (url) {
      if (tab.url.indexOf(url) >= 0) {
        chrome.tabs.update(tab.id, {url: 'about:blank'});
      }
    });
  });
});
