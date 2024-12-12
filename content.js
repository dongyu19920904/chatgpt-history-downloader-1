console.log("ChatGPT 对话保存器 content script 已加载");

function extractConversation() {
  console.log("开始提取对话内容");
  
  const selectors = [
    '.text-base',
    '.markdown',
    '.prose',
    '[data-message-author-role]',
    '.message'
  ];
  
  let conversationElements;
  for (const selector of selectors) {
    conversationElements = document.querySelectorAll(selector);
    if (conversationElements.length > 0) {
      console.log(`使用选择器 '${selector}' 找到 ${conversationElements.length} 个元素`);
      break;
    }
  }
  
  if (!conversationElements || conversationElements.length === 0) {
    console.log("未找到对话元素");
    return "";
  }

  let conversation = '';

  conversationElements.forEach((element, index) => {
    let role, content;

    if (element.hasAttribute('data-message-author-role')) {
      role = element.getAttribute('data-message-author-role');
      content = element.textContent.trim();
    } else {
      const roleElement = element.querySelector('.font-semibold') || element.querySelector('.user-name');
      role = roleElement ? roleElement.textContent.trim() : (index % 2 === 0 ? 'Human' : 'Assistant');

      const contentElement = element.querySelector('.whitespace-pre-wrap') || element.querySelector('.message-content') || element;
      content = contentElement.textContent.trim();
    }

    conversation += `${role}: ${content}\n\n`;
  });

  console.log("提取的对话内容长度：", conversation.length);
  return conversation;
}

function getConversationTitle(conversation) {
  const firstTenWords = conversation.split(/\s+/).slice(0, 10).join(' ');
  return firstTenWords.length > 50 ? firstTenWords.substring(0, 50) : firstTenWords;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("收到消息：", request);
  if (request.action === 'getConversation') {
    const conversation = extractConversation();
    const title = getConversationTitle(conversation);
    console.log("发送响应，对话内容长度：", conversation.length);
    sendResponse({ conversation: conversation, title: title });
  }
  return true; // 保持消息通道开放
});