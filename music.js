this.options = {
  
  root_mode:           "survival", /* survival, team, invasion, deathmatch, battleroyale  */
  
  soundtrack: "bruhhh.mp3", 
 
};


var reset_button = {
  id: "reset",
  position: [-300, -300, 900, 900], // 📌 클릭 가능한 영역을 키움
  clickable: true,
  visible: true,
  components: [
    { type: "box", position: [0, 0, 100, 100], stroke: "#CDE", width: 4 },
    { type: "box", position: [-25, -25, 150, 150], stroke: "transparent", width: 0 }, // 보이지 않는 확장 박스
    { type: "text", position: [10, 35, 120, 40], value: "", color: "#CDE" }
  ]
};


var resetShip = function(ship) {
};

// ✅ 배경 음악 설정
var bgMusic = new Audio("https://files.catbox.moe/dvyb4t.mp3");
bgMusic.loop = true;

this.tick = function(game) {
  if (game.step % 60 === 0) {
    for (var i = 0; i < game.ships.length; i++) {
      var ship = game.ships[i];
      if (!ship.custom.reset_button_installed) {
        ship.custom.reset_button_installed = true;
        ship.setUIComponent(reset_button);
      }
    }
  }
};

this.event = function(event, game) {
  switch (event.name) {
    case "ui_component_clicked":
      var ship = event.ship;
      var component = event.id;
      if (component == "reset") {
        resetShip(ship);

        // ✅ 음악 실행
        bgMusic.play().then(() => {
          console.log("🎵 음악 재생 성공!");
        }).catch(e => console.error("⛔ 음악 실행 실패:", e));

        // ✅ RESET 버튼을 화면 바깥으로 이동 (완전히 클릭 불가능하게 만듦)
        ship.setUIComponent({
          id: "reset",
          position: [5000, 5000, 8, 14], // 버튼을 엄청 멀리 이동
          components: [] // 내부 요소도 없애서 완전히 사라지게 만듦
        });

        console.log("❌ RESET 버튼이 화면 밖으로 이동했습니다!");
      }
      break;
  }
};

window.addEventListener("unload", function() {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    bgMusic.src = ""; // ✅ 음악 URL을 완전히 지워서 브라우저에서 날려버리기!
    console.log("🔄 페이지 새로고침 또는 닫힘 감지! 음악 완전 제거됨!");
});


