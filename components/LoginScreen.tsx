import React, { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import type { StudentProfile } from '../types';

interface LoginScreenProps {
  currentUser: User | null;
  onLogin: () => void;
  onGuestPlay: () => void;
  onLogout: () => void;
  onOpenGameMaster?: () => void;
  socialPoints: number;
  playerLevel: number;
  studentProfile: StudentProfile | null;
  onStudentProfileSet: (profile: StudentProfile) => void;
}

const GRADES = [1, 2, 3];
const CLASSES = Array.from({ length: 10 }, (_, i) => i + 1);
const NUMBERS = Array.from({ length: 45 }, (_, i) => i + 1);

// ── 兵籍登録 ──────────────────────────────────────────────────────────────
const ProfileSetup: React.FC<{
  onSubmit: (p: StudentProfile) => void;
}> = ({ onSubmit }) => {
  const [grade, setGrade] = useState(2);
  const [cls, setCls] = useState(1);
  const [num, setNum] = useState(1);

  const handleSubmit = () => {
    onSubmit({
      grade,
      classNum: cls,
      number: num,
      displayLabel: `${grade}年${cls}組${num}番`,
    });
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.35em] font-bold mb-2" style={{ color: '#C8962A' }}>
            兵　籍　登　録
          </p>
          <h2 className="text-5xl font-black text-hologram">武将名簿</h2>
          <p className="text-sm mt-2" style={{ color: '#A08C5A' }}>学年・組・番号を定めよ</p>
        </div>

        <div className="hud-panel rounded-2xl p-7 space-y-6" style={{ border: '1px solid rgba(180,130,20,0.3)' }}>
          {/* 学年 */}
          <div>
            <label className="block text-[11px] tracking-[0.3em] font-bold mb-3" style={{ color: '#C8962A' }}>
              学　年
            </label>
            <div className="grid grid-cols-3 gap-3">
              {GRADES.map(g => (
                <button
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`py-4 rounded-xl text-xl font-black transition-all duration-200 ${
                    grade === g
                      ? 'btn-tactical scale-105'
                      : 'bg-slate-800/60 border border-slate-700 hover:border-yellow-700/50 hover:text-white'
                  }`}
                  style={grade !== g ? { color: '#6B5A3A' } : {}}
                >
                  {g}年
                </button>
              ))}
            </div>
          </div>

          {/* 組 */}
          <div>
            <label className="block text-[11px] tracking-[0.3em] font-bold mb-3" style={{ color: '#C8962A' }}>
              組
            </label>
            <div className="grid grid-cols-5 gap-2">
              {CLASSES.map(c => (
                <button
                  key={c}
                  onClick={() => setCls(c)}
                  className={`py-3 rounded-lg text-base font-bold transition-all duration-200 ${
                    cls === c
                      ? 'btn-tactical scale-105'
                      : 'bg-slate-800/60 border border-slate-700 hover:border-yellow-700/50 hover:text-white'
                  }`}
                  style={cls !== c ? { color: '#6B5A3A' } : {}}
                >
                  {c}組
                </button>
              ))}
            </div>
          </div>

          {/* 出席番号 */}
          <div>
            <label className="block text-[11px] tracking-[0.3em] font-bold mb-3" style={{ color: '#C8962A' }}>
              出席番号
            </label>
            <div className="grid grid-cols-9 gap-1.5 max-h-36 overflow-y-auto pr-1">
              {NUMBERS.map(n => (
                <button
                  key={n}
                  onClick={() => setNum(n)}
                  className={`py-2 rounded text-sm font-bold transition-all duration-150 ${
                    num === n
                      ? 'btn-tactical'
                      : 'bg-slate-800/60 border border-slate-700 hover:border-yellow-700/50 hover:text-white'
                  }`}
                  style={num !== n ? { color: '#5A4A2A' } : {}}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* 確定 */}
          <div className="pt-3" style={{ borderTop: '1px solid rgba(180,130,20,0.2)' }}>
            <div className="text-center mb-4">
              <p className="text-[11px] mb-1" style={{ color: '#6B5A3A' }}>選択</p>
              <p className="text-2xl font-black" style={{ fontFamily: "'Noto Serif JP', serif", color: '#D4AF37' }}>
                {grade}年{cls}組{num}番
              </p>
            </div>
            <button
              onClick={handleSubmit}
              className="btn-tactical w-full py-4 rounded-xl text-lg font-black tracking-[0.25em]"
            >
              確　定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── 入城画面 ──────────────────────────────────────────────────────────────
const LoginScreen: React.FC<LoginScreenProps> = ({
  currentUser, onLogin, onGuestPlay, onLogout, onOpenGameMaster,
  socialPoints, playerLevel, studentProfile, onStudentProfileSet,
}) => {
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  useEffect(() => {
    if (currentUser && !studentProfile) setShowProfileSetup(true);
  }, [currentUser, studentProfile]);

  const handleProfileSubmit = (profile: StudentProfile) => {
    onStudentProfileSet(profile);
    setShowProfileSetup(false);
  };

  if (currentUser && (showProfileSetup || !studentProfile)) {
    return <ProfileSetup onSubmit={handleProfileSubmit} />;
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-3 sm:p-4 lg:p-8 overflow-y-auto">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-6 lg:gap-12 animate-slide-up py-2">

        {/* ── LEFT: ブランディング ── */}
        <div className="flex-1 text-center lg:text-left">
          {/* 眉書き */}
          <p className="text-xs tracking-[0.45em] font-bold mb-4" style={{ fontFamily: "'Noto Serif JP', serif", color: '#C8962A' }}>
            歴史問答合戦
          </p>

          {/* タイトル */}
          <div className="flex items-baseline gap-4 lg:justify-start justify-center mb-3">
            <h1 className="leading-none font-black"
                style={{
                  fontFamily: "'Noto Serif JP', serif",
                  fontSize: 'clamp(3.2rem,9vw,6.5rem)',
                  color: '#D4AF37',
                  letterSpacing: '0.12em',
                  textShadow: '0 0 40px rgba(180,130,20,0.5)',
                }}>
              天　下
            </h1>
            <h1 className="leading-none font-black"
                style={{
                  fontFamily: "'Noto Serif JP', serif",
                  fontSize: 'clamp(3.2rem,9vw,6.5rem)',
                  color: '#F0C040',
                  letterSpacing: '0.12em',
                  textShadow: '0 0 40px rgba(220,180,40,0.5)',
                }}>
              戦　記
            </h1>
          </div>
          <div className="flex items-center gap-3 lg:justify-start justify-center mb-4">
            <div className="h-px w-8 rounded-full" style={{ background: 'rgba(180,130,20,0.5)' }} />
            <span className="text-[10px] font-bold tracking-[0.3em]" style={{ color: '#8B6914' }}>
              BATTLE SOCIAL
            </span>
            <div className="h-px w-8 rounded-full" style={{ background: 'rgba(180,130,20,0.5)' }} />
          </div>

          {/* キャッチコピー */}
          <p className="text-sm sm:text-base font-bold tracking-wide mb-1" style={{ fontFamily: "'Noto Serif JP', serif", color: '#C8962A' }}>
            歴史で戦え。覇者の名を刻め。
          </p>
          <p className="text-xs sm:text-sm tracking-wider" style={{ color: '#6B5A3A' }}>
            天下の強者と相まみえよ
          </p>

          {/* 特徴バッジ */}
          <div className="flex flex-wrap gap-2 mt-4 sm:mt-5 justify-center lg:justify-start">
            {[
              { label: '合　戦',   color: '#C8962A' },
              { label: '修　行',   color: '#D4AF37' },
              { label: '組合戦',   color: '#C8962A' },
              { label: '天下番付', color: '#D4AF37' },
            ].map(f => (
              <span key={f.label}
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  fontFamily: "'Noto Serif JP', serif",
                  borderColor: `${f.color}50`,
                  border: `1px solid ${f.color}50`,
                  color: f.color,
                  background: `${f.color}12`,
                  letterSpacing: '0.08em',
                }}
              >
                {f.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT: 入城パネル ── */}
        <div className="w-full sm:w-96 lg:w-80 xl:w-96 flex-shrink-0">
          <div className="hud-panel rounded-2xl p-7 shadow-2xl"
               style={{ boxShadow: '0 0 40px rgba(140,100,10,0.22), 0 8px 32px rgba(0,0,0,0.75)' }}>

            {currentUser ? (
              /* === 入城済み === */
              <div className="flex flex-col gap-5">
                {/* 武将情報 */}
                <div className="flex items-center gap-3 p-3 rounded-xl"
                     style={{ background: 'rgba(180,130,20,0.08)', border: '1px solid rgba(180,130,20,0.25)' }}>
                  {currentUser.photoURL && (
                    <img src={currentUser.photoURL} alt=""
                         className="w-14 h-14 rounded-full"
                         style={{ border: '2px solid #C8962A', boxShadow: '0 0 12px rgba(180,130,20,0.45)' }} />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold tracking-wider mb-0.5" style={{ color: '#C8962A' }}>武将</p>
                    <p className="text-base font-black text-white truncate">{currentUser.displayName}</p>
                    {studentProfile && (
                      <p className="text-xs mt-0.5" style={{ color: '#C8962A' }}>
                        {studentProfile.displayLabel}
                        <button onClick={() => setShowProfileSetup(true)}
                                className="ml-2 hover:text-yellow-400 transition-colors"
                                style={{ color: '#6B5A3A' }}>
                          【変更】
                        </button>
                      </p>
                    )}
                  </div>
                </div>

                {/* ステータス */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="stat-badge text-center">
                    <p className="text-[10px] font-bold tracking-wider" style={{ color: '#C8962A' }}>段　位</p>
                    <p className="text-2xl font-black" style={{ fontFamily: "'Noto Serif JP', serif", color: '#D4AF37' }}>{playerLevel}</p>
                  </div>
                  <div className="stat-badge text-center">
                    <p className="text-[10px] font-bold tracking-wider" style={{ color: '#C8962A' }}>功　績</p>
                    <p className="text-2xl font-black" style={{ fontFamily: "'Noto Serif JP', serif", color: '#D4AF37' }}>{socialPoints.toLocaleString()}</p>
                  </div>
                </div>

                {/* 出陣ボタン */}
                <button onClick={onGuestPlay}
                        className="btn-orange w-full py-4 rounded-xl text-lg font-black tracking-[0.2em]">
                  出　陣
                </button>

                {/* サブアクション */}
                <div className="flex gap-3">
                  {onOpenGameMaster && (
                    <button onClick={onOpenGameMaster}
                            className="flex-1 py-2 rounded-lg text-sm font-bold transition-colors"
                            style={{ color: '#C87070', border: '1px solid rgba(180,60,60,0.45)', fontFamily: "'Noto Serif JP', serif" }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(139,26,26,0.18)')}
                            onMouseLeave={e => (e.currentTarget.style.background = '')}>
                      城　主
                    </button>
                  )}
                  <button onClick={onLogout}
                          className="flex-1 py-2 rounded-lg text-sm font-bold transition-colors"
                          style={{ color: '#6B5A3A', border: '1px solid rgba(100,80,30,0.4)', fontFamily: "'Noto Serif JP', serif" }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(30,22,8,0.6)')}
                          onMouseLeave={e => (e.currentTarget.style.background = '')}>
                    退　城
                  </button>
                </div>
              </div>
            ) : (
              /* === 未入城 === */
              <div className="flex flex-col gap-5">
                <div className="text-center">
                  <p className="text-sm font-bold mb-1" style={{ fontFamily: "'Noto Serif JP', serif", color: '#EDE0C4' }}>
                    参陣して歴史の覇者となれ
                  </p>
                  <p className="text-xs" style={{ color: '#6B5A3A' }}>天下番付・合戦・組合戦に参加できる</p>
                </div>

                {/* Google 参陣 */}
                <button onClick={onLogin}
                        className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-black py-3.5 px-6 rounded-xl hover:bg-gray-50 transition-all hover:-translate-y-0.5 shadow-lg font-sans text-base">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Googleで参陣
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px" style={{ background: 'rgba(180,130,20,0.2)' }} />
                  <span className="text-xs" style={{ color: '#6B5A3A' }}>または</span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(180,130,20,0.2)' }} />
                </div>

                <button onClick={onGuestPlay}
                        className="btn-tactical w-full py-3 rounded-xl text-sm font-bold tracking-[0.2em]">
                  客将として参る
                </button>
                <p className="text-[10px] text-center -mt-2" style={{ color: '#4A3A1A' }}>
                  ※ 客将は武勲が記録されぬ
                </p>
              </div>
            )}
          </div>

          {/* 金の光点 */}
          <div className="flex justify-center mt-5">
            <div className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: '#C8962A' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
