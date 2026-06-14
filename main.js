document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. Retro Typewriter Engine (RPG 對話框置中打字機大標題效果)
     ========================================================================== */
  const titleTxt = "HANKUUU";
  let titleIdx = 0;

  function typeTitle() {
    if (titleIdx < titleTxt.length) {
      const titleEl = document.getElementById('typewriter-title');
      if (titleEl) {
        titleEl.textContent += titleTxt.charAt(titleIdx);
        titleIdx++;
        setTimeout(typeTitle, 120);
      }
    }
  }

  const tEl = document.getElementById('typewriter-title');
  if (tEl) tEl.textContent = "";

  /* ==========================================================================
     🕹️ 街機投幣開場黑幕動態生成 (Arcade Boot Injector)
     ========================================================================== */
  function createArcadeBootScreen() {
    const overlay = document.createElement('div');
    overlay.id = 'arcade-boot-screen';
    overlay.className = 'arcade-overlay';
    overlay.innerHTML = `
      <div class="arcade-container">
        <div class="pixel-cabinet-title">INSERT COIN TO START</div>
        <div class="coin-slot-btn">
          <span class="blink-text">▶ PRESS START TO PLAY ◀</span>
        </div>
        <p class="arcade-hint">[ 點擊螢幕任意處解鎖玩家主機 ]</p>
      </div>
    `;
    document.body.insertBefore(overlay, document.body.firstChild);

    const heroContent = document.getElementById('hero-main-content');
    if (heroContent) {
      heroContent.classList.add('game-loading');
    }

    overlay.addEventListener('click', () => {
      overlay.classList.add('inserted');
      if (heroContent) {
        heroContent.classList.remove('game-loading');
        heroContent.classList.add('game-ready');
      }
      setTimeout(typeTitle, 300); 
      setTimeout(() => overlay.remove(), 1000);
    });
  }

  createArcadeBootScreen();

  /* ==========================================================================
     3. 🎮 雙向滾動顯現與消除核心 (IntersectionObserver)
     ========================================================================== */
  const revealCards = document.querySelectorAll('.scroll-reveal');
  const revealCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      } else {
        entry.target.classList.remove('revealed');
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.05,
    rootMargin: "0px 0px -50px 0px"
  });
  revealCards.forEach(card => revealObserver.observe(card));

  /* ==========================================================================
     4. Scroll Progress Bar (頂部滾動進度條)
     ========================================================================== */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = document.documentElement.clientHeight;
      if (docHeight - winHeight > 0) {
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
      }
    });
  }

  /* ==========================================================================
     5. Theme Toggle (深淺色模式切換)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (themeToggleBtn) {
    themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      let newTheme = 'light';
      if (currentTheme === 'light') {
        newTheme = 'dark';
        themeToggleBtn.textContent = '☀️';
      } else {
        themeToggleBtn.textContent = '🌙';
      }
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  /* ==========================================================================
     6. Back to Top Button (回到頂部)
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     🚀 核心升級：開發者資料引擎與後台控制艙 (Data Engine & Admin System)
     ========================================================================== */
  
  // 1. 預設的原始作品數據儲存庫 (精準校準 link 彈窗名稱)
  const defaultProjects = [
    { id: "p1", year: "y1", icon: "📚", meta: "大學國文 / 全國入圍", title: "藍色希望的呼喚", desc: "電子書創作大賽獲獎作品", link: "https://edu.gogofinder.com.tw/gogofinderReader/index.php?bid=117436076" },
    { id: "p2", year: "y2", icon: "😈", meta: "核心實作 / 核心功能 30%", title: "妖你來記帳 APP", desc: "結合心理學與遊戲化的理財工具", link: "case-study-modal" },
    { id: "p3", year: "y2", icon: "🎬", meta: "影視概論 / 感動久久競賽", title: "擲到我們不會再見", desc: "微電影創作與動態視覺敘事", link: "https://youtu.be/t_doWHYbtN8" },
    { id: "p4", year: "y2", icon: "🎨", meta: "數位多媒體 / 人機共創", title: "格林童話：金烏篇", desc: "AI 生成線條 + 人工電繪上色實驗", link: "illustration-modal" },
    { id: "p5", year: "y2", icon: "📷", meta: "數位攝影 / 期中實驗", title: "《框取室界》", desc: "物理遮擋與幾何框架減法攝影", link: "photography-midterm-modal" },
    { id: "p6", year: "y2", icon: "🪞", meta: "數位攝影 / 期末主題", title: "《REFLECT 反射》", desc: "日常物理折射與光影解構影像", link: "photography-final-modal" },
    { id: "p7", year: "y2", icon: "📊", meta: "資訊視覺化 / 數據分析", title: "Power BI 數據呈現", desc: "將複雜資料轉化為直觀圖表", link: "https://youtu.be/ci768ZIywps" }
  ];

  // 從瀏覽器快取讀取作品，如果第一次打開，就用上面的預設作品
  let myProjects = JSON.parse(localStorage.getItem('hank_portfolio_data')) || defaultProjects;

  // 2. 麥塊成就樹動態渲染核心
  function renderMinecraftTree() {
    const root = document.getElementById('mc-tree-dynamic-root');
    if (!root) return;

    // 定義四個學年的標題
    const yearTitles = { y1: "大一：啟程", y2: "大二：轉職", y3: "大三：進化", y4: "大四：不朽" };
    let htmlTemplate = "";

    // 依序生成大一到大四 the 樹狀分支
    const years = ['y1', 'y2', 'y3', 'y4'];
    years.forEach((y, index) => {
      // 篩選出屬於該學年的所有卡片
      const yearProjects = myProjects.filter(p => p.year === y);
      
      htmlTemplate += `<div class="mc-tier" data-tier-year="${y}">`;
      htmlTemplate += `<div class="tier-label">${yearTitles[y]}</div>`;
      htmlTemplate += `<div class="mc-nodes">`;

      if (yearProjects.length === 0) {
        // 如果該年級沒有作品，自動補上「敬請期待」方塊
        htmlTemplate += `
          <article class="mc-node-card scroll-reveal" data-year="${y}">
            <div class="mc-icon-box" style="background-color: #555555; color: #aaaaaa;">🔒</div>
            <div class="mc-node-content" style="display: flex; align-items: center; min-height: 48px;">
              <h4 style="margin: 0; font-family: 'Press Start 2P', 'DotGothic16', monospace; color: #aaaaaa; font-weight: bold;">敬請期待</h4>
            </div>
          </article>
        `;
      } else {
        // 渲染該年級的所有作品卡片
        yearProjects.forEach(proj => {
          let actionButton = "";
          if (proj.link) {
            if (proj.link.startsWith('http')) {
              actionButton = `<a href="${proj.link}" target="_blank" class="mc-link">閱讀實體 ↗</a>`;
            } else {
              actionButton = `<button class="mc-modal-btn" data-modal-target="${proj.link}">專案解析 ↗</button>`;
            }
          }

          let specialClass = "";
          if (proj.id === "p1") specialClass = "root-node";
          if (proj.id === "p2") specialClass = "challenge-node";

          htmlTemplate += `
            <article class="mc-node-card scroll-reveal" data-year="${y}">
              <div class="mc-icon-box ${specialClass}">${proj.icon}</div>
              <div class="mc-node-content">
                <span class="mc-node-meta">${proj.meta}</span>
                <h4>${proj.title}</h4>
                <p>${proj.desc}</p>
                ${actionButton}
              </div>
            </article>
          `;
        });
      }

      htmlTemplate += `</div></div>`; 

      if (index < years.length - 1) {
        htmlTemplate += `<div class="mc-connector-line" data-line-after="${y}"></div>`;
      }
    });

    root.innerHTML = htmlTemplate;

    // 重新綁定 Scroll Reveal 偵測器
    const revealCards = document.querySelectorAll('.scroll-reveal');
    if (typeof revealObserver !== 'undefined') {
      revealCards.forEach(card => revealObserver.observe(card));
    }
  }

  // 3. 後台管理介面清單更新 (優化為裝備卡片模板)
  function renderAdminList() {
    const listContainer = document.getElementById('admin-current-list');
    if (!listContainer) return;

    if (myProjects.length === 0) {
      listContainer.innerHTML = "<p style='font-size:12px; color:#888; text-align:center;'>[ 目前背包空空如也 ]</p>";
      return;
    }

    let listHtml = "";
    myProjects.forEach(p => {
      const yearLabels = { y1: "大一", y2: "大二", y3: "大三", y4: "大四" };
      // 重構為高質感的道具欄卡片網格
      listHtml += `
        <div class="inventory-item-card">
          <div class="inv-card-info">
            <span class="inv-info-meta">[${yearLabels[p.year]}成就] ${p.icon}</span>
            <div class="inv-info-title">${p.title}</div>
          </div>
          <div class="inv-actions-box">
            <button class="admin-edit-btn" data-edit-id="${p.id}">修改</button>
            <button class="admin-delete-btn" data-delete-id="${p.id}">刪除</button>
          </div>
        </div>
      `;
    });
    listContainer.innerHTML = listHtml;
  }

  // 4. 初始化動態作品集系統
  renderMinecraftTree();

  /* ==========================================================================
     ⚙️ 核心重寫：麥塊進度樹分類引擎 (Filter System)
     ========================================================================== */
  function applyYearFilter(targetYear) {
    const mcTiers = document.querySelectorAll('.mc-tier');
    const connectorLines = document.querySelectorAll('.mc-connector-line');

    if (targetYear === 'all') {
      mcTiers.forEach(tier => tier.classList.remove('fade-out'));
      connectorLines.forEach(line => line.classList.remove('fade-out'));
    } else {
      mcTiers.forEach(tier => {
        const tierYear = tier.getAttribute('data-tier-year');
        if (tierYear === targetYear) {
          tier.classList.remove('fade-out');
        } else {
          tier.classList.add('fade-out');
        }
      });
      connectorLines.forEach(line => line.classList.add('fade-out'));
    }
  }

  // 預設強制鎖定「大一 (y1)」
  applyYearFilter('y1');

  /* ==========================================================================
     🔐 開發者安全驗證防護系統 (Admin Authentication System)
     ========================================================================== */
  const ADMIN_PASSWORD = "Hank950718"; // 🛠️ 請在這裡設定你的專屬後台密碼！
  let isAdminAuthenticated = false;     // 紀錄本次會話是否已驗證通過

  /* ==========================================================================
     8. 全球事件代理監聽 (已完美注入密碼安全防護閘)
     ========================================================================== */
  let currentSlideIndex = 0;
  function updateCarouselDisplay(index) {
    const slides = document.querySelectorAll('#illustration-modal .carousel-slide');
    const dots = document.querySelectorAll('#illustration-modal .carousel-dots .dot');
    if (!slides.length) return;
    if (index >= slides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex = index;

    slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlideIndex));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlideIndex));
  }

  document.addEventListener('click', (e) => {
    
    // ① 偵測點擊導覽列右上角的 🔧 工具按鈕
    if (e.target.id === 'admin-console-trigger') {
      // 物理安全性攔截：如果還沒驗證過，強行攔截並要求輸入密碼
      if (!isAdminAuthenticated) {
        const authModal = document.getElementById('admin-auth-modal');
        const errEl = document.getElementById('auth-error-msg');
        if (errEl) errEl.style.display = 'none'; // 清空上一次的錯誤訊息
        document.getElementById('admin-auth-password').value = ""; // 清空輸入框
        
        if (authModal) {
          authModal.classList.add('active');
          document.body.classList.add('modal-open');
        }
      } else {
        // 如果先前已經成功驗證過，直接順暢放行進入大後台
        const adminModal = document.getElementById('admin-modal');
        if (adminModal) {
          adminModal.classList.add('active');
          document.body.classList.add('modal-open');
          renderAdminList();
        }
      }
      return;
    }

    // 🔐 偵測點擊「驗證並解鎖控制艙」按鈕
    if (e.target.id === 'admin-auth-submit-btn') {
      const inputPass = document.getElementById('admin-auth-password').value;
      const errEl = document.getElementById('auth-error-msg');
      const authModal = document.getElementById('admin-auth-modal');
      const adminModal = document.getElementById('admin-modal');

      if (inputPass === ADMIN_PASSWORD) {
        // 驗證成功！
        isAdminAuthenticated = true; 
        if (errEl) errEl.style.display = 'none';
        
        // 關閉驗證彈窗，無縫加載並開啟大後台主面板
        if (authModal) authModal.classList.remove('active');
        if (adminModal) {
          adminModal.classList.add('active');
          renderAdminList();
        }
      } else {
        // 驗證失敗，跳出紅字點陣警示
        if (errEl) errEl.style.display = 'block';
        document.getElementById('admin-auth-password').value = "";
      }
      return;
    }

    // ② 偵測後台「修改」作品
    const editBtn = e.target.closest('.admin-edit-btn');
    if (editBtn) {
      const targetId = editBtn.getAttribute('data-edit-id');
      const proj = myProjects.find(p => p.id === targetId);
      if (proj) {
        document.getElementById('form-project-id').value = proj.id;
        document.getElementById('form-year').value = proj.year;
        document.getElementById('form-icon').value = proj.icon;
        document.getElementById('form-meta').value = proj.meta;
        document.getElementById('form-title').value = proj.title;
        document.getElementById('form-desc').value = proj.desc;
        document.getElementById('form-link').value = proj.link;
        document.getElementById('form-submit-btn').textContent = "⚡ 更新此成就專案";
      }
      return;
    }

    // ③ 偵測後台「刪除」作品
    const deleteBtn = e.target.closest('.admin-delete-btn');
    if (deleteBtn) {
      const targetId = deleteBtn.getAttribute('data-delete-id');
      if (confirm("確定要刪除這項作品成就嗎？(將從本地儲存中抹除)")) {
        myProjects = myProjects.filter(p => p.id !== targetId);
        localStorage.setItem('hank_portfolio_data', JSON.stringify(myProjects));
        renderMinecraftTree();
        renderAdminList();
        applyYearFilter(document.querySelector('.filter-btn-pixel.active').getAttribute('data-filter-target'));
      }
      return;
    }

    // ④ 重設表單按鈕
    if (e.target.id === 'form-cancel-btn') {
      document.getElementById('admin-project-form').reset();
      document.getElementById('form-project-id').value = "";
      document.getElementById('form-submit-btn').textContent = "⚡ 解鎖/更新成就";
      return;
    }

    // ⑤ 通用彈窗 Modal 觸發與關閉偵測
    const trigger = e.target.closest('[data-modal-target]');
    if (trigger) {
      const targetId = trigger.getAttribute('data-modal-target');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.classList.add('modal-open');
        if (targetId === 'illustration-modal') { currentSlideIndex = 0; updateCarouselDisplay(0); }
      }
      return;
    }

    if (e.target.closest('.modal-close-trigger') || e.target.classList.contains('modal-overlay')) {
      const activeModal = e.target.closest('.modal-overlay') || e.target;
      if (activeModal) {
        activeModal.classList.remove('active');
        if (document.querySelectorAll('.modal-overlay.active').length === 0) {
          document.body.classList.remove('modal-open');
        }
      }
      return;
    }

    if (e.target.closest('#illus-next-btn')) { updateCarouselDisplay(currentSlideIndex + 1); return; }
    if (e.target.closest('#illus-prev-btn')) { updateCarouselDisplay(currentSlideIndex - 1); return; }

    const dotElement = e.target.closest('#illustration-modal .carousel-dots .dot');
    if (dotElement) {
      updateCarouselDisplay(parseInt(dotElement.getAttribute('data-slide-index'), 10));
      return;
    }

    // ⑥ 像素年級分類按鈕觸發
    const filterBtn = e.target.closest('.filter-btn-pixel');
    if (filterBtn) {
      document.querySelectorAll('.filter-btn-pixel').forEach(btn => btn.classList.remove('active'));
      filterBtn.classList.add('active');
      applyYearFilter(filterBtn.getAttribute('data-filter-target'));
    }
  });

  // 監聽密碼輸入框按下 Enter 鍵自動提交驗證
  const passInput = document.getElementById('admin-auth-password');
  if (passInput) {
    passInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('admin-auth-submit-btn').click();
      }
    });
  }
});