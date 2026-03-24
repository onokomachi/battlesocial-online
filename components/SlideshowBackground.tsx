import React, { useState, useEffect } from 'react';

const IMAGES = [
  '/Image/bg/bg1.png',
  '/Image/bg/bg2.png',
  '/Image/bg/bg3.png',
  '/Image/bg/bg4.png',
  '/Image/bg/bg5.png',
];

const DISPLAY_MS = 3000; // 3秒表示
const FADE_MS    = 1000; // 1秒フェード

interface Props {
  /** 画像の不透明度。トップ画面: 0.7、メニュー画面: 0.3 */
  opacity: number;
}

const SlideshowBackground: React.FC<Props> = ({ opacity }) => {
  const [current, setCurrent]       = useState(0);
  const [transitioning, setTrans]   = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setTrans(true);
      setTimeout(() => {
        setCurrent(c => (c + 1) % IMAGES.length);
        setTrans(false);
      }, FADE_MS);
    }, DISPLAY_MS + FADE_MS);

    return () => clearInterval(id);
  }, []);

  const next = (current + 1) % IMAGES.length;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ background: '#081628' }}>
      {/* 現在の画像: フェードアウト */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${IMAGES[current]})`,
          opacity: transitioning ? 0 : opacity,
          transition: transitioning ? `opacity ${FADE_MS}ms ease-in-out` : 'none',
        }}
      />
      {/* 次の画像: フェードイン */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${IMAGES[next]})`,
          opacity: transitioning ? opacity : 0,
          transition: transitioning ? `opacity ${FADE_MS}ms ease-in-out` : 'none',
        }}
      />
      {/* UI可読性確保のための暗いオーバーレイ */}
      <div className="absolute inset-0" style={{ background: 'rgba(8,22,40,0.38)' }} />
    </div>
  );
};

export default SlideshowBackground;
