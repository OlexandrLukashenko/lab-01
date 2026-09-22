export function integrate(drone, input, dt, arena) {
  const acceleration = 900;
  const friction = 0.92;
  const maxSpeed = 700;

  let ax = 0;
  let ay = 0;

  if (input.isPressed("w") || input.isPressed("arrowup")) {
    ay -= acceleration;
  }

  if (input.isPressed("s") || input.isPressed("arrowdown")) {
    ay += acceleration;
  }

  if (input.isPressed("a") || input.isPressed("arrowleft")) {
    ax -= acceleration;
  }

  if (input.isPressed("d") || input.isPressed("arrowright")) {
    ax += acceleration;
  }

  drone.vx += ax * dt;
  drone.vy += ay * dt;

  drone.vx *= Math.pow(friction, dt * 60);
  drone.vy *= Math.pow(friction, dt * 60);

  const speed = Math.sqrt(
    drone.vx * drone.vx + drone.vy * drone.vy,
  );

  if (speed > maxSpeed) {
    const scale = maxSpeed / speed;

    drone.vx *= scale;
    drone.vy *= scale;
  }

  drone.x += drone.vx * dt;
  drone.y += drone.vy * dt;

  // Wrap-around по горизонталі
  if (drone.x < 0) {
    drone.x = arena.width;
  }

  if (drone.x > arena.width) {
    drone.x = 0;
  }

  // Wrap-around по вертикалі
  if (drone.y < 0) {
    drone.y = arena.height;
  }

  if (drone.y > arena.height) {
    drone.y = 0;
  }

  if (Math.abs(drone.vx) > 1 || Math.abs(drone.vy) > 1) {
    drone.angle = Math.atan2(drone.vy, drone.vx);
  }
}
