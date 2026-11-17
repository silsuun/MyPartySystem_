let system;
let tilt = 0;   // 물뿌리개 기울기 (0 ~ 0.5)
let canX = 130; // 물뿌리개 위치 (마우스를 따라 좌우로 이동)
let flowers = [];

function setup() {
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(200, 150)); // 물뿌리개 주둥이 끝
  // 꽃 여러 개 (bloom: 0 = 시듦, 1 = 활짝)
  for (let x = 260; x <= 660; x += 100) {
    flowers.push({ x: x, y: random(320, 340), bloom: 0 });
  }
}

function draw() {
  background(51);

  // 마우스 좌우로 물뿌리개 이동, 누르고 있으면 기울어짐
  canX = lerp(canX, constrain(mouseX - 180, 60, 500), 0.1);
  tilt = lerp(tilt, mouseIsPressed ? 0.5 : 0, 0.1);

  // 주둥이 끝 위치를 기울기에 맞춰 회전 (몸통 중심 canX,170 기준)
  system.origin.set(canX + 70 * cos(tilt) + 20 * sin(tilt),
                    170 + 70 * sin(tilt) - 20 * cos(tilt));

  // 충분히 기울었을 때만 물이 나옴
  if (tilt > 0.3) system.addParticle();
  system.run();

  for (let f of flowers) {
    // 꽃에 닿은 물방울은 사라지고 꽃이 피어남
    for (let p of system.particles) {
      if (dist(p.position.x, p.position.y, f.x, f.y) < 30) {
        p.lifespan = -1;
        f.bloom = min(f.bloom + 0.005, 1);
      }
    }
    f.bloom = max(f.bloom - 0.0005, 0); // 물을 안 주면 천천히 다시 시듦
    drawFlower(f.x, f.y, f.bloom);
  }

  drawWateringCan();
}

// 물뿌리개
function drawWateringCan() {
  push();
  translate(canX, 170);
  rotate(tilt);
  noStroke();
  fill(90, 160, 110);
  rect(-40, -30, 80, 60, 8);             // 몸통
  quad(35, 5, 40, 15, 70, -15, 64, -22); // 주둥이
  noFill();
  stroke(90, 160, 110);
  strokeWeight(6);
  arc(0, -30, 50, 40, PI, TWO_PI);       // 손잡이
  pop();
}

// 꽃 (bloom에 따라 시든 모습 → 활짝 핀 모습)
function drawFlower(x, y, bloom) {
  let hx = x + (1 - bloom) * 18;  // 시들면 고개가 옆으로
  let hy = y + (1 - bloom) * 25;  // 그리고 아래로 처짐
  stroke(lerpColor(color(120, 110, 60), color(60, 150, 60), bloom));
  strokeWeight(4);
  noFill();
  bezier(x, height, x, y + 30, x, hy, hx, hy); // 줄기
  noStroke();
  fill(lerpColor(color(130, 100, 90), color(255, 120, 160), bloom));
  let r = 6 + 8 * bloom;      // 꽃잎 퍼짐
  let s = 8 + 10 * bloom;     // 꽃잎 크기
  for (let a = 0; a < TWO_PI; a += TWO_PI / 6) {
    ellipse(hx + cos(a) * r, hy + sin(a) * r, s, s); // 꽃잎
  }
  fill(lerpColor(color(140, 120, 70), color(255, 210, 60), bloom));
  ellipse(hx, hy, 10 + 6 * bloom, 10 + 6 * bloom); // 꽃술
}
