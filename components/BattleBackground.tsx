import React, { useEffect, useRef } from 'react';

/**
 * BattleBackground — 戦闘画面専用のダークエンバー背景
 * 火の粉が舞い上がる演出。画像なしでバトルの緊張感を表現。
 */

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  colorIdx: number;
}

const EMBER_COLORS = [
  'rgba(249,115,22',  // orange
  'rgba(239,68,68',   // red
  'rgba(251,191,36',  // amber
  'rgba(220,38,38',   // dark red
];

const BattleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    const embers: Ember[] = [];

    const spawnEmber = (randomY = false): Ember => ({
      x:        Math.random() * W,
      y:        randomY ? Math.random() * H : H + 10,
      vx:       (Math.random() - 0.5) * 1.2,
      vy:       -(0.8 + Math.random() * 1.8),
      life:     0,
      maxLife:  70 + Math.random() * 90,
      size:     0.8 + Math.random() * 2.8,
      colorIdx: Math.floor(Math.random() * EMBER_COLORS.length),
    });

    // 初期分散
    for (let i = 0; i < 60; i++) {
      const e = spawnEmber(true);
      e.life = Math.random() * e.maxLife;
      embers.push(e);
    }

    const drawBase = () => {
      // ベース: 深い暗黒
      ctx.fillStyle = '#06060F';
      ctx.fillRect(0, 0, W, H);

      // 下部から赤いグロー
      const glow = ctx.createRadialGradient(W * 0.5, H, 0, W * 0.5, H, H * 0.85);
      glow.addColorStop(0,   'rgba(160,20,10,0.45)');
      glow.addColorStop(0.5, 'rgba(90,10,5,0.2)');
      glow.addColorStop(1,   'rgba(6,6,15,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // 中央縦方向の薄いオレンジグロー
      const midGlow = ctx.createRadialGradient(W * 0.5, H * 0.6, 0, W * 0.5, H * 0.6, W * 0.5);
      midGlow.addColorStop(0,   'rgba(180,60,10,0.12)');
      midGlow.addColorStop(1,   'rgba(6,6,15,0)');
      ctx.fillStyle = midGlow;
      ctx.fillRect(0, 0, W, H);
    };

    let animId: number;
    let paused = false;
    let frame  = 0;

    const animate = () => {
      if (paused) return;
      frame++;

      // バックグラウンドを少しずつ上書き（軌跡効果）
      ctx.fillStyle = 'rgba(6,6,15,0.18)';
      ctx.fillRect(0, 0, W, H);

      // 60フレームごとにベースを再描画（グロー維持）
      if (frame % 60 === 0) drawBase();

      // 新しいエンバーをスポーン
      if (embers.length < 90 && Math.random() < 0.4) {
        embers.push(spawnEmber());
      }

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.life++;
        // 揺れながら上昇
        e.x += e.vx + Math.sin(e.life * 0.07 + i) * 0.25;
        e.y += e.vy;

        const lifeRatio = e.life / e.maxLife;
        const alpha = Math.sin(lifeRatio * Math.PI) * 0.85;

        // コア
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = `${EMBER_COLORS[e.colorIdx]},${alpha})`;
        ctx.fill();

        // 淡いグロー
        if (e.size > 1.5) {
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `${EMBER_COLORS[e.colorIdx]},${alpha * 0.15})`;
          ctx.fill();
        }

        if (e.life >= e.maxLife || e.y < -20) {
          embers.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(animate);
    };

    drawBase();
    animId = requestAnimationFrame(animate);

    const handleVisibility = () => {
      if (document.hidden) {
        paused = true;
        cancelAnimationFrame(animId);
      } else {
        paused = false;
        animId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
      drawBase();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default BattleBackground;
