import { useEffect, useRef } from "react";

const center = { x: 0.5, y: 0.475 };
const orbits = [
  {
    major: 0.396, minor: 0.175, angle: Math.PI / 5.65,
    colors: ["#c2a272", "#f0d9ad", "#c3a575"], glow: "rgba(235, 195, 130, 0.5)",
    nodes: [3.22],
  },
  {
    major: 0.396, minor: 0.175, angle: Math.PI - Math.PI / 5.65,
    colors: ["#76a7ad", "#c0dcdb", "#8ab7bc"], glow: "rgba(122, 211, 218, 0.46)",
    nodes: [3.25],
  },
  {
    major: 0.353, minor: 0.205, angle: -Math.PI / 2,
    colors: ["#6f94a4", "#b0cdd5", "#698c9d"], glow: "rgba(126, 179, 198, 0.47)",
    nodes: [Math.PI],
  },
];

function pointOnOrbit(orbit, phase) {
  const x = orbit.major * Math.cos(phase);
  const y = orbit.minor * Math.sin(phase);
  return {
    x: center.x + x * Math.cos(orbit.angle) - y * Math.sin(orbit.angle),
    y: center.y + x * Math.sin(orbit.angle) + y * Math.cos(orbit.angle),
  };
}

function makeOrbitStroke(ctx, orbit) {
  const start = pointOnOrbit(orbit, Math.PI);
  const end = pointOnOrbit(orbit, 0);
  const line = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
  orbit.colors.forEach((color, index) => line.addColorStop(index / 2, color));

  const path = new Path2D();
  path.ellipse(center.x, center.y, orbit.major, orbit.minor, orbit.angle, 0, Math.PI * 2);
  return { path, line, glow: orbit.glow };
}

function drawOrbitNodes(ctx, orbit, pixels) {
  for (const phase of orbit.nodes) {
    const { x, y } = pointOnOrbit(orbit, phase);
    const radius = 0.0105;
    const fill = ctx.createRadialGradient(x - 0.003, y - 0.003, 0, x, y, radius);
    fill.addColorStop(0, "#fff8e7");
    fill.addColorStop(0.4, orbit.colors[1]);
    fill.addColorStop(1, orbit.colors[0]);
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.shadowColor = orbit.glow;
    ctx.shadowBlur = pixels * 0.022;
    ctx.fill();
    ctx.restore();
  }
}

export function OrbitPaths() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let resolution;

    function draw() {
      const width = canvas.getBoundingClientRect().width;
      if (!width) return;
      const pixels = Math.ceil(width * window.devicePixelRatio);
      if (canvas.width === pixels && canvas.height === pixels) return;
      canvas.width = pixels;
      canvas.height = pixels;
      ctx.setTransform(pixels, 0, 0, pixels, 0, 0);

      // A restrained ring around the group mark suggests the nucleus.
      ctx.beginPath();
      ctx.arc(0.5, 0.505, 0.104, 0, Math.PI * 2);
      ctx.lineWidth = 0.0018;
      ctx.strokeStyle = "rgba(163, 199, 205, 0.36)";
      ctx.stroke();

      const strokes = orbits.map(orbit => makeOrbitStroke(ctx, orbit));
      ctx.save();
      ctx.lineWidth = 0.0038;
      ctx.shadowBlur = pixels * 0.015;
      for (const { path, line, glow } of strokes) {
        ctx.strokeStyle = line;
        ctx.shadowColor = glow;
        ctx.stroke(path);
      }
      ctx.restore();

      // Draw every sharp centerline above the glows, including at crossings.
      ctx.lineWidth = 0.0042;
      for (const { path, line } of strokes) {
        ctx.strokeStyle = line;
        ctx.stroke(path);
      }
      for (const orbit of orbits) drawOrbitNodes(ctx, orbit, pixels);
    }

    function watchResolution() {
      resolution = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      resolution.addEventListener("change", watchResolution, { once: true });
      draw();
    }

    watchResolution();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    window.addEventListener("resize", draw);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", draw);
      resolution.removeEventListener("change", watchResolution);
    };
  }, []);

  return <canvas ref={canvasRef} className="orbit-paths" aria-hidden="true" />;
}
