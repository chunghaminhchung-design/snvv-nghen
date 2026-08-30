// ===== BONG BÓNG =====
const bubbleLayer = document.getElementById('bubbleLayer');
let floatingTimer = null;

function isSmallScreen() {
    return window.innerWidth < 500;
}

function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = 20 + Math.random() * 45;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.animationDuration = 12 + Math.random() * 18 + 's';
    bubble.style.animationDelay = Math.random() * 5 + 's';
    bubble.style.opacity = 0.3 + Math.random() * 0.4;
    bubbleLayer.appendChild(bubble);
    setTimeout(() => bubble.remove(), 28000);
}

function startFloating() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    floatingTimer = setInterval(createBubble, isSmallScreen() ? 2800 : 1200);
}

function stopFloating() {
    clearInterval(floatingTimer);
    floatingTimer = null;
    bubbleLayer.innerHTML = '';
}

startFloating();

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopFloating();
    } else {
        startFloating();
    }
});

// ===== MẬT KHẨU =====
const PASSWORD = '492006';
const display = document.getElementById('display');
const errorMsg = document.getElementById('errorMsg');
let input = '';

// Các trang
const loginPage = document.getElementById('loginPage');
const letterPage = document.getElementById('letterPage');

function handleKey(val) {
    if (val === 'clear') {
        input = input.slice(0, -1);
    } else if (val === 'enter') {
        if (input === PASSWORD) {
            // Đúng mật khẩu
            loginPage.classList.add('hidden');
            letterPage.classList.remove('hidden');
            errorMsg.classList.add('hidden');
            input = '';
            display.textContent = '❤️';
            // Bắn pháo hoa mừng
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const x = 100 + Math.random() * (W - 200);
                    const y = 100 + Math.random() * (H - 200);
                    createExplosion(x, y);
                }, i * 120);
            }
        } else {
            // Sai mật khẩu
            errorMsg.classList.remove('hidden');
            input = '';
            display.textContent = '❤️';
            setTimeout(() => errorMsg.classList.add('hidden'), 2000);
        }
        return;
    } else {
        if (input.length < 6) {
            input += val;
        }
    }
    display.textContent = input.length > 0 ? input : '❤️';
}

// Gán sự kiện cho các phím
document.querySelectorAll('.key').forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.dataset.value;
        handleKey(val);
    });
});

// ===== LÁ THƯ =====
document.querySelectorAll('.letter-card').forEach(card => {
    card.addEventListener('click', () => {
        const content = card.querySelector('.letter-content');
        const isHidden = content.classList.contains('hidden');

        // Ẩn tất cả nội dung khác
        document.querySelectorAll('.letter-content').forEach(c => c.classList.add('hidden'));

        if (isHidden) {
            content.classList.remove('hidden');
            // Pháo hoa nhỏ khi mở thư
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const x = 100 + Math.random() * (W - 200);
                    const y = 100 + Math.random() * (H - 200);
                    createExplosion(x, y);
                }, i * 80);
            }
        }
    });
});

// ===== PHÁO HOA =====
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

let W, H;
function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * 2 * Math.PI;
        const speed = 2 + Math.random() * 5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 1;
        this.life = 1;
        this.decay = 0.01 + Math.random() * 0.02;
        this.size = 3 + Math.random() * 4;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05;
        this.life -= this.decay;
        this.size *= 0.995;
    }

    draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

let particles = [];

function createExplosion(x, y) {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#ff9f43', '#00d2d3', '#ff4757'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 70; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, W, H);
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.life <= 0 || p.size < 0.3) {
            particles.splice(i, 1);
        }
    }
    requestAnimationFrame(animateFireworks);
}
animateFireworks();

// ===== NÚT PHÁO HOA =====
document.getElementById('fireworksBtn').addEventListener('click', () => {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const x = 100 + Math.random() * (W - 200);
            const y = 100 + Math.random() * (H - 200);
            createExplosion(x, y);
        }, i * 100);
    }
});

// ===== THÊM: Nhấn phím vật lý trên bàn phím =====
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key >= '0' && key <= '9') {
        handleKey(key);
    } else if (key === 'Backspace') {
        handleKey('clear');
    } else if (key === 'Enter') {
        handleKey('enter');
    }
});