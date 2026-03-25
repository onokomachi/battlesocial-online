import React from 'react';

interface Props {
  /** 動画の不透明度。トップ画面: 0.7、メニュー画面: 0.3 */
  opacity: number;
}

const VideoBackground: React.FC<Props> = ({ opacity }) => (
  <div className="fixed inset-0 z-0 overflow-hidden" style={{ background: '#0A0805' }}>
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      style={{ opacity }}
    >
      <source src="/movie/mov1.mp4" type="video/mp4" />
    </video>
    {/* UI可読性確保のための暗いオーバーレイ */}
    <div className="absolute inset-0" style={{ background: 'rgba(8,6,3,0.42)' }} />
  </div>
);

export default VideoBackground;
