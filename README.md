# SE-Chat-Faces

This is a chrome extension designed for StackExchange chat. It uses ```chrome.storage.sync``` to store strings of data. The main purpose of this extension is to store Unicode faces using the built-in chrome storage API. It means that you can store these Unicode faces across all of the PC's that you use (yaaay ```chrome.storage.sync```), and you can insert them into chat with only a few mouse clicks. Can be found on the [chrome web store][2].

# Limitations

There, however, are some [limitations][1] to using ```chrome.storage.sync```. Namely, the ```MAX_ITEMS``` property. Basically this means that you can have no more than 512 items present in storage, and subsequently means you can only have 511 Unicode faces (extension reserves one item for internal use) for a grand total of `QUOTA_BYTES` (or 100kiB).

Assuming your faces are composed of 7 characters ex "(ʘ ͜ʖ ʘ)",
the first 10 smilies will cost (1 + 14) * 10 = 150 bytes (1 byte for key, 14 bytes for 7 Unicode characters), the next 90 smilies will cost (2 + 14) * 90 = 1440 bytes (2 byte key), and the remaining 411 smilies will cost (3 + 14) * 411 = 6987 bytes for a grand total of 8577 bytes (but this is assuming you won't be creative with your smilies =])

To check your remaining byte count and item count open the background page for the extension, and run the following:

Remaining bytes: 
```javascript
chrome.storage.sync.getBytesInUse(function(count) { console.log("Bytes remaining: " + (102400 - count)); });
```

Remaining items: 
```javascript
chrome.storage.sync.get("count", function(item) { console.log("Items remaining: " + (511 - item.count)); });
```

I'll probably implement these into buttons at some point™

  [1]: https://developer.chrome.com/extensions/storage#properties
  [2]: https://chrome.google.com/webstore/detail/se-chat-faces/gmjdaaahidcimfaipifeoekglllgdllb?hl=en-US&gl=US
