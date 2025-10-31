const fs = require("fs");

const width = 600;
const height = 400;
let svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <style>
    @keyframes shoot {
      0% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(-400px); opacity: 0; }
    }
    @keyframes alienMove {
      0% { transform: translateX(0); }
      50% { transform: translateX(40px); }
      100% { transform: translateX(0); }
    }
  </style>

  <rect width="${width}" height="${height}" fill="black"/>
  <g transform="translate(280, 350)">
    <polygon points="0,-20 20,20 -20,20" fill="lime" />
  </g>

  <!-- Peluru -->
  <circle cx="290" cy="330" r="4" fill="yellow">
    <animateTransform attributeName="transform" type="translate" from="0 0" to="0 -400" dur="2s" repeatCount="indefinite"/>
  </circle>

  <!-- Alien -->
  <g transform="translate(200, 100)">
    <rect width="20" height="20" fill="red">
      <animateTransform attributeName="transform" type="translate" values="0,0;40,0;0,0" dur="3s" repeatCount="indefinite"/>
    </rect>
  </g>
  <g transform="translate(300, 120)">
    <rect width="20" height="20" fill="red">
      <animateTransform attributeName="transform" type="translate" values="0,0;-40,0;0,0" dur="3s" repeatCount="indefinite"/>
    </rect>
  </g>
</svg>
`;

fs.writeFileSync("dist/space-shooter.svg", svg);
console.log("✅ Space Shooter SVG generated!");
