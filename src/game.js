import { integrate } from "./physics.js";
import { render, resizeCanvas } from "./render.js";
import { createLoop } from "./loop.js";
import { createInput } from "./input.js";

export function startGame() {
  const canvas =
    document.querySelector("#gameCanvas");

  const context =
    canvas.getContext("2d");

  const input = createInput();

  const arena = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const drone = {
    x: arena.width / 2,
    y: arena.height / 2,

    previousX: arena.width / 2,
    previousY: arena.height / 2,

    vx: 0,
    vy: 0,

    angle: 0,
  };

  function resize() {
    const size =
      resizeCanvas(canvas, context);

    arena.width = size.width;
    arena.height = size.height;
  }

  window.addEventListener("resize", resize);

  resize();

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      drone.x = arena.width / 2;
      drone.y = arena.height / 2;

      drone.previousX = drone.x;
      drone.previousY = drone.y;

      drone.vx = 0;
      drone.vy = 0;
    }
  });

  function update(dt) {
    drone.previousX = drone.x;
    drone.previousY = drone.y;

    integrate(
      drone,
      input,
      dt,
      arena,
    );
  }

  function draw(interpolation) {
    render(
      context,
      drone,
      arena,
      interpolation,
    );
  }

  createLoop({
    update,
    render: draw,

    onStats(stats) {
      document.querySelector("#steps").textContent =
        stats.stepsPerSecond;

      document.querySelector("#fps").textContent =
        stats.framesPerSecond;

      document.querySelector("#frameTime").textContent =
        stats.frameTime.toFixed(2);
    },
  });
}
