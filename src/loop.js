const FIXED_DT = 1 / 60;

export function createLoop({
  update,
  render,
  onStats,
}) {
  let previousTime = performance.now();
  let accumulator = 0;

  let steps = 0;
  let frames = 0;

  let statsTime = previousTime;

  function frame(currentTime) {
    const frameStart = performance.now();

    let frameDelta =
      (currentTime - previousTime) / 1000;

    previousTime = currentTime;

    // Захист від дуже великого delta
    frameDelta = Math.min(frameDelta, 0.25);

    accumulator += frameDelta;

    let stepsThisFrame = 0;

    while (accumulator >= FIXED_DT) {
      update(FIXED_DT);

      accumulator -= FIXED_DT;

      steps++;
      stepsThisFrame++;
    }

    const interpolation =
      accumulator / FIXED_DT;

    render(interpolation);

    frames++;

    const elapsed =
      currentTime - statsTime;

    if (elapsed >= 1000) {
      onStats({
        stepsPerSecond: steps,
        framesPerSecond: frames,
        frameTime: performance.now() - frameStart,
      });

      steps = 0;
      frames = 0;
      statsTime = currentTime;
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
