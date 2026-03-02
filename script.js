// Click Count Sistemi
let clickCount = 0;
const TARGET_COUNT = 50;

// DOM Elementleri
const mainButton = document.getElementById('mainButton');
const counterNumber = document.getElementById('counterNumber');
const counterContainer = document.getElementById('counterContainer');
const buttonContainer = document.getElementById('buttonContainer');
const motivationMessage = document.getElementById('motivationMessage');
const finalScreen = document.getElementById('finalScreen');
const animationContainer = document.getElementById('animationContainer');
const princessPhoto = document.getElementById('princessPhoto');

// Motivasyon Mesajları
const motivationMessages = [
    "Az Kaldı!",
    "Yaklaşıyorsun...",
    "Güzellik Yaklaşıyor!",
    "Harika Gidiyorsun!",
    "Çok Yaklaştın!"
];

// Ana Buton Tıklama Eventi
mainButton.addEventListener('click', handleClick);
mainButton.addEventListener('touchstart', handleClick, { passive: true });

function handleClick(e) {
    e.preventDefault();
    
    if (clickCount >= TARGET_COUNT) {
        return;
    }
    
    // Click count artır
    clickCount++;
    counterNumber.textContent = clickCount;
    
    // Rastgele animasyon oluştur
    createFloatingAnimation(e);
    
    // Her 10 tıkta bir motivasyon mesajı göster
    if (clickCount % 10 === 0 && clickCount < TARGET_COUNT) {
        showMotivationMessage();
    }
    
    // Buton animasyonu
    mainButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        mainButton.style.transform = '';
    }, 150);
    
    // 50. tıklamada final
    if (clickCount === TARGET_COUNT) {
        setTimeout(() => {
            showFinalScreen();
        }, 500);
    }
}

// Rastgele Floating Animasyon
function createFloatingAnimation(e) {
    // Tıklama pozisyonunu al (mobil için touch pozisyonu)
    let x, y;
    if (e.touches && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    } else {
        x = e.clientX || window.innerWidth / 2;
        y = e.clientY || window.innerHeight / 2;
    }
    
    // Rastgele kalp veya Pocoyo kafası seç
    const isPocoyo = Math.random() > 0.5;
    
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.style.left = x + 'px';
    element.style.top = y + 'px';
    
    if (isPocoyo) {
        // Pocoyo kafası (mavi veya pembe rastgele)
        const pocoyoType = Math.random() > 0.5 ? 'mavi_pocoyo.png' : 'pembe_pocoyo.png';
        const img = document.createElement('img');
        img.src = pocoyoType;
        img.className = 'pocoyo-head';
        img.alt = 'Pocoyo';
        element.appendChild(img);
    } else {
        // Kalp emoji
        element.textContent = '❤️';
        element.style.fontSize = '8vw';
    }
    
    // Rastgele yön ve hız
    const randomX = (Math.random() - 0.5) * 200;
    element.style.setProperty('--random-x', randomX + 'px');
    
    animationContainer.appendChild(element);
    
    // Animasyon bitince element'i kaldır
    setTimeout(() => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }, 2000);
}

// Motivasyon Mesajı Göster
function showMotivationMessage() {
    const messageIndex = Math.floor((clickCount / 10) - 1) % motivationMessages.length;
    motivationMessage.textContent = motivationMessages[messageIndex];
    motivationMessage.classList.add('show');
    
    setTimeout(() => {
        motivationMessage.classList.remove('show');
    }, 2000);
}

// Final Ekranı Göster
function showFinalScreen() {
    // Buton ve sayaç gizle
    buttonContainer.classList.add('fade-out');
    counterContainer.classList.add('fade-out');
    
    setTimeout(() => {
        buttonContainer.style.display = 'none';
        counterContainer.style.display = 'none';
        
        // Final ekranı göster
        finalScreen.style.display = 'flex';
        
        // Parlama efekti
        const glowEffect = document.getElementById('glowEffect');
        glowEffect.style.animation = 'pulse 2s ease-in-out infinite';
        
        // Konfeti başlat
        setTimeout(() => {
            startConfetti();
        }, 500);
        
        // Fotoğraf yükleme kontrolü
        princessPhoto.addEventListener('error', function() {
            console.warn('Prenses fotoğrafı yüklenemedi:', this.src);
            this.style.border = '2px dashed #ccc';
            this.alt = 'Fotoğraf yüklenemedi';
        });
    }, 800);
}

// Konfeti Efekti
function startConfetti() {
    // İlk büyük patlama
    confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#ff6b9d', '#4a90e2', '#ffd93d', '#6bcf7f', '#ff9f66', '#ffb3d9']
    });
    
    // Sağdan patlama
    setTimeout(() => {
        confetti({
            particleCount: 150,
            angle: 60,
            spread: 70,
            origin: { x: 1, y: 0.5 },
            colors: ['#ff6b9d', '#4a90e2', '#ffd93d', '#6bcf7f', '#ff9f66']
        });
    }, 300);
    
    // Soldan patlama
    setTimeout(() => {
        confetti({
            particleCount: 150,
            angle: 120,
            spread: 70,
            origin: { x: 0, y: 0.5 },
            colors: ['#ff6b9d', '#4a90e2', '#ffd93d', '#6bcf7f', '#ff9f66']
        });
    }, 600);
    
    // Sürekli konfeti yağmuru (10 saniye)
    const confettiInterval = setInterval(() => {
        confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0 },
            colors: ['#ff6b9d', '#4a90e2', '#ffd93d', '#6bcf7f', '#ff9f66']
        });
    }, 400);
    
    // 10 saniye sonra durdur
    setTimeout(() => {
        clearInterval(confettiInterval);
    }, 10000);
}

// Sayfa yüklendiğinde animasyon
window.addEventListener('load', () => {
    mainButton.style.opacity = '0';
    mainButton.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        mainButton.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        mainButton.style.opacity = '1';
        mainButton.style.transform = 'scale(1)';
    }, 100);
});

// Mobil için touch event optimizasyonu
let touchStartTime = 0;
mainButton.addEventListener('touchstart', (e) => {
    touchStartTime = Date.now();
}, { passive: true });

mainButton.addEventListener('touchend', (e) => {
    const touchDuration = Date.now() - touchStartTime;
    if (touchDuration < 300) {
        handleClick(e);
    }
}, { passive: true });
