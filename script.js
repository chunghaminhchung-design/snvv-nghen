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

// ===== COUNTDOWN - CHỜ ĐẾN NGÀY 4/9/2026 =====
const targetDate = new Date(2026, 8, 4, 0, 0, 0); // 4/9/2026
const TARGET_DATE = targetDate.getTime();

const countdownPage = document.getElementById('countdownPage');
const quizPage = document.getElementById('quizPage');
const loginPage = document.getElementById('loginPage');
const letterPage = document.getElementById('letterPage');
const transferPage = document.getElementById('transferPage');
const jumpscareOverlay = document.getElementById('jumpscareOverlay');

const daysEl = document.getElementById('countdownDays');
const hoursEl = document.getElementById('countdownHours');
const minutesEl = document.getElementById('countdownMinutes');
const secondsEl = document.getElementById('countdownSeconds');
const daysLeftEl = document.getElementById('daysLeft');
const countdownMessage = document.getElementById('countdownMessage');

function updateCountdown() {
    const now = new Date().getTime();
    const diff = TARGET_DATE - now;

    if (diff <= 0) {
        // Đã đến ngày 4/9 -> chuyển sang quiz
        countdownPage.classList.add('hidden');
        quizPage.classList.remove('hidden');
        startQuiz();
        startBirthdayEffect();
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
    daysLeftEl.textContent = days;

    if (days === 0 && hours < 24) {
        countdownMessage.innerHTML = '🎉 Hôm nay là ngày 4/9 rồi! Sắp mở được quà rồi! 💝';
    } else if (days <= 3) {
        countdownMessage.innerHTML = `💖 Còn ${days} ngày nữa thôi! Chị chuẩn bị tinh thần nhé! 🎂`;
    } else if (days <= 7) {
        countdownMessage.innerHTML = `🌸 Chỉ còn ${days} ngày nữa là đến sinh nhật chị! Hồi hộp quá!`;
    } else {
        countdownMessage.innerHTML = '💝 Hãy chờ đến ngày 4/9 nhé! Món quà đang chờ chị! 🎁';
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== QUIZ 5 CÂU =====
// SỬA NỘI DUNG CÂU HỎI + ĐÁP ÁN Ở ĐÂY.
// "correct" là số thứ tự đáp án đúng: 0 = A, 1 = B, 2 = C, 3 = D
const quizQuestions = [
    {
        question: 'Câu 1: (Sửa câu hỏi ở đây)',
        answers: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
        correct: 0
    },
    {
        question: 'Câu 2: (Sửa câu hỏi ở đây)',
        answers: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
        correct: 0
    },
    {
        question: 'Câu 3: (Sửa câu hỏi ở đây)',
        answers: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
        correct: 0
    },
    {
        question: 'Câu 4: (Sửa câu hỏi ở đây)',
        answers: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
        correct: 0
    }
];

const quizCounter = document.getElementById('quizCounter');
const quizQuestionBox = document.getElementById('quizQuestionBox');
const quizQuestionText = document.getElementById('quizQuestionText');
const quizAnswers = document.getElementById('quizAnswers');
const quizFeedback = document.getElementById('quizFeedback');
const quizQ5Box = document.getElementById('quizQ5Box');
const btnKhong = document.getElementById('btnKhong');
const btnCoReal = document.getElementById('btnCoReal');
const q5Overlay = document.getElementById('q5Overlay');

let currentQ = 0;
let khongClicks = 0;

function renderQuestion() {
    const q = quizQuestions[currentQ];
    quizCounter.textContent = `Câu ${currentQ + 1} / 5`;
    quizQuestionText.textContent = q.question;

    const btns = quizAnswers.querySelectorAll('.quiz-answer-btn');
    btns.forEach((btn, i) => {
        btn.querySelector('.ans-text').textContent = q.answers[i];
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });
    quizFeedback.classList.add('hidden');
}

function selectAnswer(index) {
    const q = quizQuestions[currentQ];
    const btns = quizAnswers.querySelectorAll('.quiz-answer-btn');
    btns.forEach(b => b.disabled = true);

    if (index === q.correct) {
        btns[index].classList.add('correct');
        quizFeedback.textContent = '✅ Chính xác!';
    } else {
        btns[index].classList.add('wrong');
        btns[q.correct].classList.add('correct');
        quizFeedback.textContent = '❌ Chưa đúng, đáp án đúng là ' + ['A', 'B', 'C', 'D'][q.correct];
    }
    quizFeedback.classList.remove('hidden');

    setTimeout(() => {
        currentQ++;
        if (currentQ < quizQuestions.length) {
            renderQuestion();
        } else {
            // Chuyển sang câu 5 đặc biệt
            quizQuestionBox.classList.add('hidden');
            quizCounter.textContent = 'Câu 5 / 5';
            quizQ5Box.classList.remove('hidden');
        }
    }, 1400);
}

quizAnswers.querySelectorAll('.quiz-answer-btn').forEach((btn, i) => {
    btn.addEventListener('click', () => selectAnswer(i));
});

function growCoOverlay() {
    khongClicks++;
    const scale = 1 + khongClicks * 0.55;
    q5Overlay.style.transform = `translate(-50%, -50%) scale(${scale})`;
    q5Overlay.style.opacity = Math.min(1, 0.35 + khongClicks * 0.15);
    if (khongClicks >= 5) {
        q5Overlay.classList.add('cover-full');
    }
}

btnKhong.addEventListener('click', growCoOverlay);
btnCoReal.addEventListener('click', goToTransfer);
q5Overlay.addEventListener('click', goToTransfer);

function goToTransfer() {
    quizPage.classList.add('hidden');
    transferPage.classList.remove('hidden');
}

function startQuiz() {
    currentQ = 0;
    khongClicks = 0;
    q5Overlay.style.transform = 'translate(-50%, -50%) scale(1)';
    q5Overlay.style.opacity = 0.35;
    q5Overlay.classList.remove('cover-full');
    quizQ5Box.classList.add('hidden');
    quizQuestionBox.classList.remove('hidden');
    renderQuestion();
}

// ===== FORM CHUYỂN KHOẢN GIẢ (TROLL) =====
const transferSubmitBtn = document.getElementById('transferSubmitBtn');

transferSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    transferPage.classList.add('hidden');
    jumpscareOverlay.classList.remove('hidden');
    jumpscareOverlay.classList.add('shake');

    setTimeout(() => {
        jumpscareOverlay.classList.add('hidden');
        jumpscareOverlay.classList.remove('shake');
        loginPage.classList.remove('hidden');
    }, 2200);
});

// ===== MẬT KHẨU =====
const PASSWORD = '492006';
const display = document.getElementById('display');
const errorMsg = document.getElementById('errorMsg');
let input = '';

function handleKey(val) {
    if (val === 'clear') {
        input = input.slice(0, -1);
    } else if (val === 'enter') {
        if (input === PASSWORD) {
            loginPage.classList.add('hidden');
            letterPage.classList.remove('hidden');
            errorMsg.classList.add('hidden');
            input = '';
            display.textContent = '❤️';
        } else {
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

document.querySelectorAll('.key').forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.dataset.value;
        handleKey(val);
    });
});

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

// ===== LÁ THƯ - TỰ ĐỘNG CHUYỂN =====
const letters = [
    {
        emoji: '💖',
        content: 'Chị à, em chúc chị luôn vui vẻ và hạnh phúc! Chị xứng đáng với những điều tốt đẹp nhất trên đời này. 🌸'
    },
    {
        emoji: '🌟',
        content: 'Cảm ơn chị vì luôn bên em, chăm sóc và yêu thương em. Em may mắn khi có chị trong cuộc đời! 🥰'
    },
    {
        emoji: '🌈',
        content: 'Chúc chị năm mới tuổi mới thật nhiều niềm vui, sức khỏe và thành công trong mọi dự định! 🎊'
    },
    {
        emoji: '🌺',
        content: 'Chị luôn là nguồn cảm hứng và là hình mẫu của em. Em yêu chị rất nhiều! Mong chị luôn xinh đẹp và rạng rỡ! ✨'
    },
    {
        emoji: '🎁',
        content: 'Tuổi mới, chị hãy sống thật vui và thật ý nghĩa nhé! Em luôn ủng hộ và yêu thương chị! 💕'
    }
];

let currentLetter = 0;
let autoSlideTimer = null;
const letterEmoji = document.getElementById('letterEmoji');
const letterContent = document.getElementById('letterContent');
const letterCounter = document.getElementById('letterCounter');
const pageDot = document.getElementById('pageDot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateLetter(index) {
    const letter = letters[index];
    letterEmoji.textContent = letter.emoji;
    letterContent.textContent = letter.content;
    letterCounter.textContent = `Lá thư ${index + 1} / ${letters.length}`;

    let dots = '';
    for (let i = 0; i < letters.length; i++) {
        dots += i === index ? '●' : '○';
    }
    pageDot.textContent = dots;

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === letters.length - 1;

    const display = document.getElementById('letterDisplay');
    display.style.animation = 'none';
    requestAnimationFrame(() => {
        display.style.animation = 'fadeSlide 0.4s ease';
    });
}

function nextLetter() {
    if (currentLetter < letters.length - 1) {
        currentLetter++;
        updateLetter(currentLetter);
    } else {
        currentLetter = 0;
        updateLetter(currentLetter);
    }
}

function startAutoSlide() {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
    }
    autoSlideTimer = setInterval(nextLetter, 4000);
}

function stopAutoSlide() {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
    }
}

prevBtn.addEventListener('click', () => {
    if (currentLetter > 0) {
        currentLetter--;
        updateLetter(currentLetter);
        stopAutoSlide();
        setTimeout(startAutoSlide, 5000);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentLetter < letters.length - 1) {
        currentLetter++;
        updateLetter(currentLetter);
        stopAutoSlide();
        setTimeout(startAutoSlide, 5000);
    }
});

document.getElementById('letterDisplay').addEventListener('mouseenter', () => {
    stopAutoSlide();
});

document.getElementById('letterDisplay').addEventListener('mouseleave', () => {
    if (!letterPage.classList.contains('hidden')) {
        startAutoSlide();
    }
});

let paused = false;
document.addEventListener('touchstart', (e) => {
    if (letterPage.classList.contains('hidden')) return;
    if (!paused) {
        stopAutoSlide();
        paused = true;
    } else {
        startAutoSlide();
        paused = false;
    }
});

// ===== HIỆU ỨNG PHONG BÌ MỞ THƯ + TRÁI TIM BAY =====
const envelopeIntro = document.getElementById('envelopeIntro');
const letterMain = document.getElementById('letterMain');
const letterHeartsLayer = document.getElementById('letterHeartsLayer');
let heartsTimer = null;

function spawnFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    const emojis = ['💖', '💕', '💗', '✨', '🌸', '💌'];
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
    heart.style.animationDuration = (6 + Math.random() * 6) + 's';
    heart.style.fontSize = (14 + Math.random() * 14) + 'px';
    letterHeartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 13000);
}

function startLetterHearts() {
    if (heartsTimer) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    heartsTimer = setInterval(spawnFloatingHeart, 500);
}

function playEnvelopeIntro() {
    envelopeIntro.classList.remove('hidden');
    letterMain.classList.add('hidden');
    startLetterHearts();

    setTimeout(() => {
        envelopeIntro.classList.add('hidden');
        letterMain.classList.remove('hidden');
        currentLetter = 0;
        updateLetter(0);
        startAutoSlide();
    }, 2400);
}

const observer = new MutationObserver(() => {
    if (!letterPage.classList.contains('hidden')) {
        playEnvelopeIntro();
    }
});
observer.observe(letterPage, { attributes: true, attributeFilter: ['class'] });

if (!letterPage.classList.contains('hidden')) {
    playEnvelopeIntro();
}

// ===== BÁNH SINH NHẬT + HOA RƠI TỰ ĐỘNG =====
const canvas = document.getElementById('birthdayCanvas');
const ctx = canvas.getContext('2d');

let W, H;
function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Flower {
    constructor() {
        this.reset();
        this.y = Math.random() * -H;
    }

    reset() {
        this.x = Math.random() * W;
        this.y = -20;
        this.size = 15 + Math.random() * 25;
        this.speed = 0.8 + Math.random() * 1.5;
        this.swing = 0.3 + Math.random() * 0.6;
        this.swingSpeed = 0.02 + Math.random() * 0.03;
        this.phase = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = 0.01 + Math.random() * 0.03;
        this.opacity = 0.6 + Math.random() * 0.4;
        this.petalColor = this.randomColor();
        this.centerColor = '#ffd93d';
        this.type = Math.floor(Math.random() * 3);
    }

    randomColor() {
        const colors = [
            '#ff6b6b', '#ff9ff3', '#feca57', '#ff9f43',
            '#ff4757', '#ff6348', '#ff7f50', '#ff6b81',
            '#ffcccc', '#ffb8b8', '#ffd93d', '#ffda79'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        const s = this.size;

        if (this.type === 0) {
            for (let i = 0; i < 5; i++) {
                const angle = (i / 5) * Math.PI * 2;
                ctx.save();
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.ellipse(0, -s * 0.6, s * 0.4, s * 0.7, 0, 0, Math.PI * 2);
                ctx.fillStyle = this.petalColor;
                ctx.fill();
                ctx.restore();
            }
        } else if (this.type === 1) {
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                ctx.save();
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.ellipse(0, -s * 0.55, s * 0.35, s * 0.65, 0, 0, Math.PI * 2);
                ctx.fillStyle = this.petalColor;
                ctx.fill();
                ctx.restore();
            }
        } else {
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                ctx.save();
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.ellipse(0, -s * 0.5, s * 0.3, s * 0.6, 0, 0, Math.PI * 2);
                ctx.fillStyle = this.petalColor;
                ctx.fill();
                ctx.restore();
            }
        }

        ctx.beginPath();
        ctx.arc(0, 0, s * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = this.centerColor;
        ctx.fill();

        ctx.restore();
    }

    update() {
        this.y += this.speed;
        this.x += Math.sin(this.phase) * this.swing;
        this.phase += this.swingSpeed;
        this.rotation += this.rotSpeed;

        if (this.y > H + 50) {
            this.reset();
        }
    }
}

class BirthdayCake {
    constructor() {
        this.x = W / 2;
        this.y = H / 2 + 60;
        this.scale = Math.min(W, H) / 500;
        this.layers = 3;
        this.decorations = [];
        this.candles = [];

        for (let i = 0; i < 7; i++) {
            this.candles.push({
                x: (i - 3) * 22 * this.scale,
                y: 0,
                height: 40 * this.scale + Math.random() * 10 * this.scale,
                width: 8 * this.scale,
                color: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#ff9f43', '#00d2d3'][i % 7],
                flame: {
                    size: 12 * this.scale + Math.random() * 4 * this.scale,
                    flicker: Math.random() * 0.5
                }
            });
        }

        for (let i = 0; i < 30; i++) {
            this.decorations.push({
                x: (Math.random() - 0.5) * 200 * this.scale,
                y: Math.random() * 60 * this.scale - 30 * this.scale,
                size: 4 * this.scale + Math.random() * 6 * this.scale,
                color: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#ff9f43', '#00d2d3'][Math.floor(Math.random() * 7)]
            });
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scale, this.scale);

        const gradient = ctx.createRadialGradient(0, -30, 10, 0, -30, 180);
        gradient.addColorStop(0, 'rgba(255, 215, 0, 0.08)');
        gradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.04)');
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, -30, 180, 0, Math.PI * 2);
        ctx.fill();

        const layerColors = ['#f8c8d8', '#f5b8c8', '#f2a8b8'];
        const layerHeights = [50, 45, 40];
        const layerWidths = [180, 160, 140];

        for (let i = 0; i < this.layers; i++) {
            const yOffset = -i * 40;
            const w = layerWidths[i];
            const h = layerHeights[i];

            ctx.shadowColor = 'rgba(0,0,0,0.1)';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetY = 5;

            const grad = ctx.createLinearGradient(-w/2, yOffset - h/2, w/2, yOffset + h/2);
            grad.addColorStop(0, layerColors[i]);
            grad.addColorStop(0.5, '#fff0f5');
            grad.addColorStop(1, layerColors[i]);

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(-w/2, yOffset - h/2, w, h, 12);
            ctx.fill();

            ctx.shadowBlur = 0;
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(-w/2, yOffset - h/2, w, h, 12);
            ctx.stroke();

            if (i < this.layers - 1) {
                for (let j = 0; j < 12; j++) {
                    const dotX = -w/2 + 20 + j * ((w - 40) / 11);
                    ctx.beginPath();
                    ctx.arc(dotX, yOffset - h/2, 6, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255,255,255,0.6)';
                    ctx.fill();
                }
            }
        }

        this.decorations.forEach(dec => {
            ctx.shadowBlur = 0;
            ctx.fillStyle = dec.color;
            ctx.beginPath();
            ctx.arc(dec.x, -this.layers * 40 + 30 + dec.y, dec.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        const candleY = -this.layers * 40 + 20;
        this.candles.forEach((candle, idx) => {
            const x = candle.x;

            ctx.shadowColor = 'rgba(0,0,0,0.15)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetY = 3;

            ctx.fillStyle = candle.color;
            ctx.beginPath();
            ctx.roundRect(x - candle.width/2, candleY - candle.height, candle.width, candle.height, 3);
            ctx.fill();

            ctx.shadowBlur = 0;
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.lineWidth = 1;
            for (let s = 0; s < 3; s++) {
                const sy = candleY - candle.height + 8 + s * 12;
                ctx.beginPath();
                ctx.moveTo(x - candle.width/2 + 2, sy);
                ctx.lineTo(x + candle.width/2 - 2, sy);
                ctx.stroke();
            }

            const flameSize = candle.flame.size * (0.8 + Math.sin(Date.now() / 150 + idx) * 0.2);
            const flickerX = Math.sin(Date.now() / 100 + idx * 2) * 2;

            ctx.shadowColor = 'rgba(255, 200, 50, 0.3)';
            ctx.shadowBlur = 30;

            const grad2 = ctx.createRadialGradient(
                x + flickerX, candleY - candle.height - flameSize * 0.3, 0,
                x + flickerX, candleY - candle.height - flameSize * 0.3, flameSize * 0.8
            );
            grad2.addColorStop(0, 'rgba(255, 255, 200, 0.9)');
            grad2.addColorStop(0.3, 'rgba(255, 200, 50, 0.8)');
            grad2.addColorStop(0.7, 'rgba(255, 150, 0, 0.6)');
            grad2.addColorStop(1, 'rgba(255, 100, 0, 0)');

            ctx.fillStyle = grad2;
            ctx.beginPath();
            ctx.ellipse(x + flickerX, candleY - candle.height - flameSize * 0.3, flameSize * 0.6, flameSize, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.shadowBlur = 20;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.beginPath();
            ctx.ellipse(x + flickerX * 0.5, candleY - candle.height - flameSize * 0.4, flameSize * 0.2, flameSize * 0.4, 0, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();
    }
}

let flowers = [];
let cake = null;
let effectStarted = false;

function startBirthdayEffect() {
    if (effectStarted) return;
    effectStarted = true;

    for (let i = 0; i < (isSmallScreen() ? 25 : 40); i++) {
        const flower = new Flower();
        flower.y = Math.random() * H;
        flowers.push(flower);
    }

    cake = new BirthdayCake();
    animate();
}

function animate() {
    ctx.clearRect(0, 0, W, H);

    if (cake) {
        cake.draw();
    }

    flowers.forEach(flower => {
        flower.update();
        flower.draw();
    });

    requestAnimationFrame(animate);
}

if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        if (r > w/2) r = w/2;
        if (r > h/2) r = h/2;
        this.moveTo(x + r, y);
        this.lineTo(x + w - r, y);
        this.quadraticCurveTo(x + w, y, x + w, y + r);
        this.lineTo(x + w, y + h - r);
        this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        this.lineTo(x + r, y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - r);
        this.lineTo(x, y + r);
        this.quadraticCurveTo(x, y, x + r, y);
        return this;
    };
}

window.addEventListener('resize', () => {
    resizeCanvas();
    if (cake) {
        cake.x = W / 2;
        cake.y = H / 2 + 60;
    }
});

// ===== NẾU ĐÃ QUA NGÀY 4/9, BẮT ĐẦU QUIZ NGAY =====
if (new Date().getTime() >= TARGET_DATE) {
    countdownPage.classList.add('hidden');
    quizPage.classList.remove('hidden');
    startQuiz();
    startBirthdayEffect();
}