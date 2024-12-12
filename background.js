chrome.runtime.onInstalled.addListener(() => {
  console.log('ChatGPT Conversation Saver installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'downloadConversation') {
    chrome.downloads.download({
      url: request.dataUrl,
      filename: request.filename,
      saveAs: true
    });
  }
});