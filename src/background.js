'use strict';

chrome.action.onClicked.addListener(async (tab) => {
  try {
    console.log('click action');
    // 检查标签页是否可以注入脚本
    if (!tab.url.startsWith('chrome://') && !tab.url.startsWith('edge://')) {
      const response = await chrome.tabs.sendMessage(tab.id, {action: 'toggleSidebar'});
      console.log('Response:', response);
    }
  } catch (error) {
    console.log('Error:', error);
    // 如果消息发送失败，可以尝试重新注入content script
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
    // 重试发送消息
    await chrome.tabs.sendMessage(tab.id, {action: 'toggleSidebar'});
  }
});

