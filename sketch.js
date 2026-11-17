let weather;  // 클릭으로 하늘에서 떨어지는 날씨 파티클
let flash = 0;      // 번개 칠 때 화면 번쩍임

function setup() {
  createCanvas(720, 400);
  weather = new ParticleSystem(createVector(0, 0));
}

function draw() {
  background(51);

  // 번개 번쩍임
  if (flash > 0) {
    background(255, flash);
    flash -= 15;
  }

  weather.run();
}

// 마우스를 클릭한 x 위치의 하늘(캔버스 위쪽)에서 떨어짐
function mousePressed() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;

  // 클릭할 때마다 비, 눈, 번개 중 하나를 랜덤으로 고름
  let mode = random(['rain', 'snow', 'lightning']);

  if (mode === 'rain') {
    for (let i = 0; i < 40; i++) {
      weather.add(new RainDrop(createVector(mouseX + random(-60, 60), random(-100, 0))));
    }
  } else if (mode === 'snow') {
    for (let i = 0; i < 30; i++) {
      weather.add(new SnowFlake(createVector(mouseX + random(-80, 80), random(-50, 0))));
    }
  } else if (mode === 'lightning') {
    weather.add(new Lightning(createVector(mouseX, 0)));
    flash = 120;
  }
}
