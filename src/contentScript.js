'use strict';

// content.js
let sidebarVisible = false;
const sidebar = document.createElement('div');

sidebar.style.position = 'fixed';
sidebar.style.top = '0';
sidebar.style.right = '0';
sidebar.style.width = '300px';
sidebar.style.height = '100%';
sidebar.style.backgroundColor = 'white';
sidebar.style.boxShadow = '-2px 0 5px rgba(0,0,0,0.5)';
sidebar.style.zIndex = '1000';
sidebar.style.display = 'none'; // 初始隐藏

// 添加内容到侧边栏
sidebar.innerHTML = `
    <h1>侧边栏</h1>
    <p>这里是固定在右侧的内容。</p>
`;

document.body.appendChild(sidebar);

// 添加消息监听器
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  if (request.action === 'toggleSidebar') {
    sidebarVisible = !sidebarVisible;
    sidebar.style.display = sidebarVisible ? 'block' : 'none';
    sendResponse({ success: true });
  }
  return true; // 保持消息通道开放，用于异步响应
});

// 添加加载确认
console.log('Content script loaded');
