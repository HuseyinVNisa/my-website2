const audio = new Audio('YourTurn.mp3');
audio.loop = true;

const finalImage = document.getElementById('finalImage');
const feedbackEl = document.getElementById('feedback');
let clickedCount = 0;

const segments = `
Cevapların hiçbir doğru değil... 🙂|
Çünkü aslında doğru cevabu yok bu sorunun.|
Çünkü seninle en mutlu olduğum an,|
yanımda olduğun veya olmadığın her an|
beni yanında hissettiğin her an|
Bazen göz göze geldiğimizde, (bu zamanlar çok gelemesek de :))|
bazen sadece sesini duyduğumda bile...|
O anlar benim için gerçek mutluluk oluyor.|
Şu sıralar biraz zorlanıyor olabilirim Nisa,|
ama bunun tek nedeni seni her an düşünmem belki de.|
Hayatın her anında sanki seninle yaşıyorum.|
Bir sözde, bir şarkıda, ya da gecenin bir köşesinde…|
Ve her seferinde içimden sadece sen geçiyorsun.|
Belki de mükemmel bir insan değilim|
Ama hayatımın her zerresinde bu kıza karşı mükemmel olmak için elimden geleni yapıcam|
Sen yanımda olmasan da, kalbim hep seninle.|
Her anımda| her duamda| hep varsın.|
Ve sen... o güzel kalpli insan,|
bana sabretmeyi, beklemeyi, güçlü kalmayı öğretiyorsun.|
Seninle kurduğumuz bağ, bana umut veriyor.|
Evet, yolumuz kolay değil belki,|
bazen zorlanacağız, bazen kırılacağız.| belki de dün kırdım seni.|
Ama birbirimize sarıldığımız sürece,|
her şeyin üstesinden geleceğiz.|
Çünkü biz güçlüyüz.|
Ben seni her geçen gün daha çok seviyorum.|
Ve resmine baktığımda sadece yüzünü değil,|
geleceğimi görüyorum.|
Hayallerimizi,| paylaşacaklarımızı,| yaşayacaklarımızı…|
Bazen anlatmak kolay olmuyor,|
ama şunu bil ki,|
seni düşündüğümde daha iyi biri olmak istiyorum.|
Seninle geçireceğim bir gelecek hayali bile kalbimi ısıtıyor Nisa.|
Tüm kalbimle,| tüm benliğimle.|
Zaman ağır aksa da,| mesafeler olsa da,|
ben hep buradayım.|
Kalbimde senin için ayırdığım o en güzel yerle…|
Bir gün geldiğinde dönüp geriye baktığımızda,|
bu günlerin bizi nasıl büyüttüğünü göreceğiz.|
O güne kadar ve o günden sonra | hep aklımda, kalbimde ve dualarımda olacaksın.|
Çünkü sen benim en güzel hayalim,|
en değerli parçamsın.| Seni çok seviyorum Nisa. 💖
`.split('|').map(s => s.trim()).filter(Boolean);

const quiz       = document.querySelector('.quiz-container');
const anim       = document.querySelector('.animation-container');
const segmentEl  = document.getElementById('segment');
const buttons    = document.querySelectorAll('.answer-btn');

const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');  // Başlama ekranını gizle
  quiz.classList.remove('hidden');      // Quiz ekranını göster
});

buttons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    clickedCount++;

    const messages = [
      "Bu ilk yanlışın 😅",
      "İkinci kez de bilemedin 😢",
      "Yine olmadı... 🫣",
      "Dördüncüde de bilemedin 😬"
    ];

    const message = messages[clickedCount - 1] || "Tüm şıkları denedin 😇";
    feedbackEl.textContent = message;
    feedbackEl.classList.remove('hidden');
    feedbackEl.classList.remove('flash'); 
    void feedbackEl.offsetWidth; // animasyonu sıfırlamak için
    feedbackEl.classList.add('flash'); 

    // Tüm şıklar denendiyse geçiş başlasın
    if (clickedCount === buttons.length) {
      setTimeout(() => {
        feedbackEl.classList.add('hidden');
        quiz.classList.add('hidden');
        anim.classList.remove('hidden');

        audio.play().catch(e => console.warn("Otomatik oynatma engellendi:", e));

        let idx = 0;
        function showNext() {
          if (idx >= segments.length) {
            finalImage.classList.remove('hidden');
            setTimeout(() => finalImage.classList.add('visible'), 100);
            return;
          }

          segmentEl.textContent = segments[idx];
          segmentEl.classList.add('visible');

          setTimeout(() => {
            segmentEl.classList.remove('visible');
            idx++;
            setTimeout(showNext, 1500);
          }, 4000);
        }

        setTimeout(showNext, 2000);
      }, 2000);
    }
  });
});
