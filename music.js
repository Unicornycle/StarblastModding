var bgMusic = new Audio("https://files.catbox.moe/dvyb4t.mp3");
bgMusic.loop = true;

function playMusic() {
    bgMusic.play().then(() => {
        console.log("🎵 GitHub에서 불러온 음악 실행됨!");
    }).catch(e => console.error("⛔ 음악 실행 실패:", e));
}
