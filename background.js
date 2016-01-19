var tabs = new Array();
var count = -1;
var faces = [];

var isEmpty = function(obj) {
    for(prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
};

var readFaces = function() {
	faces = [];

	chrome.storage.sync.get("count", function(item) {
		if (isEmpty(item))
		{
			chrome.storage.sync.set({"count": 1});
			chrome.storage.sync.set({"0": "(ʘ ͜ʖ ʘ)"});
			faces.push({"0": "(ʘ ͜ʖ ʘ)"});
			count = 1;
			return;
		}

		count = item.count;

		if (count === 0) return;

		for (index = 0; index < count; index++)
		{
			chrome.storage.sync.get(index.toString(), function(face) {
				if (!isEmpty(face))
				{
					faces.push(face);
				}
			});
		}
	});
};

readFaces();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(changeInfo.status == 'complete' && tab.url.match(".+://chat.stackexchange.com/rooms/.*")) {
		tabs.push(tabId);
		chrome.tabs.executeScript(tabId, {code:"var	s = document.createElement('script');s.src = chrome.extension.getURL('faces.js');(document.head||document.documentElement).appendChild(s);"});
		chrome.tabs.executeScript(tabId, {code:"var i = document.createElement('input');i.value = '" + chrome.runtime.id.toString() + "';i.type = 'hidden';i.id='face-extension-id';(document.body).appendChild(i);"});
	}
});

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
	if (request.message === "get")
	{
		readFaces();
		setTimeout(function() { sendResponse({data: faces}) }, 50); // kludge: without timeout response happens before faces is populated by readFaces()
	}
	else if (request.message === "remove")
	{
		chrome.storage.sync.remove(request.data.toString());
		count -= 1;
		chrome.storage.sync.set({"count": count});
		sendResponse({message: "ok"});
	}
	else if (request.message === "add")
	{
		item = {};
		item[count.toString()] = request.data;

		chrome.storage.sync.set(item);
		count += 1;
		chrome.storage.sync.set({"count": count});
		sendResponse({message: "ok"});
	}

	return true;
});