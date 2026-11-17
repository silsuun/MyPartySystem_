// 어두운 하늘 배경 + 천천히 흘러가는 먹구름

// 위는 거의 검은 남색, 아래로 갈수록 탁한 회청색이 되는 그라데이션
// 매 프레임 다시 계산하지 않도록 setup()에서 한 번만 그려 둠
function makeSkyGradient(w, h) {
    let g = createGraphics(w, h);
    let top = color(10, 12, 22);
    let bottom = color(45, 50, 62);
    for (let y = 0; y < h; y++) {
        g.stroke(lerpColor(top, bottom, y / h));
        g.line(0, y, w, y);
    }
    return g;
}

// 먹구름 한 덩어리: 겹쳐진 타원(puff) 여러 개로 이루어짐
class Cloud {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = random(0.1, 0.4);
        this.shade = random(30, 60);   // 구름마다 어두운 정도가 다름
        this.puffs = [];
        let count = floor(random(6, 10));
        for (let i = 0; i < count; i++) {
            this.puffs.push({
                dx: random(-90, 90),
                dy: random(-20, 20),
                w: random(80, 160),
                h: random(50, 90),
            });
        }
    }

    update() {
        this.x += this.speed;
        // 오른쪽 끝으로 나가면 왼쪽에서 다시 들어옴
        if (this.x - 180 > width) this.x = -180;
    }

    // flash: 번개가 칠 때 구름이 밝게 비침 (0 ~ 255)
    display(flash) {
        noStroke();
        let c = this.shade + flash * 0.5;
        for (let p of this.puffs) {
            fill(c, c, c + 8, 230);
            ellipse(this.x + p.dx, this.y + p.dy, p.w, p.h);
        }
    }
}
