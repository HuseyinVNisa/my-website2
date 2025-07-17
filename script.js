const messages = [
"Hadi yine başladın kendini beni tatliş ilan etmeye...🙄❤️",
  "Ama dürüst oluyoduk hani 😏",
  "Hadi hadi bırak ver şu cevabı artık😅",
  "Bu kadar tatliş olup hâlâ kabul etmemen cidden pes!",
  "Yanlış işte yaa 😅",
  "Ya basmasana artık 😅",
  "Bak çok az hakkın kaldı amaa",
  "Tamam kabul ediyorum, birazcık olabilirim. Ama hala yanlış cevap veriyosun. 😅",
  "Tatlişliğe doymuyorsun ki amaa",
  "Bence artık buldun gibii 😅❤️"
];

let messageIndex = 0;

function handleNoClick() {
    // Başlıktaki yazıyı gizle
    const title = document.getElementById("mainTitle");
    if (title) title.style.display = "none";

    // Mesaj güncelle
    const messageDisplay = document.getElementById("message_display");
    messageDisplay.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    // Nisa butonunu büyüt
    const yesButton = document.querySelector('.yes-button');
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.2}px`;

    // GIF göster
    const gifContainer = document.querySelector('.gif_container');
    gifContainer.innerHTML = '';

    const newGif = document.createElement('img');
    newGif.src = 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3YmZhN2tyNzc0ZzB5MGM0OWxneWxia283cjFrcmVkaHhod2xleHVyZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Ch99KhmloXHdkTNFWC/giphy.gif';
    newGif.alt = 'No click GIF';
    newGif.style.width = '200px';
    newGif.style.marginTop = '10px';

    gifContainer.appendChild(newGif);

    // GIF'i 1.3 saniyede kaldır
    setTimeout(() => {
        gifContainer.innerHTML = '';
    }, 5000);
}

function handleYesClick() {
    // Nisa butonuna tıklanınca müzik oynatılabilir, yönlendirme yapılabilir
    window.location.href = "yes_page.html";
}
