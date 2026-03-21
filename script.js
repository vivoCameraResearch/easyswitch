// ===============================
// MultiTalk-style Project Page JS
// ===============================

// 平滑滚动（用于 anchor 跳转更丝滑）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId.length > 1) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });
});


// ===============================
// Video 懒加载（优化加载速度）
// ===============================
const videos = document.querySelectorAll("video");

const videoObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const video = entry.target;

            // 只有当 data-src 存在时才加载
            const source = video.querySelector("source");
            if (source && source.dataset.src) {
                source.src = source.dataset.src;
                video.load();
            }

            observer.unobserve(video);
        }
    });
}, {
    rootMargin: "200px"
});

videos.forEach(video => {
    videoObserver.observe(video);
});


// ===============================
// 视频 hover 自动播放（静音）
// ===============================
videos.forEach(video => {
    video.addEventListener("mouseenter", () => {
        video.muted = true;
        video.play().catch(() => {});
    });

    video.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });
});


// ===============================
// Navbar 滚动阴影效果
// ===============================
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
    } else {
        header.style.boxShadow = "none";
    }
});


// ===============================
// 按钮点击波纹效果（增强交互感）
// ===============================
const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
    btn.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");

        const rect = btn.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;

        btn.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});


// ===============================
// Section 出现时淡入动画
// ===============================
const sections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    section.classList.add("hidden");
    sectionObserver.observe(section);
});


// ===============================
// 控制台彩蛋（论文风格）
// ===============================
console.log("%cMultiTalk Project Page", "font-size:20px;font-weight:bold;");
console.log("%cBuilt with ❤️ for research demo", "color:gray;");
