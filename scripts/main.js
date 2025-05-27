/**
 * Profile Page Interactive Scripts
 * 个人资料页面交互脚本
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initProgressBarAnimations();
    initAvatarInteraction();
    initSkillCardHoverEffects();
});

/**
 * 初始化进度条动画
 * 使用Intersection Observer API监听滚动，为进度条添加动画效果
 */
function initProgressBarAnimations() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-fill');
                progressBars.forEach(bar => {
                    bar.style.animation = 'fillProgress 2s ease-in-out';
                });
            }
        });
    }, observerOptions);

    // 观察所有技能卡片
    document.querySelectorAll('.skill-category').forEach(card => {
        observer.observe(card);
    });
}

/**
 * 初始化头像交互效果
 * 添加点击头像的旋转缩放动画
 */
function initAvatarInteraction() {
    const avatar = document.querySelector('.avatar');
    
    if (avatar) {
        avatar.addEventListener('click', function() {
            // 添加动画效果
            this.style.transform = 'scale(1.1) rotate(360deg)';
            this.style.transition = 'transform 0.6s ease-in-out';
            
            // 动画结束后恢复原状
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 600);
        });

        // 可选：添加鼠标悬停效果
        avatar.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    }
}

/**
 * 初始化技能卡片悬停效果
 * 为技能卡片添加左边框高亮效果
 */
function initSkillCardHoverEffects() {
    document.querySelectorAll('.skill-category').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeft = '4px solid #667eea';
            this.style.transition = 'border-left 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeft = 'none';
        });
    });
}

/**
 * 可选：添加平滑滚动效果（如果页面有导航链接）
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 可选：添加键盘导航支持
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // 按空格键点击头像
        if (e.code === 'Space' && document.activeElement.classList.contains('avatar')) {
            e.preventDefault();
            document.activeElement.click();
        }
    });
}

/**
 * 工具函数：节流函数，用于优化性能
 */
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}