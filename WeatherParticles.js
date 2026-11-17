// Particle을 상속(extends)해서 만든 날씨 파티클들
// 부모의 run(), update(), isDead()를 그대로 쓰고, 필요한 부분만 오버라이드합니다.

// 비: 빠르게 똑바로 떨어지는 파란 선
class RainDrop extends Particle {
    constructor(position) {
        super(position);                              // 부모 생성자 먼저 호출
        this.acceleration = createVector(0, 0.18);    // 중력이 더 강함
        this.velocity = createVector(random(-0.3, 0.3), random(2, 6));
        this.length = random(10, 20);
    }

    update() {
        super.update();                               // 부모의 이동 로직 재사용
        if (this.position.y > height) this.lifespan = -1; // 바닥에 닿으면 사라짐
    }

    display() {
        stroke(120, 170, 255, this.lifespan);
        strokeWeight(2);
        // 속도 방향으로 꼬리를 그림
        let tail = this.velocity.copy().setMag(this.length);
        line(this.position.x, this.position.y,
             this.position.x - tail.x, this.position.y - tail.y);
    }
}

// 눈: 천천히 좌우로 흔들리며 내려오는 흰 점
class SnowFlake extends Particle {
    constructor(position) {
        super(position);
        this.acceleration = createVector(0, 0);       // 중력 없이 일정 속도
        this.velocity = createVector(0, random(0.5, 1.5));
        this.size = random(4, 9);
        this.angle = random(TWO_PI);                  // 흔들림 위상
    }

    update() {
        this.angle += 0.05;
        this.position.x += sin(this.angle) * 0.8;     // 좌우로 살랑살랑
        this.position.add(this.velocity);
        this.lifespan -= 0.8;                         // 오래 살아남음
        if (this.position.y > height) this.lifespan = -1;
    }

    display() {
        noStroke();
        fill(255, this.lifespan);
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }
}

// 번개: 하늘에서 아래로 지그재그로 내리치고 빠르게 사라짐
class Lightning extends Particle {
    constructor(position) {
        super(position);
        this.lifespan = 255;
        // 지그재그 꺾인 점들을 미리 만들어 둠
        this.points = [this.position.copy()];
        let p = this.position.copy();
        let bottom = random(height * 0.6, height);
        while (p.y < bottom) {
            p = createVector(p.x + random(-25, 25), p.y + random(10, 30));
            this.points.push(p);
        }
    }

    update() {
        this.lifespan -= 12;                          // 순식간에 사라짐
    }

    display() {
        // 깜빡이는 느낌을 위해 랜덤으로 밝기를 바꿈
        let flicker = random(0.6, 1);
        noFill();
        stroke(255, 255, 150, this.lifespan * flicker);
        strokeWeight(3);
        beginShape();
        for (let pt of this.points) vertex(pt.x, pt.y);
        endShape();
        // 가운데 하얀 심
        stroke(255, this.lifespan);
        strokeWeight(1);
        beginShape();
        for (let pt of this.points) vertex(pt.x, pt.y);
        endShape();
    }
}
