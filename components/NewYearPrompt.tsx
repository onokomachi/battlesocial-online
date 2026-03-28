
import React, { useState } from 'react';
import type { StudentProfile } from '../types';
import { DEFAULT_SCHOOL_YEAR, getCurrentSchoolYear } from '../constants';

interface NewYearPromptProps {
  profile: StudentProfile;
  onConfirm: (updated: StudentProfile) => void;
  onSkip: () => void;
}

const NewYearPrompt: React.FC<NewYearPromptProps> = ({ profile, onConfirm, onSkip }) => {
  const currentSchoolYear = getCurrentSchoolYear();
  const yearDiff = currentSchoolYear - (profile.schoolYear ?? DEFAULT_SCHOOL_YEAR);
  const newGrade = profile.grade + yearDiff;
  const isGraduated = newGrade > 3;

  const [classNum, setClassNum] = useState<number>(profile.classNum);
  const [number, setNumber] = useState<number>(profile.number);

  const handleConfirm = () => {
    if (isGraduated) {
      const updated: StudentProfile = {
        ...profile,
        grade: 4,
        displayLabel: `${profile.schoolName} 卒業`,
        schoolYear: currentSchoolYear,
      };
      onConfirm(updated);
    } else {
      const updated: StudentProfile = {
        ...profile,
        grade: newGrade,
        classNum,
        number,
        displayLabel: `${profile.schoolName} ${newGrade}年${classNum}組${number}番`,
        schoolYear: currentSchoolYear,
      };
      onConfirm(updated);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
         style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="hud-panel rounded-2xl p-6 w-full max-w-sm animate-math-fade-in"
           style={{ borderColor: 'rgba(180,130,20,0.6)' }}>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="text-3xl mb-2">🌸</div>
          <h2 className="text-xl font-black text-hologram tracking-wide">新年度のお知らせ</h2>
          <p className="text-xs mt-1" style={{ color: '#A08C5A' }}>
            {currentSchoolYear}年度が始まりました
          </p>
        </div>

        {isGraduated ? (
          /* 卒業パス */
          <div className="text-center">
            <p className="text-sm mb-4 leading-relaxed" style={{ color: '#EDE0C4' }}>
              おめでとうございます！<br />
              <span className="font-bold" style={{ color: '#F0C040' }}>中学校を卒業</span>されましたね。<br />
              プロフィールを卒業済みに更新します。
            </p>
            <div className="hud-panel rounded-xl p-3 mb-5 text-center"
                 style={{ borderColor: 'rgba(180,130,20,0.3)' }}>
              <span className="text-sm font-bold" style={{ color: '#D4AF37' }}>
                {profile.schoolName} 卒業
              </span>
            </div>
            <button onClick={handleConfirm} className="btn-tactical w-full py-3 rounded-xl text-sm font-bold">
              了解！
            </button>
          </div>
        ) : (
          /* 進級パス */
          <div>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: '#EDE0C4' }}>
              新しい学年になりましたね！<br />
              プロフィールを更新しましょう。
            </p>

            {/* 新しい学年表示 */}
            <div className="hud-panel rounded-xl p-3 mb-4 text-center"
                 style={{ borderColor: 'rgba(180,130,20,0.3)' }}>
              <span className="text-xs block mb-1" style={{ color: '#A08C5A' }}>新しい学年</span>
              <span className="text-lg font-black" style={{ color: '#F0C040' }}>
                {newGrade}年生
              </span>
            </div>

            {/* 組の選択 */}
            <div className="mb-3">
              <label className="text-xs font-bold block mb-1" style={{ color: '#A08C5A' }}>組</label>
              <div className="grid grid-cols-5 gap-1">
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <button
                    key={n}
                    onClick={() => setClassNum(n)}
                    className="py-1.5 rounded-lg text-xs font-bold transition-all"
                    style={classNum === n
                      ? { background: 'rgba(180,130,20,0.3)', color: '#F0C040', border: '1px solid rgba(212,175,55,0.7)' }
                      : { background: 'rgba(255,255,255,0.04)', color: '#A08C5A', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* 出席番号の選択 */}
            <div className="mb-5">
              <label className="text-xs font-bold block mb-1" style={{ color: '#A08C5A' }}>出席番号</label>
              <div className="grid grid-cols-9 gap-1 max-h-28 overflow-y-auto">
                {Array.from({ length: 45 }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    onClick={() => setNumber(n)}
                    className="py-1 rounded text-xs font-bold transition-all"
                    style={number === n
                      ? { background: 'rgba(180,130,20,0.3)', color: '#F0C040', border: '1px solid rgba(212,175,55,0.7)' }
                      : { background: 'rgba(255,255,255,0.04)', color: '#A08C5A', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* ボタン */}
            <div className="flex gap-2">
              <button
                onClick={onSkip}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', color: '#6B7280', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                後で
              </button>
              <button onClick={handleConfirm} className="btn-tactical flex-[2] py-2.5 rounded-xl text-sm font-bold">
                更新する
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewYearPrompt;
