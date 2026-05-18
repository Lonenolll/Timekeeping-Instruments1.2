/**
 * 时间之器 · 前端基础交互脚本
 * 功能包括：
 * 1. 导航高亮增强
 * 2. 朝代筛选按钮交互
 * 3. 图片 hover 轻微动态
 * 4. 页面滚动淡入动画
 * 5. 时间轴节点激活动画
 * 6. 鼠标移动粒子效果
 *
 * 说明：
 * - 全部使用原生 JavaScript
 * - 不依赖任何前端框架
 * - 尽量基于当前模板已有类名工作
 */

(function () {
  /**
   * DOM 加载完成后统一初始化交互逻辑。
   */
  document.addEventListener("DOMContentLoaded", function () {
    enhanceActiveNavigation();
    setupHeaderCompression();
    setupThemeSwitcher();
    setupTimelineHashScroll();
    bindDynastyFilters();
    bindImageHoverEffects();
    bindTimelineCardClicks();
    bindFeaturedToolCardClicks();
    setupRevealAnimations();
    setupTimelineAnimations();
    setupSundialClock();
    bindHeroGridHoverEffects();
    setupMouseParticles();
  });

  /**
   * 日/夜模式切换
   * 仅控制前端视觉样式，不影响现有功能
   */
  function setupThemeSwitcher() {
    var themeToggle = document.querySelector('.theme-toggle');
    var body = document.body;
    if (!themeToggle) {
      return;
    }

    function refreshIcon(isDay) {
      themeToggle.classList.toggle('theme-toggle--day', isDay);
      themeToggle.classList.toggle('theme-toggle--night', !isDay);
    }

    var savedTheme = window.localStorage.getItem('siteTheme');
    var isDayMode = savedTheme === 'day';
    if (isDayMode) {
      body.classList.add('theme-day');
    }
    refreshIcon(isDayMode);

    themeToggle.addEventListener('click', function () {
      isDayMode = !body.classList.contains('theme-day');
      body.classList.toggle('theme-day', isDayMode);
      window.localStorage.setItem('siteTheme', isDayMode ? 'day' : 'night');
      refreshIcon(isDayMode);
    });
  }

  /**
   * 为时间轴器物卡片添加整卡点击交互
   * 目的：点击卡片任意位置均可跳转，避免仅小文字可点击的问题
   */
  function bindTimelineCardClicks() {
    var cards = document.querySelectorAll('.timeline-card');

    cards.forEach(function (card) {
      card.addEventListener('click', function (event) {
        var link = card.querySelector('.timeline-card__link');
        if (!link || !link.href) {
          return;
        }

        if (event.target.closest('a')) {
          return;
        }

        window.location.href = link.href;
      });
    });
  }

  function bindFeaturedToolCardClicks() {
    var cards = document.querySelectorAll('.feature-card');

    cards.forEach(function (card) {
      card.addEventListener('click', function (event) {
        if (event.target.closest('a')) {
          return;
        }

        var href = card.dataset.href;
        if (!href) {
          var link = card.querySelector('a[href^="/tools/"]');
          href = link ? link.href : '';
        }

        if (!href) {
          return;
        }

        window.location.href = href;
      });
    });
  }

  /**
   * 导航高亮增强
   * 目的：
   * 1. 与服务端 currentPath 高亮形成双保险
   * 2. 当路径变化或页面结构扩展时，保持前端高亮状态稳定
   */
  function enhanceActiveNavigation() {
    var currentPath = window.location.pathname;
    var navLinks = document.querySelectorAll(".site-nav__link");

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href) {
        return;
      }

      var isActive = href === currentPath;
      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  /**
   * Header 滚动缩窄
   * 目的：
   * 1. 保留首屏进入时的仪式感
   * 2. 用户下滑后收起辅助文案，减弱 Header 占据感
   */
  function setupHeaderCompression() {
    var header = document.querySelector("[data-site-header]");

    if (!header) {
      return;
    }

    function syncHeaderState() {
      var shouldCompact = window.scrollY > 48;
      header.classList.toggle("site-header--compact", shouldCompact);
    }

    syncHeaderState();
    window.addEventListener("scroll", syncHeaderState, { passive: true });
  }

  /**
   * 时间轴页锚点定位
   * 首页「朝代索引」使用 /timeline#era-… 链入时，在首屏渲染后滚动到对应朝代区块。
   */
  function setupTimelineHashScroll() {
    if (window.location.pathname.replace(/\/$/, "") !== "/timeline") {
      return;
    }

    function scrollToHash() {
      var raw = window.location.hash || "";
      if (!raw || raw.length < 2) {
        return;
      }

      var id = raw.slice(1);
      if (!/^era-[a-z0-9-]+$/.test(id)) {
        return;
      }

      var target = document.getElementById(id);
      if (!target) {
        return;
      }

      window.requestAnimationFrame(function () {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
  }

  /**
   * 朝代筛选按钮交互
   * 目的：
   * 1. 点击时立即给予视觉反馈
   * 2. 用于时间轴页和首页朝代入口的轻量交互增强
   */
  function bindDynastyFilters() {
    var filterLinks = document.querySelectorAll(".dynasty-nav__link, .timeline-filter__link");

    filterLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        filterLinks.forEach(function (item) {
          item.classList.remove("is-active");
        });

        link.classList.add("is-active");
      });
    });
  }

  /**
   * 图片 hover 效果
   * 目的：
   * 1. 在鼠标悬停时根据进入位置制造轻微“浮动”感
   * 2. 让图像资源、卡片图、时间轴封面图更有动态层次
   */
  function bindImageHoverEffects() {
    var interactiveCards = document.querySelectorAll(
      ".feature-card__image-wrap, .timeline-card__image-wrap, .tool-detail-page__hero-image-wrap"
    );

    interactiveCards.forEach(function (card) {
      card.addEventListener("mousemove", function (event) {
        var rect = card.getBoundingClientRect();
        var offsetX = event.clientX - rect.left;
        var offsetY = event.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;

        var rotateY = ((offsetX - centerX) / centerX) * 4;
        var rotateX = ((centerY - offsetY) / centerY) * 4;

        card.style.transform =
          "perspective(900px) rotateX(" +
          rotateX.toFixed(2) +
          "deg) rotateY(" +
          rotateY.toFixed(2) +
          "deg) translateY(-2px)";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  /**
   * 页面滚动淡入动画
   * 目的：
   * 1. 页面模块进入视口时平滑显现
   * 2. 保持整体节奏感，不做过重动画
   */
  function setupRevealAnimations() {
    var revealTargets = document.querySelectorAll(
      ".home-section, .feature-card, .list-item, .timeline-era, .tool-detail-section, .media-filter, .notice-panel, .timeline-entry__panel"
    );

    if (!revealTargets.length) {
      return;
    }

    revealTargets.forEach(function (element) {
      element.style.opacity = "0";
      element.style.transform = "translateY(24px)";
      element.style.transition = "opacity 700ms ease, transform 700ms ease";
    });

    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealTargets.forEach(function (element) {
      revealObserver.observe(element);
    });
  }

  /**
   * 时间轴节点动画
   * 目的：
   * 1. 当某个朝代区块进入视口时，高亮其节点
   * 2. 强化“沿时间流动”的浏览体验
   */
  function setupTimelineAnimations() {
    var timelineEras = document.querySelectorAll(".timeline-era");

    if (!timelineEras.length) {
      return;
    }

    var timelineObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var dot = entry.target.querySelector(".timeline-era__dot");
          var title = entry.target.querySelector(".timeline-era__title");

          if (!dot || !title) {
            return;
          }

          if (entry.isIntersecting) {
            dot.style.transform = "scale(1.25)";
            dot.style.boxShadow =
              "0 0 0 8px rgba(166, 58, 50, 0.16), 0 0 26px rgba(201, 167, 96, 0.28)";
            title.style.textShadow = "0 0 18px rgba(92, 132, 201, 0.28)";
          } else {
            dot.style.transform = "";
            dot.style.boxShadow = "";
            title.style.textShadow = "";
          }
        });
      },
      {
        threshold: 0.35
      }
    );

    timelineEras.forEach(function (era) {
      var dot = era.querySelector(".timeline-era__dot");
      var title = era.querySelector(".timeline-era__title");

      if (dot) {
        dot.style.transition = "transform 260ms ease, box-shadow 260ms ease";
      }

      if (title) {
        title.style.transition = "text-shadow 260ms ease";
      }

      timelineObserver.observe(era);
    });
  }

  /**
   * 首页动态日晷
   * 目的：
   * 1. 根据当前本地时间更新晷针阴影角度
   * 2. 在首页首屏提供更明确的“时间之器”主题视觉
   *
   * 说明：
   * - 这里做的是面向展示的拟物化模拟
   * - 角度按 12 小时制近似换算，不追求严格天文精度
   */
  function setupSundialClock() {
    var shadow = document.querySelector("[data-sundial-shadow]");
    var label = document.querySelector("[data-sundial-time]");

    if (!shadow || !label) {
      return;
    }

    function formatChineseHour(hours) {
      var names = [
        "子时",
        "丑时",
        "寅时",
        "卯时",
        "辰时",
        "巳时",
        "午时",
        "未时",
        "申时",
        "酉时",
        "戌时",
        "亥时"
      ];
      var index = Math.floor(((hours + 1) % 24) / 2);
      return names[index];
    }

    function updateSundial() {
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      var seconds = now.getSeconds();

      var decimalHour = hours + minutes / 60 + seconds / 3600;
      var dialHour = decimalHour % 12;

      // 以 12 点方向为起始，将时间映射到圆盘角度。
      var angle = dialHour * 30 - 90;
      var shadowLength = 24 + Math.abs(6 - dialHour) * 2.2;

      shadow.style.transform =
        "translateY(-50%) rotate(" + angle.toFixed(2) + "deg) scaleX(" + shadowLength.toFixed(2) / 24 + ")";

      var timeText =
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

      label.textContent = "当前时间 " + timeText + " · " + formatChineseHour(hours);
    }

    updateSundial();
    window.setInterval(updateSundial, 1000);
  }

  /**
   * 在“时之脉”和“器之格”页首加入经纬网格互动光效
   * 目的：
   * 1. 让板块背景下的网格更具动态感
   * 2. 鼠标移动到哪里，哪里网格就轻微发光
   */
  function bindHeroGridHoverEffects() {
    var heroPanels = document.querySelectorAll('.timeline-page__hero, .qizhige-page__hero');

    if (!heroPanels.length) {
      return;
    }

    heroPanels.forEach(function (hero) {
      hero.style.setProperty('--grid-highlight-opacity', '0');

      hero.addEventListener('mousemove', function (event) {
        var rect = hero.getBoundingClientRect();
        var x = ((event.clientX - rect.left) / rect.width) * 100;
        var y = ((event.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty('--grid-highlight-x', x + '%');
        hero.style.setProperty('--grid-highlight-y', y + '%');
        hero.style.setProperty('--grid-highlight-opacity', '1');
      });

      hero.addEventListener('mouseleave', function () {
        hero.style.setProperty('--grid-highlight-opacity', '0');
      });
    });
  }

  /**
   * 鼠标移动粒子效果
   * 目的：
   * 1. 在光标附近生成轻量粒子尾迹
   * 2. 提升“数字沉浸感”，但不影响阅读与性能
   */
  function setupMouseParticles() {
    // 触屏设备或用户偏好减少动画时，跳过粒子效果。
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    var particleLayer = document.createElement("div");
    particleLayer.className = "mouse-particle-layer";
    particleLayer.style.position = "fixed";
    particleLayer.style.inset = "0";
    particleLayer.style.pointerEvents = "none";
    particleLayer.style.overflow = "hidden";
    particleLayer.style.zIndex = "5";

    document.body.appendChild(particleLayer);

    var lastSpawnTime = 0;
    var spawnInterval = 22;

    document.addEventListener("mousemove", function (event) {
      var now = Date.now();
      if (now - lastSpawnTime < spawnInterval) {
        return;
      }

      lastSpawnTime = now;
      createParticle(particleLayer, event.clientX, event.clientY);
    });
  }

  /**
   * 创建单个粒子节点，并在动画结束后自动移除。
   */
  function createParticle(layer, x, y) {
    var particle = document.createElement("span");
    var size = randomBetween(4, 10);
    var driftX = randomBetween(-22, 22);
    var driftY = randomBetween(-28, -8);
    var duration = randomBetween(650, 1200);
    var hueType = Math.random();

    particle.className = "mouse-particle";
    particle.style.position = "absolute";
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.borderRadius = "999px";
    particle.style.pointerEvents = "none";
    particle.style.opacity = "0.9";
    particle.style.transform = "translate(-50%, -50%)";
    particle.style.filter = "blur(0.3px)";
    particle.style.background =
      hueType > 0.72
        ? "radial-gradient(circle, rgba(201,167,96,0.92), rgba(201,167,96,0.08))"
        : hueType > 0.38
        ? "radial-gradient(circle, rgba(92,132,201,0.92), rgba(92,132,201,0.08))"
        : "radial-gradient(circle, rgba(166,58,50,0.78), rgba(166,58,50,0.06))";

    layer.appendChild(particle);

    particle.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(1)",
          opacity: 0.9
        },
        {
          transform:
            "translate(calc(-50% + " +
            driftX +
            "px), calc(-50% + " +
            driftY +
            "px)) scale(0.2)",
          opacity: 0
        }
      ],
      {
        duration: duration,
        easing: "ease-out",
        fill: "forwards"
      }
    );

    window.setTimeout(function () {
      particle.remove();
    }, duration + 80);
  }

  /**
   * 生成指定区间的随机数。
   */
  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
})();
