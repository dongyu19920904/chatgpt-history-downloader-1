document.addEventListener('DOMContentLoaded', () => {
  const downloadTxtBtn = document.getElementById('downloadTxt');
  const downloadMdBtn = document.getElementById('downloadMd');
  const downloadPdfBtn = document.getElementById('downloadPdf');
  const previewElement = document.getElementById('preview');
  const loadingElement = document.getElementById('loading');
  const toggleThemeBtn = document.getElementById('toggleTheme');
  const body = document.body;

  let conversation = '';
  let conversationTitle = '';

  function getFilename(extension) {
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    // 移除不允许的字符，并限制标题长度
    const sanitizedTitle = conversationTitle.replace(/[<>:"/\\|?*]/g, '').trim().slice(0, 50);
    // 如果标题为空，使用默认标题
    const title = sanitizedTitle || 'ChatGPT对话';
    return `${date}_${title}.${extension}`;
  }

  function showLoading() {
    loadingElement.style.display = 'block';
  }

  function hideLoading() {
    loadingElement.style.display = 'none';
  }

  function updatePreview(content) {
    previewElement.textContent = content.slice(0, 300) + (content.length > 300 ? '...' : '');
  }

  function downloadConversation(format) {
    showLoading();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        hideLoading();
        alert('无法获取当前标签页。请确保您已打开 ChatGPT 对话页面。');
        return;
      }

      console.log("当前标签页:", tabs[0].url);

      if (!tabs[0].url.includes('chat.openai.com') && !tabs[0].url.includes('chatgpt.com')) {
        hideLoading();
        alert('请在 ChatGPT 对话页面使用此插件。');
        return;
      }

      chrome.tabs.sendMessage(tabs[0].id, { action: 'getConversation' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('发送消息时出错：', chrome.runtime.lastError);
          hideLoading();
          alert(`发送消息时出错：${chrome.runtime.lastError.message}\n请刷新页面后重试。如果问题仍然存在，请尝试重新安装插件。`);
          return;
        }

        if (response && response.conversation) {
          conversation = response.conversation;
          conversationTitle = response.title;
          updatePreview(conversation);
          let content = conversation;
          let dataUrl, filename;

          switch (format) {
            case 'txt':
              dataUrl = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
              filename = getFilename('txt');
              break;
            case 'md':
              dataUrl = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(content);
              filename = getFilename('md');
              break;
            case 'pdf':
              const pdf = new jsPDF();
              pdf.text(content, 10, 10);
              dataUrl = pdf.output('datauristring');
              filename = getFilename('pdf');
              break;
          }

          // 添加这个检查
          if (filename.length > 255) {
            filename = filename.slice(0, 255);
          }

          chrome.downloads.download({
            url: dataUrl,
            filename: filename,
            saveAs: true
          }, () => {
            hideLoading();
            if (chrome.runtime.lastError) {
              console.error('下载时出错：', chrome.runtime.lastError);
              alert(`下载时出错：${chrome.runtime.lastError.message}`);
            }
          });
        } else {
          hideLoading();
          alert('无法获取对话内容。请确保您已打开 ChatGPT 对话页面，并且页面已完全加载。');
        }
      });
    });
  }

  function toggleTheme() {
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      toggleThemeBtn.innerHTML = '<i class="material-icons">dark_mode</i>';
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      toggleThemeBtn.innerHTML = '<i class="material-icons">light_mode</i>';
    }
  }

  downloadTxtBtn.addEventListener('click', () => downloadConversation('txt'));
  downloadMdBtn.addEventListener('click', () => downloadConversation('md'));
  downloadPdfBtn.addEventListener('click', () => downloadConversation('pdf'));
  toggleThemeBtn.addEventListener('click', toggleTheme);

  // 初始化主题
  chrome.storage.sync.get('theme', (result) => {
    if (result.theme === 'light') {
      toggleTheme();
    }
  });

  // 保存主题设置
  function saveTheme() {
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    chrome.storage.sync.set({ theme: theme });
  }

  toggleThemeBtn.addEventListener('click', () => {
    toggleTheme();
    saveTheme();
  });
});