const { createCanvas } = require("canvas");
const fs = require("fs");

const width = 800;
const height = 400;
const canvas = createCanvas(width, height, "svg");
const ctx = canvas.getContext("2d");

const spaceship = { x: width / 2 - 20, y: height - 40, w: 40, h: 20 };
let aliens = [];
let bullets = [];

const colors = ["#00ffea", "#ff007a", "#ffd700", "#00ff00"];

// Buat alien acak
for (let i = 0; i < 10; i++) {
  aliens.push({
    x: Math.random() * (width - 20),
    y: Math.random() * 100 + 20,
    alive: true,
  });
}

// Simulasikan 1 frame animasi
function drawFrame() {
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, width, height);

  // Gambar pesawat
  ctx.fillStyle = "#00ffff";
  ctx.beginPath();
  ctx.moveTo(spaceship.x, spaceship.y);
  ctx.lineTo(spaceship.x + spaceship.w / 2, spaceship.y - 20);
  ctx.lineTo(spaceship.x + spaceship.w, spaceship.y);
  ctx.closePath();
  ctx.fill();

  // Gerakkan peluru
  bullets.forEach((b) => (b.y -= 10));

  // Deteksi tabrakan
  aliens.forEach((alien) => {
    bullets.forEach((b) => {
      if (
        alien.alive &&
        b.x > alien.x &&
        b.x < alien.x + 20 &&
        b.y > alien.y &&
        b.y < alien.y + 20
      ) {
        alien.alive = false;
      }
    });
  });

  // Gambar alien
  aliens.forEach((alien) => {
    if (alien.alive) {
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillRect(alien.x, alien.y, 20, 20);
    } else {
      // Spawn alien baru
      alien.x = Math.random() * (width - 20);
      alien.y = Math.random() * 100 + 20;
      alien.alive = true;
    }
  });

  // Gambar peluru
  ctx.fillStyle = "#ff3333";
  bullets.forEach((b) => ctx.fillRect(b.x, b.y, 3, 10));
}

// Tambah peluru dari pesawat
bullets.push({ x: spaceship.x + spaceship.w / 2 - 1, y: spaceship.y - 10 });

// Jalankan simulasi
drawFrame();

// Simpan jadi SVG
fs.writeFileSync("./dist/space-shooter.svg", canvas.toBuffer());
console.log("✅ Space Shooter SVG generated!");
