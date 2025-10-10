// Terminal-style Academic Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the terminal experience
    initializeTerminal();
    
    // Add typing animation for command lines
    addTypingAnimation();
    
    // Add interactive elements
    addInteractiveElements();
    
    // Add smooth scrolling
    addSmoothScrolling();
    
    // Add image loading handling
    handleImageLoading();
});

function initializeTerminal() {
    // Add terminal startup effect
    const terminal = document.querySelector('.terminal');
    terminal.style.opacity = '0';
    terminal.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        terminal.style.transition = 'all 0.8s ease-out';
        terminal.style.opacity = '1';
        terminal.style.transform = 'translateY(0)';
    }, 200);
}

function addTypingAnimation() {
    const commandLines = document.querySelectorAll('.command-line');
    
    commandLines.forEach((line, index) => {
        const command = line.querySelector('.command');
        if (command) {
            const originalText = command.textContent;
            command.textContent = '';
            
            setTimeout(() => {
                typeText(command, originalText, 50);
            }, index * 500 + 1000);
        }
    });
}

function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            // Add cursor blink effect after typing
            element.style.borderRight = '2px solid #3b82f6';
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }, speed);
}

function addInteractiveElements() {
    // Add hover effects for publication items
    const publicationItems = document.querySelectorAll('.publication-item');
    
    publicationItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.2)';
        });
    });
    
    // Add click effects for buttons
    const buttons = document.querySelectorAll('.link-btn, .contact-btn, .skill-tag');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add video click effects (for visual feedback only)
    const videoPlayers = document.querySelectorAll('.video-player');
    
    videoPlayers.forEach(video => {
        // Add click animation for visual feedback
        video.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Ensure video plays when it comes into view
        video.addEventListener('loadeddata', function() {
            this.play().catch(e => {
                console.log('Autoplay prevented:', e);
            });
        });
    });
}

function addSmoothScrolling() {
    // Add smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function handleImageLoading() {
    // Handle profile image loading
    const profileImg = document.getElementById('profile-img');
    const imagePlaceholder = document.querySelector('.image-placeholder');
    
    if (profileImg) {
        profileImg.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease-in';
            setTimeout(() => {
                this.style.opacity = '1';
                if (imagePlaceholder) {
                    imagePlaceholder.style.display = 'none';
                }
            }, 100);
        });
        
        profileImg.addEventListener('error', function() {
            if (imagePlaceholder) {
                imagePlaceholder.style.display = 'flex';
            }
        });
    }
    
    // Handle paper thumbnail loading
    const thumbnails = document.querySelectorAll('.video-thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.3s ease-in';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
        
        thumbnail.addEventListener('error', function() {
            const placeholder = this.parentElement.querySelector('.video-placeholder');
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        });
    });
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .link-btn, .contact-btn, .skill-tag {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus on contact section
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const contactSection = document.querySelector('.contact-content');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Escape to scroll to top
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Add terminal-like console logging
function terminalLog(message, type = 'info') {
    const colors = {
        info: '#3b82f6',
        warning: '#ffbd2e',
        error: '#ff5f56',
        success: '#27ca3f'
    };
    
    console.log(`%c${message}`, `color: ${colors[type]}; font-family: 'JetBrains Mono', monospace; font-weight: bold;`);
}

// Log page load
terminalLog('Academic Website Loaded Successfully', 'success');
terminalLog('Terminal Interface Initialized', 'info');
terminalLog('Interactive Elements Activated', 'success');

// Add performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    terminalLog(`Page loaded in ${Math.round(loadTime)}ms`, 'info');
});

// Add scroll-based animations
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const animatedElements = document.querySelectorAll('.section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addScrollAnimations);
} else {
    addScrollAnimations();
}

// BibTeX Modal Functions
const bibtexData = {
    paper1: `@article{zhong2025humanoidexo,
        title={HumanoidExo: Scalable Whole-Body Humanoid Manipulation via Wearable Exoskeleton},
        author={Rui Zhong and Yizhe Sun and Junjie Wen and Jinming Li and Chuang Cheng and Wei Dai and Zhiwen Zeng and Huimin Lu and Yichen Zhu and Yi Xu},
        journal={arXiv preprint arXiv:2510.03022},
        year={2025}
    }`,
    paper2: `@article{zhong2025nuexo,
      title={NuExo: A Wearable Exoskeleton Covering all Upper Limb ROM for Outdoor Data Collection and Teleoperation of Humanoid Robots}, 
      author={Rui Zhong and Chuang Cheng and Junpeng Xu and Yantong Wei and Ce Guo and Daoxun Zhang and Wei Dai and Huimin Lu},
      journal={arXiv preprint arXiv:2503.10554},
      year={2025},
    }`
};

function showBibtex(paperId) {
    const modal = document.getElementById('bibtexModal');
    const content = document.getElementById('bibtexContent');
    
    if (bibtexData[paperId]) {
        content.textContent = bibtexData[paperId];
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeBibtex() {
    const modal = document.getElementById('bibtexModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function copyBibtex() {
    const content = document.getElementById('bibtexContent');
    const text = content.textContent;
    
    if (navigator.clipboard && window.isSecureContext) {
        // Use modern clipboard API
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess();
        }).catch(err => {
            console.error('Failed to copy: ', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess();
        } else {
            showCopyError();
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showCopyError();
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✅ Copied!';
    copyBtn.style.background = '#27ca3f';
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '#3b82f6';
    }, 2000);
}

function showCopyError() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '❌ Copy Failed';
    copyBtn.style.background = '#ff5f56';
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '#3b82f6';
    }, 2000);
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('bibtexModal');
    if (event.target === modal) {
        closeBibtex();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('bibtexModal');
        if (modal.style.display === 'block') {
            closeBibtex();
        }
    }
});
