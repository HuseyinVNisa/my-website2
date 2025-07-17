const messages = [
 "İlk hakkınız yanlış Nisa Hanım 😅",
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
    const title = document.getElementById("mainTitle");
    if (title) title.style.display = "none";

    const messageDisplay = document.getElementById("message_display");
    messageDisplay.textContent = ""; // Yazıyı hemen göstermiyoruz

    const yesButton = document.querySelector('.yes-button');
    const noButton = document.querySelector('.no-button');

    const gifContainer = document.querySelector('.gif_container');
    gifContainer.innerHTML = '';

    const newGif = document.createElement('img');
    newGif.src = 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3YmZhN2tyNzc0ZzB5MGM0OWxneWxia283cjFrcmVkaHhod2xleHVyZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Ch99KhmloXHdkTNFWC/giphy.gif';
    newGif.alt = 'No click GIF';
    newGif.style.width = '200px';
    newGif.style.marginTop = '10px';
    gifContainer.appendChild(newGif);

    setTimeout(() => {
        gifContainer.innerHTML = '';
        messageDisplay.textContent = messages[messageIndex];
    }, 1300);

    messageIndex++;

    // Yeni: 10. basıştan sonra sadece Nisa butonu kalsın
    if (messageIndex >= messages.length) {
        const container = document.querySelector('.container');
        container.innerHTML = `
            <div style="text-align: center; margin-top: 100px;">
                <button class="yes-button" onclick="handleYesClick()" style="
                    padding: 12px 24px;
                    font-size: 20px;
                    background-color: #ff5e91;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                ">
                    Nisa 😇
                </button>
            </div>
        `;
    }
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}
