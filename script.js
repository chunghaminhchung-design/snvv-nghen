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

        // Thêm style animation
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

        // Bấm vào overlay để tăng size
        loveOverlay.onclick = function() {
            noClickCount++;
            const textEl = document.getElementById('loveText');
            if (textEl) {
                // Tăng size mỗi lần ấn: 40 → 60 → 80 → 120 → 200 → 300
                const sizes = [40, 60, 80, 120, 200, 300];
                const index = Math.min(noClickCount, sizes.length - 1);
                textEl.style.fontSize = sizes[index] + 'px';
                
                // Thêm hiệu ứng rung
                textEl.style.animation = 'none';
                setTimeout(() => {
                    textEl.style.animation = 'pulseLove 0.5s ease';
                }, 10);
                
                // Khi đã to nhất, tự động chuyển sang trang thư
                if (noClickCount >= sizes.length - 1) {
                    setTimeout(function() {
                        // Xóa overlay
                        if (loveOverlay) {
                            loveOverlay.remove();
                            loveOverlay = null;
                        }
                        // Chuyển sang trang thư
                        document.getElementById('quizPage').classList.add('hidden');
                        document.getElementById('letterPage').classList.remove('hidden');
                        currentLetter = 0;
                        updateLetter(0);
                        startAutoSlide();
                    }, 800);
                }
            }
        };
    } else {
        // Nếu overlay đã tồn tại, tự động tăng size (giống như bấm vào)
        loveOverlay.click();
    }
}

// ===== XỬ LÝ "CÓ" =====
function showLoveQR() {
    document.getElementById('quizPage').classList.add('hidden');
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

    // Xử lý nút chuyển khoản
    document.getElementById('transferBtn').addEventListener('click', function() {
        const amount = document.getElementById('transferAmount').value;
        if (!amount || amount <= 0) {
            alert('💝 Chị ơi, hãy nhập số tiền em nhé!');
            return;
        }
        const accountNumber = document.getElementById('accountNumber').textContent;
        const accountName = document.getElementById('accountName').textContent;
        
        // ===== HIỆN TROLL =====
        showTrollMessage(overlay);
    });

    // Xử lý nút bỏ qua
    document.getElementById('skipTransferBtn').addEventListener('click', function() {
        overlay.remove();
        document.getElementById('quizPage').classList.add('hidden');
        document.getElementById('letterPage').classList.remove('hidden');
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
    // Xóa nội dung cũ
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

    // Thêm style animation
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

    // Nút tiếp tục
    document.getElementById('trollContinueBtn').addEventListener('click', function() {
        overlay.remove();
        document.getElementById('quizPage').classList.add('hidden');
        document.getElementById('letterPage').classList.remove('hidden');
        currentLetter = 0;
        updateLetter(0);
        startAutoSlide();
    });
}