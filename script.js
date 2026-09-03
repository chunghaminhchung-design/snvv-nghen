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

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopFloating();
    } else {
        startFloating();
    }
});

// ===== LẤY CÁC PHẦN TỬ =====
const loginPage = document.getElementById('loginPage');
const quizPage = document.getElementById('quizPage');
const letterPage = document.getElementById('letterPage');

// ===== LUÔN HIỆN LOGIN =====
loginPage.classList.remove('hidden');

// ===== MẬT KHẨU =====
const PASSWORD = '492006';
const display = document.getElementById('display');
const errorMsg = document.getElementById('errorMsg');
let input = '';

window.pressKey = function(val) {
    if (val === 'clear') {
        input = input.slice(0, -1);
    } else if (val === 'enter') {
        if (input === PASSWORD) {
            loginPage.classList.add('hidden');
            quizPage.classList.remove('hidden');
            errorMsg.classList.add('hidden');
            input = '';
            display.textContent = '❤️';
            startQuiz();
            startBirthdayEffect();
            return;
        } else {
            errorMsg.classList.remove('hidden');
            input = '';
            display.textContent = '❤️';
            setTimeout(function() {
                errorMsg.classList.add('hidden');
            }, 2000);
            return;
        }
    } else {
        if (input.length < 6) {
            input += val;
        }
    }
    display.textContent = input.length > 0 ? input : '❤️';
};

document.addEventListener('keydown', function(e) {
    const key = e.key;
    if (key >= '0' && key <= '9') {
        e.preventDefault();
        window.pressKey(key);
    } else if (key === 'Backspace') {
        e.preventDefault();
        window.pressKey('clear');
    } else if (key === 'Enter') {
        e.preventDefault();
        window.pressKey('enter');
    }
});

// ===== QUIZ =====
const questions = [
    {
        question: "👉 [Câu hỏi 1 - Anh/chị tự điền]",
        options: ["A. Đáp án A", "B. Đáp án B", "C. Đáp án C", "D. Đáp án D"],
        correct: 0
    },
    {
        question: "👉 [Câu hỏi 2 - Anh/chị tự điền]",
        options: ["A. Đáp án A", "B. Đáp án B", "C. Đáp án C", "D. Đáp án D"],
        correct: 1
    },
    {
        question: "👉 [Câu hỏi 3 - Anh/chị tự điền]",
        options: ["A. Đáp án A", "B. Đáp án B", "C. Đáp án C", "D. Đáp án D"],
        correct: 2
    },
    {
        question: "👉 [Câu hỏi 4 - Anh/chị tự điền]",
        options: ["A. Đáp án A", "B. Đáp án B", "C. Đáp án C", "D. Đáp án D"],
        correct: 3
    },
    {
        question: "💖 Chị có quý em không?",
        options: ["Có 💕", "Không 😢"],
        correct: 0,
        isFinal: true
    }
];

let currentQuestion = 0;
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const questionCounter = document.getElementById('questionCounter');
const quizResult = document.getElementById('quizResult');
const resultText = document.getElementById('resultText');

function startQuiz() {
    currentQuestion = 0;
    quizResult.classList.add('hidden');
    renderQuestion();
}

function renderQuestion() {
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    questionCounter.textContent = 'Câu ' + (currentQuestion + 1) + ' / ' + questions.length;

    optionsContainer.innerHTML = '';

    q.options.forEach(function(opt, index) {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = opt;
        btn.dataset.index = index;
        btn.onclick = function() {
            handleAnswer(parseInt(this.dataset.index));
        };
        optionsContainer.appendChild(btn);
    });

    quizResult.classList.add('hidden');
}

function handleAnswer(index) {
    const q = questions[currentQuestion];
    const btns = optionsContainer.querySelectorAll('.option-btn');

    if (q.isFinal) {
        if (index === 0) {
            showLoveQR();
        } else {
            growLoveText();
        }
        return;
    }

    btns.forEach(function(btn, i) {
        btn.disabled = true;
        if (i === q.correct) {
            btn.classList.add('correct');
        } else if (i === index && i !== q.correct) {
            btn.classList.add('wrong');
        }
        if (i === index) {
            btn.classList.add('selected');
        }
    });

    if (index === q.correct) {
        resultText.textContent = '✅ Đúng rồi! Chị giỏi quá! 🌟';
    } else {
        resultText.textContent = '❌ Sai rồi! Đáp án đúng là ' + q.options[q.correct];
    }
    quizResult.classList.remove('hidden');

    setTimeout(function() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            quizPage.classList.add('hidden');
            letterPage.classList.remove('hidden');
            currentLetter = 0;
            updateLetter(0);
            startAutoSlide();
        }
    }, 1500);
}

// ===== XỬ LÝ CÂU CUỐI: "KHÔNG" (to dần mỗi lần ấn) =====
let noClickCount = 0;
let loveOverlay = null;

function growLoveText() {
    if (!loveOverlay) {
        // Tạo overlay lần đầu
        loveOverlay = document.createElement('div');
        loveOverlay.id = 'loveOverlay';
        loveOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(214, 51, 108, 0.92);
            animation: growLoveBg 0.5s ease forwards;
            cursor: pointer;
        `;

        const text = document.createElement('div');
        text.id = 'loveText';
        text.textContent = '💖 CÓ 💖';
        text.style.cssText = `
            font-size: 40px;
            font-weight: 900;
            color: #fff;
            text-shadow: 0 0 30px rgba(255,255,255,0.5);
            transition: all 0.3s ease;
            user-select: none;
        `;

        loveOverlay.appendChild(text);
        document.body.appendChild(loveOverlay);

        const style = document.createElement('style');
        style.id = 'loveStyle';
        style.textContent = `
            @keyframes growLoveBg {
                0% { transform: scale(0.5); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
            @keyframes pulseLove {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(style);

        loveOverlay.onclick = function() {
            noClickCount++;
            const textEl = document.getElementById('loveText');
            if (textEl) {
                const sizes = [40, 60, 80, 120, 200, 300];
                const index = Math.min(noClickCount, sizes.length - 1);
                textEl.style.fontSize = sizes[index] + 'px';
                
                textEl.style.animation = 'none';
                setTimeout(() => {
                    textEl.style.animation = 'pulseLove 0.5s ease';
                }, 10);
                
                if (noClickCount >= sizes.length - 1) {
                    setTimeout(function() {
                        if (loveOverlay) {
                            loveOverlay.remove();
                            loveOverlay = null;
                        }
                        quizPage.classList.add('hidden');
                        letterPage.classList.remove('hidden');
                        currentLetter = 0;
                        updateLetter(0);
                        startAutoSlide();
                    }, 800);
                }
            }
        };
    } else {
        loveOverlay.click();
    }
}

// ===== XỬ LÝ "CÓ" =====
function showLoveQR() {
    quizPage.classList.add('hidden');
    showTransferPage();
}

// ===== TRANG CHUYỂN TIỀN (có TROLL) =====
function showTransferPage() {
    const overlay = document.createElement('div');
    overlay.id = 'transferOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        overflow-y: auto;
    `;

    const card = document.createElement('div');
    card.style.cssText = `
        background: #fff;
        border-radius: 30px;
        padding: 30px 25px;
        max-width: 420px;
        width: 100%;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        animation: fadeSlide 0.3s ease;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    `;

    card.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 6px;">💝</div>
        <h2 style="color: #d6336c; font-size: 24px; margin-bottom: 4px;">Chị thương em bao nhiêu?</h2>
        <p style="color: #888; font-size: 14px; margin-bottom: 16px;">Số tiền chị chuyển sẽ thể hiện tình cảm dành cho em đó! 💕</p>

        <div style="margin: 12px 0;">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=MBANK_QR_CODE_HERE" 
                 alt="QR Code MB Bank" 
                 style="width: 180px; height: 180px; border-radius: 16px; border: 3px solid #f0d0e0;" />
            <p style="font-size: 12px; color: #999; margin-top: 6px;">📱 Quét mã QR để chuyển khoản</p>
        </div>

        <div style="margin: 12px 0;">
            <p style="font-size: 14px; color: #666;">Ngân hàng: <strong>MB Bank</strong></p>
            <p style="font-size: 14px; color: #666;">Số tài khoản: <strong id="accountNumber">[Số TK của anh/chị]</strong></p>
            <p style="font-size: 14px; color: #666;">Chủ tài khoản: <strong id="accountName">[Tên chủ TK]</strong></p>
        </div>

        <div style="margin: 12px 0;">
            <label style="font-size: 14px; color: #666; display: block; text-align: left; margin-bottom: 4px;">
                💰 Số tiền (VND):
            </label>
            <input type="number" id="transferAmount" 
                   placeholder="Nhập số tiền..." 
                   style="width: 100%; padding: 12px 16px; border: 2px solid #f0d0e0; border-radius: 16px; font-size: 18px; outline: none; transition: 0.2s;"
                   onfocus="this.style.borderColor='#d6336c'"
                   onblur="this.style.borderColor='#f0d0e0'" />
            <p style="font-size: 12px; color: #999; margin-top: 4px;">💡 Số tiền sẽ tùy vào mức độ quý mến của chị dành cho em!</p>
        </div>

        <button id="transferBtn" 
                style="width: 100%; padding: 14px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border: none; border-radius: 30px; font-size: 18px; font-weight: 600; color: #fff; cursor: pointer; box-shadow: 0 8px 25px rgba(245, 87, 108, 0.35); transition: 0.2s; margin-top: 8px;">
            💸 Chuyển khoản ngay
        </button>

        <button id="skipTransferBtn" 
                style="width: 100%; padding: 12px; background: transparent; border: 2px solid #ddd; border-radius: 30px; font-size: 16px; color: #888; cursor: pointer; margin-top: 10px; transition: 0.2s;">
            ❌ Bỏ qua, đọc thư sau
        </button>
    `;

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    document.getElementById('transferBtn').addEventListener('click', function() {
        const amount = document.getElementById('transferAmount').value;
        if (!amount || amount <= 0) {
            alert('💝 Chị ơi, hãy nhập số tiền em nhé!');
            return;
        }
        showTrollMessage(overlay);
    });

    document.getElementById('skipTransferBtn').addEventListener('click', function() {
        overlay.remove();
        quizPage.classList.add('hidden');
        letterPage.classList.remove('hidden');
        currentLetter = 0;
        updateLetter(0);
        startAutoSlide();
    });

    const style2 = document.createElement('style');
    style2.textContent = `
        @keyframes fadeSlide {
            0% { opacity: 0; transform: translateY(20px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
    `;
    document.head.appendChild(style2);
}

// ===== HÀM TROLL =====
function showTrollMessage(overlay) {
    overlay.innerHTML = '';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: rgba(0,0,0,0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeSlide 0.5s ease;
    `;

    const trollCard = document.createElement('div');
    trollCard.style.cssText = `
        background: linear-gradient(135deg, #ff6b6b, #ee5a24);
        border-radius: 40px;
        padding: 50px 40px;
        max-width: 450px;
        width: 100%;
        text-align: center;
        box-shadow: 0 30px 80px rgba(0,0,0,0.5);
        animation: trollPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;

    trollCard.innerHTML = `
        <div style="font-size: 80px; margin-bottom: 10px;">🤡</div>
        <h1 style="color: #fff; font-size: 48px; font-weight: 900; text-shadow: 0 4px 20px rgba(0,0,0,0.3);">
            TROLL!!!
        </h1>
        <p style="color: rgba(255,255,255,0.9); font-size: 20px; margin: 16px 0 20px; line-height: 1.6;">
            🤣 Chị bị lừa rồi! <br>
            Đây chỉ là trang web tình cảm thôi! 💕
        </p>
        <div style="font-size: 60px; margin: 10px 0;">😝</div>
        <button id="trollContinueBtn" 
                style="margin-top: 16px; padding: 16px 40px; background: #fff; border: none; border-radius: 50px; font-size: 20px; font-weight: 700; color: #ee5a24; cursor: pointer; box-shadow: 0 8px 30px rgba(0,0,0,0.2); transition: 0.2s;">
            💌 Đọc thư đi nào!
        </button>
    `;

    overlay.appendChild(trollCard);

    const style = document.createElement('style');
    style.textContent = `
        @keyframes trollPop {
            0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes fadeSlide {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.getElementById('trollContinueBtn').addEventListener('click', function() {
        overlay.remove();
        quizPage.classList.add('hidden');
        letterPage.classList.remove('hidden');
        currentLetter = 0;
        updateLetter(0);
        startAutoSlide();
    });
}

// ===== LÁ THƯ =====
const letters = [
    { emoji: '💖', content: 'Chị à, em chúc chị luôn vui vẻ và hạnh phúc! Chị xứng đáng với những điều tốt đẹp nhất trên đời này. 🌸' },
    { emoji: '🌟', content: 'Cảm ơn chị vì luôn bên em, chăm sóc và yêu thương em. Em may mắn khi có chị trong cuộc đời! 🥰' },
    { emoji: '🌈', content: 'Chúc chị năm mới tuổi mới thật nhiều niềm vui, sức khỏe và thành công trong mọi dự định! 🎊' },
    { emoji: '🌺', content: 'Chị luôn là nguồn cảm hứng và là hình mẫu của em. Em yêu chị rất nhiều! Mong chị luôn xinh đẹp và rạng rỡ! ✨' },
    { emoji: '🎁', content: 'Tuổi mới, chị hãy sống thật vui và thật ý nghĩa nhé! Em luôn ủng hộ và yêu thương chị! 💕' }
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
    letterCounter.textContent = 'Lá thư ' + (index + 1) + ' / ' + letters.length;

    let dots = '';
    for (let i = 0; i < letters.length; i++) {
        dots += i === index ? '●' : '○';
    }
    pageDot.textContent = dots;

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === letters.length - 1;

    const display = document.getElementById('letterDisplay');
    display.style.animation = 'none';
    requestAnimationFrame(function() {
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

prevBtn.addEventListener('click', function() {
    if (currentLetter > 0) {
        currentLetter--;
        updateLetter(currentLetter);
        stopAutoSlide();
        setTimeout(startAutoSlide, 5000);
    }
});

nextBtn.addEventListener('click', function() {
    if (currentLetter < letters.length - 1) {
        currentLetter++;
        updateLetter(currentLetter);
        stopAutoSlide();
        setTimeout(startAutoSlide, 5000);
    }
});

document.getElementById('letterDisplay').addEventListener('mouseenter', function() {
    stopAutoSlide();
});

document.getElementById('letterDisplay').addEventListener('mouseleave', function() {
    if (!letterPage.classList.contains('hidden')) {
        startAutoSlide();
    }
});

let paused = false;
document.addEventListener('touchstart', function(e) {
    if (letterPage.classList.contains('hidden')) return;
    if (!paused) {
        stopAutoSlide();
        paused = true;
    } else {
        startAutoSlide();
        paused = false;
    }
});

// ===== BÁNH SINH NHẬT + HOA =====
const canvas = document.getElementById('birthdayCanvas');
const ctx = canvas.getContext('2d');

let W, H;

function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function Flower() {
    this.reset = function() {
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
    };

    this.randomColor = function() {
        const colors = ['#ff6b6b', '#ff9ff3', '#feca57', '#ff9f43', '#ff4757', '#ff6348', '#ff7f50', '#ff6b81', '#ffcccc', '#ffb8b8', '#ffd93d', '#ffda79'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    this.draw = function() {
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
    };

    this.update = function() {
        this.y += this.speed;
        this.x += Math.sin(this.phase) * this.swing;
        this.phase += this.swingSpeed;
        this.rotation += this.rotSpeed;

        if (this.y > H + 50) {
            this.reset();
        }
    };

    this.reset();
}

function BirthdayCake() {
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

    this.draw = function() {
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

            const grad = ctx.createLinearGradient(-w / 2, yOffset - h / 2, w / 2, yOffset + h / 2);
            grad.addColorStop(0, layerColors[i]);
            grad.addColorStop(0.5, '#fff0f5');
            grad.addColorStop(1, layerColors[i]);

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(-w / 2, yOffset - h / 2, w, h, 12);
            ctx.fill();

            ctx.shadowBlur = 0;
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(-w / 2, yOffset - h / 2, w, h, 12);
            ctx.stroke();

            if (i < this.layers - 1) {
                for (let j = 0; j < 12; j++) {
                    const dotX = -w / 2 + 20 + j * ((w - 40) / 11);
                    ctx.beginPath();
                    ctx.arc(dotX, yOffset - h / 2, 6, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255,255,255,0.6)';
                    ctx.fill();
                }
            }
        }

        this.decorations.forEach(function(dec) {
            ctx.shadowBlur = 0;
            ctx.fillStyle = dec.color;
            ctx.beginPath();
            ctx.arc(dec.x, -this.layers * 40 + 30 + dec.y, dec.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }.bind(this));

        const candleY = -this.layers * 40 + 20;
        this.candles.forEach(function(candle, idx) {
            const x = candle.x;

            ctx.shadowColor = 'rgba(0,0,0,0.15)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetY = 3;

            ctx.fillStyle = candle.color;
            ctx.beginPath();
            ctx.roundRect(x - candle.width / 2, candleY - candle.height, candle.width, candle.height, 3);
            ctx.fill();

            ctx.shadowBlur = 0;
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.lineWidth = 1;
            for (let s = 0; s < 3; s++) {
                const sy = candleY - candle.height + 8 + s * 12;
                ctx.beginPath();
                ctx.moveTo(x - candle.width / 2 + 2, sy);
                ctx.lineTo(x + candle.width / 2 - 2, sy);
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
        }.bind(this));

        ctx.restore();
    };
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

    flowers.forEach(function(flower) {
        flower.update();
        flower.draw();
    });

    requestAnimationFrame(animate);
}

if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        if (r > w / 2) r = w / 2;
        if (r > h / 2) r = h / 2;
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

window.addEventListener('resize', function() {
    resizeCanvas();
    if (cake) {
        cake.x = W / 2;
        cake.y = H / 2 + 60;
    }
});

startBirthdayEffect();