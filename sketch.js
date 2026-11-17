let weather;  // 클릭으로 하늘에서 떨어지는 날씨 파티클
let flash = 0;      // 번개 칠 때 화면 번쩍임
let sky;            // 미리 그려 둔 어두운 하늘 그라데이션
let clouds = [];    // 먹구름들

function setup() {
  createCanvas(720, 400);
  weather = new ParticleSystem(createVector(0, 0));
  sky = makeSkyGradient(width, height);

  // 하늘 위쪽에 먹구름을 가로로 깔아 둠
  for (let x = -100; x < width + 100; x += 140) {
    clouds.push(new Cloud(x + random(-30, 30), random(10, 60)));
  }
}

function draw() {
  image(sky, 0, 0);

  // 파티클을 먼저 그리고 구름을 위에 그려서, 구름 속에서 떨어져 나오는 것처럼 보이게 함
  weather.run();

  for (let c of clouds) {
    c.update();
    c.display(flash);
  }

  // 번개 번쩍임
  if (flash > 0) {
    background(255, flash * 0.6);
    flash -= 15;
  }
}

// 마우스를 클릭한 x 위치의 하늘(캔버스 위쪽)에서 떨어짐
function mousePressed() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;

  // 클릭할 때마다 비, 눈, 번개 중 하나를 랜덤으로 고름
  let mode = random(['rain', 'snow', 'lightning']);

  if (mode === 'rain') {
    for (let i = 0; i < 70; i++) {
      weather.add(new RainDrop(createVector(mouseX + random(-120, 120), random(-100, 0))));
    }
  } else if (mode === 'snow') {
    for (let i = 0; i < 50; i++) {
      weather.add(new SnowFlake(createVector(mouseX + random(-150, 150), random(-50, 0))));
    }
  } else if (mode === 'lightning') {
    weather.add(new Lightning(createVector(mouseX, 0)));
    flash = 120;
  }
}
