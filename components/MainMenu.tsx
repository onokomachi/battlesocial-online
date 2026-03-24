import React from 'react';
import type { GameState, DailyQuestDef } from '../types';
import type { User } from 'firebase/auth';

interface MainMenuProps {
  onSelectMode: (mode: GameState) => void;
  playerLevel: number;
  playerExp: number;
  expForNextLevel: number;
  user?: User | null;
  socialPoints?: number;
  onLogout?: () => void;
  onOpenRanking?: () => void;
  loginStreak?: number;
  onOpenQuests?: () => void;
  onOpenLoginBonus?: () => void;
  canAccessGameMaster?: boolean;
  onOpenGameMaster?: () => void;
  dailyQuestDefs?: DailyQuestDef[];
  dailyQuestProgress?: Record<string, number>;
  dailyQuestDone?: Set<string>;
  onOpenClassBattle?: () => void;
  hasStudentProfile?: boolean;
  srsReviewCount?: number;
  onOpenWeakness?: () => void;
  onOpenItemShop?: () => void;
  equippedTitleName?: string | null;
}

// ── 漢字バッジアイコン ──────────────────────────────────────────────────
const KanjiIcon: React.FC<{ kanji: string; color: string }> = ({ kanji, color }) => (
  <span className="text-xl sm:text-2xl font-black leading-none select-none"
        style={{ fontFamily: "'Noto Serif JP', serif", color, letterSpacing: '0.02em' }}>
    {kanji}
  </span>
);

// ── 頂上バー ────────────────────────────────────────────────────────────
const TopBar: React.FC<{
  user: User | null | undefined;
  socialPoints: number | undefined;
  loginStreak: number | undefined;
  onLogout: (() => void) | undefined;
  onOpenLoginBonus: (() => void) | undefined;
  onOpenRanking: (() => void) | undefined;
  onOpenQuests: (() => void) | undefined;
  onOpenWeakness: (() => void) | undefined;
  onOpenItemShop: (() => void) | undefined;
  onOpenClassBattle: (() => void) | undefined;
  hasStudentProfile: boolean | undefined;
  canAccessGameMaster: boolean | undefined;
  onOpenGameMaster: (() => void) | undefined;
  equippedTitleName: string | null | undefined;
}> = ({
  user, socialPoints, loginStreak, onLogout, onOpenLoginBonus,
  onOpenRanking, onOpenQuests, onOpenWeakness, onOpenItemShop,
  onOpenClassBattle, hasStudentProfile, canAccessGameMaster, onOpenGameMaster,
  equippedTitleName,
}) => (
  <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 border-b flex-shrink-0"
       style={{ borderColor: 'rgba(180,130,20,0.22)', background: 'rgba(8,6,3,0.92)', backdropFilter: 'blur(12px)' }}>
    {/* 家紋ロゴ */}
    <div className="flex items-center gap-2 min-w-0">
      <span className="text-xl sm:text-2xl font-black whitespace-nowrap"
            style={{ fontFamily: "'Noto Serif JP', serif", color: '#D4AF37', letterSpacing: '0.12em',
                     textShadow: '0 0 20px rgba(180,130,20,0.4)' }}>
        天下戦記
      </span>
      {equippedTitleName && (
        <span className="hidden md:inline text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0"
              style={{ color: '#C8962A', background: 'rgba(180,130,20,0.12)', border: '1px solid rgba(180,130,20,0.3)',
                       fontFamily: "'Noto Serif JP', serif" }}>
          {equippedTitleName}
        </span>
      )}
    </div>

    {/* 右側アクション */}
    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
      {socialPoints !== undefined && (
        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg"
             style={{ background: 'rgba(180,130,20,0.15)', border: '1px solid rgba(180,130,20,0.38)' }}>
          <span className="text-[10px] font-black" style={{ color: '#C8962A', fontFamily: "'Noto Serif JP', serif" }}>功</span>
          <span className="text-sm font-black" style={{ color: '#D4AF37' }}>{socialPoints.toLocaleString()}</span>
        </div>
      )}
      {loginStreak !== undefined && loginStreak >= 1 && (
        <button onClick={onOpenLoginBonus}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-white text-xs font-black hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg,#C8962A,#8B1A1A)', boxShadow: '0 2px 8px rgba(139,26,26,0.45)' }}>
          🔥{loginStreak}
        </button>
      )}
      {[
        onOpenRanking  && { label: '天下番付', fn: onOpenRanking },
        onOpenQuests && user && { label: '軍　命', fn: onOpenQuests },
        onOpenWeakness && { label: '弱　点', fn: onOpenWeakness },
        onOpenItemShop && { label: '装　備', fn: onOpenItemShop },
        onOpenClassBattle && user && hasStudentProfile && { label: '組合戦', fn: onOpenClassBattle, gold: true },
      ].filter(Boolean).map((item: any) => item && (
        <button key={item.label} onClick={item.fn}
                className={`hidden md:block px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105`}
                style={{
                  fontFamily: "'Noto Serif JP', serif",
                  color: item.gold ? '#D4AF37' : '#C8962A',
                  border: item.gold
                    ? '1px solid rgba(212,175,55,0.4)'
                    : '1px solid rgba(180,130,20,0.3)',
                  letterSpacing: '0.06em',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(50,35,5,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.background = '')}>
          {item.label}
        </button>
      ))}
      {canAccessGameMaster && onOpenGameMaster && (
        <button onClick={onOpenGameMaster}
                className="p-1.5 rounded-lg border transition-colors"
                style={{ color: '#6B5A3A', borderColor: 'rgba(100,80,30,0.4)' }}
                title="城内管理"
                onMouseEnter={e => (e.currentTarget.style.color = '#C8962A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6B5A3A')}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      )}
      {user && onLogout && (
        <button onClick={onLogout}
                className="px-2 py-1.5 rounded-lg text-xs font-bold transition-colors"
                style={{ color: '#6B5A3A', border: '1px solid rgba(100,80,30,0.35)', fontFamily: "'Noto Serif JP', serif" }}
                onMouseEnter={e => (e.currentTarget.style.color = '#EDE0C4')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6B5A3A')}>
          退城
        </button>
      )}
    </div>
  </div>
);

// ── 武将カード ──────────────────────────────────────────────────────────
const PlayerCard: React.FC<{
  user: User | null | undefined;
  playerLevel: number;
  playerExp: number;
  expForNextLevel: number;
  socialPoints: number | undefined;
  loginStreak: number | undefined;
  dailyQuestDefs: DailyQuestDef[] | undefined;
  dailyQuestProgress: Record<string, number> | undefined;
  dailyQuestDone: Set<string> | undefined;
  onOpenQuests: (() => void) | undefined;
  onOpenLoginBonus: (() => void) | undefined;
  onSelectMode: (mode: GameState) => void;
}> = ({
  user, playerLevel, playerExp, expForNextLevel, socialPoints, loginStreak,
  dailyQuestDefs, dailyQuestProgress, dailyQuestDone, onOpenQuests, onOpenLoginBonus,
  onSelectMode,
}) => {
  const expPct = Math.min(100, (playerExp / expForNextLevel) * 100);
  return (
    <div className="flex flex-col gap-3 h-full">
      {/* 武将証 */}
      <div className="hud-panel rounded-2xl p-4 relative overflow-hidden flex-shrink-0">
        {/* 金の上線 */}
        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
             style={{ background: 'linear-gradient(90deg, #8B6914, #D4AF37, #8B6914)' }} />

        {user ? (
          <div className="flex items-center gap-3 mt-1">
            {user.photoURL ? (
              <div className="relative flex-shrink-0">
                <img src={user.photoURL} alt=""
                     className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                     style={{ border: '2px solid #C8962A', boxShadow: '0 0 14px rgba(180,130,20,0.45)' }} />
                <div className="absolute -bottom-1 -right-1 text-[10px] font-black px-1 py-0.5 rounded-full leading-none"
                     style={{ background: '#8B6914', color: '#F0C040', fontFamily: "'Noto Serif JP', serif" }}>
                  {playerLevel}
                </div>
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                   style={{ background: 'rgba(180,130,20,0.18)', border: '2px solid #C8962A' }}>
                <span className="text-xl font-black" style={{ color: '#D4AF37' }}>{playerLevel}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-black text-white truncate">{user.displayName}</p>
              <p className="text-[10px] font-bold tracking-wider" style={{ color: '#C8962A', fontFamily: "'Noto Serif JP', serif" }}>武将</p>
              {socialPoints !== undefined && (
                <p className="text-xs sm:text-sm font-black" style={{ color: '#D4AF37', fontFamily: "'Noto Serif JP', serif" }}>
                  功 {socialPoints.toLocaleString()}
                </p>
              )}
            </div>
            {loginStreak !== undefined && loginStreak >= 1 && (
              <button onClick={onOpenLoginBonus}
                      className="flex-shrink-0 px-2 py-1.5 rounded-lg text-white text-xs font-black hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg,#C8962A,#8B1A1A)', boxShadow: '0 2px 8px rgba(139,26,26,0.45)' }}>
                🔥{loginStreak}
              </button>
            )}
          </div>
        ) : (
          <div className="text-center py-1 mt-1">
            <p className="text-xl font-black" style={{ fontFamily: "'Noto Serif JP', serif", color: '#A08C5A' }}>旅の武人</p>
            <button onClick={() => onSelectMode('login_screen')}
                    className="mt-2 text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors"
                    style={{ color: '#C8962A', borderColor: 'rgba(180,130,20,0.3)', fontFamily: "'Noto Serif JP', serif" }}>
              入城して武勲を刻む
            </button>
          </div>
        )}

        {/* 修行ゲージ */}
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold tracking-wider" style={{ color: '#C8962A', fontFamily: "'Noto Serif JP', serif" }}>修行度</span>
            <span className="text-[10px] font-mono" style={{ color: '#6B5A3A' }}>{playerExp}/{expForNextLevel}</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(180,130,20,0.1)' }}>
            <div className="exp-bar-fill h-full rounded-full transition-all duration-1000"
                 style={{ width: `${expPct}%` }} />
          </div>
          <div className="flex justify-between mt-0.5">
            <span className="text-[9px]" style={{ color: '#4A3A1A' }}>段位 {playerLevel}</span>
            <span className="text-[9px]" style={{ color: '#4A3A1A' }}>段位 {playerLevel + 1}</span>
          </div>
        </div>
      </div>

      {/* 日課の軍命 */}
      {user && dailyQuestDefs && dailyQuestProgress && dailyQuestDone && (
        <button onClick={onOpenQuests}
                className="hud-panel rounded-2xl p-3 sm:p-4 text-left cursor-pointer transition-all hover:scale-[1.01] flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-black tracking-[0.18em]" style={{ color: '#C8962A', fontFamily: "'Noto Serif JP', serif" }}>
              日課の軍命
            </p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    color: dailyQuestDone.size === dailyQuestDefs.length ? '#22C55E' : '#C8962A',
                    background: dailyQuestDone.size === dailyQuestDefs.length ? 'rgba(34,197,94,0.12)' : 'rgba(180,130,20,0.12)',
                    border: `1px solid ${dailyQuestDone.size === dailyQuestDefs.length ? 'rgba(34,197,94,0.3)' : 'rgba(180,130,20,0.3)'}`,
                  }}>
              {dailyQuestDone.size}/{dailyQuestDefs.length}
            </span>
          </div>
          <div className="space-y-1.5">
            {dailyQuestDefs.slice(0, 3).map(q => {
              const prog = dailyQuestProgress[q.id] || 0;
              const done = dailyQuestDone.has(q.id);
              return (
                <div key={q.id} className="flex items-center gap-2">
                  <span className="text-xs flex-shrink-0">{done ? '✅' : q.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <span className={`text-[10px] font-bold truncate ${done ? 'line-through' : ''}`}
                            style={{ color: done ? '#22C55E' : '#A08C5A' }}>
                        {q.title}
                      </span>
                      {!done && <span className="text-[9px] ml-1 flex-shrink-0" style={{ color: '#4A3A1A' }}>{prog}/{q.target}</span>}
                    </div>
                    {!done && (
                      <div className="w-full h-0.5 rounded-full mt-0.5" style={{ background: 'rgba(180,130,20,0.1)' }}>
                        <div className="h-full rounded-full transition-all"
                             style={{ width: `${Math.min(100,(prog/q.target)*100)}%`, background: '#C8962A' }} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </button>
      )}

      <div className="mt-auto text-center">
        <p className="text-[9px] font-mono tracking-widest" style={{ color: '#2A1F0A' }}>presented by onokomachi</p>
      </div>
    </div>
  );
};

// ── 戦場ボタン ──────────────────────────────────────────────────────────
const ModeButton: React.FC<{
  mode: GameState;
  kanji: string;
  label: string;
  labelKana: string;
  desc: string;
  badge?: number;
  accentHex: string;
  glowColor: string;
  delay?: number;
  onSelect: (mode: GameState) => void;
}> = ({ mode, kanji, label, labelKana, desc, badge, accentHex, glowColor, delay = 0, onSelect }) => (
  <button
    onClick={() => onSelect(mode)}
    className="relative w-full rounded-xl p-2.5 sm:p-3 text-left flex items-center gap-3 group overflow-hidden
               transition-all duration-200 hover:scale-[1.015] hover:brightness-110 active:scale-[0.99]"
    style={{
      background: `rgba(10,8,5,0.96)`,
      border: `1.5px solid ${accentHex}45`,
      boxShadow: `0 3px 14px ${glowColor}, inset 0 1px 0 rgba(212,175,55,0.05)`,
      animationDelay: `${delay}ms`,
    }}
  >
    {badge !== undefined && badge > 0 && (
      <div className="absolute top-1.5 right-1.5 bg-red-700 text-white text-[9px] font-black rounded-full w-4 h-4
                      flex items-center justify-center animate-pulse z-10">
        {badge}
      </div>
    )}

    {/* 漢字バッジ */}
    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0
                    transition-transform duration-200 group-hover:scale-110"
         style={{
           background: `${accentHex}16`,
           border: `1.5px solid ${accentHex}52`,
           boxShadow: `0 2px 10px ${glowColor}`,
         }}>
      <KanjiIcon kanji={kanji} color={accentHex} />
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-baseline gap-1.5 mb-0.5">
        <span className="text-sm sm:text-base font-black" style={{ color: '#EDE0C4', fontFamily: "'Noto Serif JP', serif" }}>{label}</span>
        <span className="text-[9px] sm:text-[10px] font-bold tracking-widest" style={{ color: accentHex, fontFamily: "'Noto Serif JP', serif" }}>
          {labelKana}
        </span>
      </div>
      <p className="text-[9px] sm:text-[10px] truncate" style={{ color: '#6B5A3A' }}>{desc}</p>
    </div>

    <svg className="w-3.5 h-3.5 flex-shrink-0 transition-all duration-200 group-hover:translate-x-1"
         style={{ color: '#4A3A1A' }}
         fill="none" stroke="currentColor" viewBox="0 0 24 24"
         onMouseEnter={(e: any) => e.currentTarget.style.color = '#D4AF37'}
         onMouseLeave={(e: any) => e.currentTarget.style.color = '#4A3A1A'}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

// ── 本体コンポーネント ──────────────────────────────────────────────────
const MainMenu: React.FC<MainMenuProps> = ({
  onSelectMode, playerLevel, playerExp, expForNextLevel,
  user, socialPoints, onLogout, onOpenRanking,
  loginStreak, onOpenQuests, onOpenLoginBonus,
  canAccessGameMaster, onOpenGameMaster,
  dailyQuestDefs, dailyQuestProgress, dailyQuestDone,
  onOpenClassBattle, hasStudentProfile, srsReviewCount,
  onOpenWeakness, onOpenItemShop, equippedTitleName,
}) => (
  <div className="w-full h-full flex flex-col overflow-hidden">
    <TopBar
      user={user} socialPoints={socialPoints} loginStreak={loginStreak}
      onLogout={onLogout} onOpenLoginBonus={onOpenLoginBonus}
      onOpenRanking={onOpenRanking} onOpenQuests={onOpenQuests}
      onOpenWeakness={onOpenWeakness} onOpenItemShop={onOpenItemShop}
      onOpenClassBattle={onOpenClassBattle} hasStudentProfile={hasStudentProfile}
      canAccessGameMaster={canAccessGameMaster} onOpenGameMaster={onOpenGameMaster}
      equippedTitleName={equippedTitleName}
    />

    {/* 本体 */}
    <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">

      {/* ── 左: 武将カード ── */}
      <div className="hidden sm:flex flex-col lg:w-64 xl:w-72 flex-shrink-0 p-3 sm:p-4 overflow-y-auto border-b lg:border-b-0 lg:border-r"
           style={{ borderColor: 'rgba(180,130,20,0.14)' }}>
        <PlayerCard
          user={user} playerLevel={playerLevel} playerExp={playerExp}
          expForNextLevel={expForNextLevel} socialPoints={socialPoints}
          loginStreak={loginStreak} dailyQuestDefs={dailyQuestDefs}
          dailyQuestProgress={dailyQuestProgress} dailyQuestDone={dailyQuestDone}
          onOpenQuests={onOpenQuests} onOpenLoginBonus={onOpenLoginBonus}
          onSelectMode={onSelectMode}
        />
      </div>

      {/* ── 右: 戦場選択 ── */}
      <div className="flex-1 flex flex-col justify-center p-3 sm:p-4 lg:p-6 overflow-y-auto min-h-0">
        {/* 見出し */}
        <div className="mb-3 sm:mb-4">
          <p className="text-[9px] sm:text-[10px] font-black tracking-[0.35em] mb-0.5"
             style={{ color: '#8B6914', fontFamily: "'Noto Serif JP', serif" }}>
            戦　場　選　択
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black"
              style={{ fontFamily: "'Noto Serif JP', serif", color: '#D4AF37', letterSpacing: '0.12em',
                       textShadow: '0 0 24px rgba(180,130,20,0.4)' }}>
            出　陣
          </h2>
        </div>

        <div className="flex flex-col gap-2 w-full max-w-2xl">
          <ModeButton
            mode="deck_building" kanji="合"
            label="カード合戦" labelKana="合戦"
            desc="デッキを組んでCPUや強者と対戦せよ"
            accentHex="#C8962A" glowColor="rgba(180,130,20,0.18)"
            delay={0} onSelect={onSelectMode}
          />
          <ModeButton
            mode="speed_duel_setup" kanji="速"
            label="早打ち問答" labelKana="速問答"
            desc="デッキ不要！早押しで知略を競え"
            accentHex="#A855F7" glowColor="rgba(168,85,247,0.18)"
            delay={30} onSelect={onSelectMode}
          />
          <ModeButton
            mode="practice_mode" kanji="修"
            label="修行" labelKana="鍛錬"
            desc="分野別に問いを解き、武を磨け"
            badge={srsReviewCount}
            accentHex="#D4AF37" glowColor="rgba(212,175,55,0.18)"
            delay={60} onSelect={onSelectMode}
          />
          <ModeButton
            mode="card_shop" kanji="商"
            label="武具屋" labelKana="商店"
            desc="功績でカードを購い、力を増せ"
            accentHex="#22C55E" glowColor="rgba(34,197,94,0.15)"
            delay={120} onSelect={onSelectMode}
          />
        </div>

        {/* 客将 / スマホ功績 */}
        <div className="mt-3 sm:mt-4 flex flex-col gap-2 max-w-2xl">
          {!user && (
            <button onClick={() => onSelectMode('login_screen')}
                    className="w-full text-xs font-bold px-4 py-2.5 rounded-xl border transition-colors"
                    style={{
                      color: '#C8962A',
                      borderColor: 'rgba(180,130,20,0.25)',
                      fontFamily: "'Noto Serif JP', serif",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(50,35,5,0.3)')}
                    onMouseLeave={e => (e.currentTarget.style.background = '')}>
              参陣して天下番付・合戦・組合戦に挑む
            </button>
          )}
          {user && socialPoints !== undefined && (
            <p className="sm:hidden text-center text-xs font-black"
               style={{ color: '#D4AF37', fontFamily: "'Noto Serif JP', serif" }}>
              功 {socialPoints.toLocaleString()}　段位 {playerLevel}
            </p>
          )}
          {canAccessGameMaster && onOpenGameMaster && (
            <button onClick={onOpenGameMaster}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold border transition-all"
                    style={{ color: '#6B5A3A', borderColor: 'rgba(100,80,30,0.22)', fontFamily: "'Noto Serif JP', serif" }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(30,22,8,0.6)')}
                    onMouseLeave={e => (e.currentTarget.style.background = '')}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              城内管理
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default MainMenu;
