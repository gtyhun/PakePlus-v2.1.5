window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

// ========== 以下是新增的【后退+前进+刷新】按钮代码 无BUG 放心加 ==========
;(function(){
  // 1. 创建按钮容器+三个按钮，样式适配Windows，悬浮顶部不遮挡内容
  const navBar = document.createElement('div');
  navBar.style.cssText = `
    position: fixed; top: 0; left: 0; z-index: 999999;
    background: #f5f5f5; padding: 6px 8px; border-radius: 0 0 6px 0;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1); display: flex; gap: 6px;
  `;
  // 2. 按钮样式统一，点击有反馈
  const btnStyle = `
    border: none; padding: 4px 8px; border-radius: 4px;
    background: #fff; cursor: pointer; font-size: 12px;
    min-width: 60px; border:1px solid #ddd;
  `;
  // 3. 创建三个按钮 + 绑定原生功能
  const backBtn = document.createElement('button');
  backBtn.innerText = '后退';
  backBtn.style.cssText = btnStyle;
  backBtn.onclick = () => window.history.back(); // 原生后退功能

  const forwardBtn = document.createElement('button');
  forwardBtn.innerText = '前进';
  forwardBtn.style.cssText = btnStyle;
  forwardBtn.onclick = () => window.history.forward(); // 原生前进功能

  const refreshBtn = document.createElement('button');
  refreshBtn.innerText = '刷新';
  refreshBtn.style.cssText = btnStyle;
  refreshBtn.onclick = () => window.location.reload(); // 原生刷新功能

  // 4. 组装按钮并添加到页面
  navBar.appendChild(backBtn);
  navBar.appendChild(forwardBtn);
  navBar.appendChild(refreshBtn);
  document.body.appendChild(navBar);
})();