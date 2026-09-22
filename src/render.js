export function resizeCanvas(canvas, context) {
  const dpr = window.devicePixelRatio || 1;

  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  context.setTransform(dpr, 0, 0, dpr, 0, 0);

  return {
    width,
    height,
  };
}

function drawBackground(context, width, height) {
  context.fillStyle = "#07111f";
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(255, 255, 255, 0.05)";
  context.lineWidth = 1;

  const gridSize = 50;

  for (let x = 0; x < width; x += gridSize) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = 0; y < height; y += gridSize) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
}

function drawDrone(context, drone, interpolation) {
  const x =
    drone.previousX +
    (drone.x - drone.previousX) * interpolation;

  const y =
    drone.previousY +
    (drone.y - drone.previousY) * interpolation;

  context.save();

  context.translate(x, y);
  context.rotate(drone.angle);

  // Тінь
  context.fillStyle = "rgba(0, 0, 0, 0.35)";
  context.beginPath();
  context.ellipse(0, 8, 35, 12, 0, 0, Math.PI * 2);
  context.fill();

  // Пропелери
  context.strokeStyle = "#8be9fd";
  context.lineWidth = 4;

  const motors = [
    [-25, -16],
    [25, -16],
    [-25, 16],
    [25, 16],
  ];

  for (const [mx, my] of motors) {
    context.beginPath();
    context.arc(mx, my, 11, 0, Math.PI * 2);
    context.stroke();
  }

  // Промені
  context.strokeStyle = "#e6edf3";
  context.lineWidth = 7;
  context.lineCap = "round";

  context.beginPath();
  context.moveTo(-25, -16);
  context.lineTo(25, 16);
  context.moveTo(25, -16);
  context.lineTo(-25, 16);
  context.stroke();

  // Корпус
  context.fillStyle = "#5865f2";

  context.beginPath();
  context.moveTo(22, 0);
  context.lineTo(-15, -13);
  context.lineTo(-22, 0);
  context.lineTo(-15, 13);
  context.closePath();
  context.fill();

  // Камера
  context.fillStyle = "#111827";

  context.beginPath();
  context.arc(15, 0, 6, 0, Math.PI * 2);
  context.fill();

  context.restore();
}

export function render(context, drone, arena, interpolation) {
  context.clearRect(0, 0, arena.width, arena.height);

  drawBackground(
    context,
    arena.width,
    arena.height,
  );

  drawDrone(
    context,
    drone,
    interpolation,
  );
}
