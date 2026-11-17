let system;

function setup() {
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(200, 150)); // 물뿌리개 주둥이 끝
}

function draw() {
  background(51);
  drawFlower(320, 330);
  drawWateringCan();
  system.addParticle();
  system.run();
}

// 물뿌리개
function drawWateringCan() {
  noStroke();
  fill(90, 160, 110);
  rect(90, 140, 80, 60, 8);                 // 몸통
  quad(165, 175, 170, 185, 200, 155, 194, 148); // 주둥이
  noFill();
  stroke(90, 160, 110);
  strokeWeight(6);
  arc(130, 140, 50, 40, PI, TWO_PI);        // 손잡이
}

// 꽃
function drawFlower(x, y) {
  stroke(60, 150, 60);
  strokeWeight(4);
  line(x, y, x, height);                    // 줄기
  noStroke();
  fill(255, 120, 160);
  for (let a = 0; a < TWO_PI; a += TWO_PI / 6) {
    ellipse(x + cos(a) * 14, y + sin(a) * 14, 18, 18); // 꽃잎
  }
  fill(255, 210, 60);
  ellipse(x, y, 16, 16);                    // 꽃술
}
