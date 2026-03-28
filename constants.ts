
import type { Problem, ProblemCard, CategoryDef, SocialCategory, Ability, AbilityType, DailyQuestDef, BadgeDef, ShopItemDef, TitleDef } from './types';
import { SOCIAL_PROBLEMS } from './data/index';

export const MAX_SCORE = 5;
export const DECK_SIZE = 20;
export const HAND_SIZE = 5;
export const MAX_DUPLICATES = 2;

// HP Battle System
// エビデンスA: Testing Effect (Roediger & Butler 2011) — 想起回数が学習効果に比例
// HP40 + ダメージ式 → 平均7-8ラウンド/試合
export const INITIAL_HP = 40;

// Speed Duel: 固定ダメージ（デッキ不要モード）
export const SPEED_DUEL_DAMAGE = 5;
// Speed Duel: 問題の制限時間（ミリ秒）
export const SPEED_DUEL_TIME_LIMIT = 15000;
// Speed Duel: 誤答後の相手回答時間（ミリ秒）
export const SPEED_DUEL_SECOND_CHANCE_TIME = 6000;

// Damage formula: difficulty × 1.5 + 1
// select(2)=4, input(3)=5.5→6, sort(4)=7
export const calcDamage = (difficulty: number): number =>
  Math.round(difficulty * 1.5 + 1);

// Admin settings
export const ADMIN_EMAILS: string[] = []; // Add admin email addresses here
export const GAMEMASTER_PASSWORD = '215124'; // Change in production

// School year (年度) helpers
// 日本の年度は4月始まり: 4月以降 → その年, 1〜3月 → 前年
export const DEFAULT_SCHOOL_YEAR = 2025;
export const getCurrentSchoolYear = (): number => {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-indexed
  return month >= 4 ? now.getFullYear() : now.getFullYear() - 1;
};

export const DECK_CONSTRAINTS: Record<number, number> = {
  4: 7,
  5: 3,
};

// 社会科カテゴリ × 問題タイプ別に構造化（グループ別）
// grade: 1=中1（古代〜中世）, 2=中2（近世〜明治）, 3=中3（近代〜現代）
export const SOCIAL_CATEGORIES: CategoryDef[] = [
  // ── 中1：古代〜中世 ──────────────────────────────────────
  {
    name: '古代文明と宗教',
    grade: 1,
    groups: [{ name: '古代文明と宗教', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '縄文・弥生・古墳',
    grade: 1,
    groups: [{ name: '縄文・弥生・古墳', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '飛鳥時代',
    grade: 1,
    groups: [{ name: '飛鳥時代', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '奈良時代',
    grade: 1,
    groups: [{ name: '奈良時代', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '平安時代',
    grade: 1,
    groups: [{ name: '平安時代', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: 'ヨーロッパ近世',
    grade: 1,
    groups: [{ name: 'ヨーロッパ近世', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  // ── 中2：近世〜明治 ──────────────────────────────────────
  {
    name: '鎌倉時代',
    grade: 2,
    groups: [{ name: '鎌倉時代', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '室町時代',
    grade: 2,
    groups: [{ name: '室町時代', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '安土桃山時代',
    grade: 2,
    groups: [{ name: '安土桃山時代', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '安土桃山の文化',
    grade: 2,
    groups: [{ name: '安土桃山の文化', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '江戸時代のしくみ',
    grade: 2,
    groups: [{ name: '江戸時代のしくみ', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '江戸初期の外交',
    grade: 2,
    groups: [{ name: '江戸初期の外交', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '江戸の産業と都市',
    grade: 2,
    groups: [{ name: '江戸の産業と都市', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '元禄〜享保',
    grade: 2,
    groups: [{ name: '元禄〜享保', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '田沼〜寛政',
    grade: 2,
    groups: [{ name: '田沼〜寛政', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '文化文政〜天保',
    grade: 2,
    groups: [{ name: '文化文政〜天保', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '17,18世紀ヨーロッパ',
    grade: 2,
    groups: [{ name: '17,18世紀ヨーロッパ', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '市民革命と産業革命',
    grade: 2,
    groups: [{ name: '市民革命と産業革命', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '明治維新',
    grade: 2,
    groups: [{ name: '明治維新', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '自由民権運動と憲法',
    grade: 2,
    groups: [{ name: '自由民権運動と憲法', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '日清・日露戦争',
    grade: 2,
    groups: [{ name: '日清・日露戦争', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  // ── 中3：近代〜現代 ──────────────────────────────────────
  {
    name: '第一次世界大戦と大正デモクラシー',
    grade: 3,
    groups: [{ name: '第一次世界大戦と大正デモクラシー', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '世界恐慌と軍国主義',
    grade: 3,
    groups: [{ name: '世界恐慌と軍国主義', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '第二次世界大戦',
    grade: 3,
    groups: [{ name: '第二次世界大戦', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '戦後の日本と世界',
    grade: 3,
    groups: [{ name: '戦後の日本と世界', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
  {
    name: '現代の日本と世界',
    grade: 3,
    groups: [{ name: '現代の日本と世界', subtopics: ['選択式', '記述式', '並び替え'] }],
  },
];

const ABILITIES: Ability[] = [
  { type: 'DEFENSIVE_STANCE', description: '[防御] このラウンドで敗北しても失点しない。' },
  { type: 'TIME_PRESSURE', value: 3, description: '[速攻] 相手の解答時間を3秒短縮する。' },
  { type: 'SCORE_BOOST', value: 1, description: '[激励] このラウンドで勝利した場合、追加で1スコアを得る。' },
];

const assignAbility = (card: ProblemCard): Ability | undefined => {
  // select(difficulty=2)はアビリティなし。input/sort のみ
  if (card.difficulty < 3) return undefined;
  const abilityMap: { [key: string]: AbilityType[] } = {
    // 中1
    '古代文明と宗教':                    ['SCORE_BOOST'],
    '縄文・弥生・古墳':                  ['DEFENSIVE_STANCE'],
    '飛鳥時代':                          ['SCORE_BOOST'],
    '奈良時代':                          ['DEFENSIVE_STANCE', 'SCORE_BOOST'],
    '平安時代':                          ['TIME_PRESSURE'],
    'ヨーロッパ近世':                    ['SCORE_BOOST'],
    // 中2
    '鎌倉時代':                          ['DEFENSIVE_STANCE', 'SCORE_BOOST'],
    '室町時代':                          ['TIME_PRESSURE'],
    '安土桃山時代':                      ['SCORE_BOOST'],
    '安土桃山の文化':                    ['TIME_PRESSURE'],
    '江戸時代のしくみ':                  ['DEFENSIVE_STANCE', 'SCORE_BOOST'],
    '江戸初期の外交':                    ['TIME_PRESSURE'],
    '江戸の産業と都市':                  ['DEFENSIVE_STANCE'],
    '元禄〜享保':                        ['DEFENSIVE_STANCE', 'SCORE_BOOST'],
    '田沼〜寛政':                        ['TIME_PRESSURE'],
    '文化文政〜天保':                    ['TIME_PRESSURE', 'SCORE_BOOST'],
    '17,18世紀ヨーロッパ':              ['SCORE_BOOST'],
    '市民革命と産業革命':                ['SCORE_BOOST'],
    '明治維新':                          ['DEFENSIVE_STANCE', 'SCORE_BOOST'],
    '自由民権運動と憲法':                ['TIME_PRESSURE'],
    '日清・日露戦争':                    ['SCORE_BOOST'],
    // 中3
    '第一次世界大戦と大正デモクラシー': ['TIME_PRESSURE', 'SCORE_BOOST'],
    '世界恐慌と軍国主義':                ['DEFENSIVE_STANCE'],
    '第二次世界大戦':                    ['DEFENSIVE_STANCE', 'TIME_PRESSURE'],
    '戦後の日本と世界':                  ['SCORE_BOOST'],
    '現代の日本と世界':                  ['TIME_PRESSURE', 'SCORE_BOOST'],
  };
  const possibleTypes = abilityMap[card.mainCategory];
  if (!possibleTypes) return undefined;
  if (Math.random() < 0.25) {
    const randomType = possibleTypes[Math.floor(Math.random() * possibleTypes.length)];
    return ABILITIES.find(a => a.type === randomType);
  }
  return undefined;
};

const shuffleArray = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const processProblems = (): ProblemCard[] => {
  const allProblems: ProblemCard[] = [];
  let idCounter = 0;

  for (const [mainCat, problems] of Object.entries(SOCIAL_PROBLEMS)) {
    for (const rawProblem of problems) {
      // input problems with multi-word answers (sentences) → convert to sort type
      let problem = rawProblem;
      if (
        rawProblem.type === 'input' &&
        typeof rawProblem.answer === 'string' &&
        rawProblem.answer.trim().split(/\s+/).length >= 3
      ) {
        const words = rawProblem.answer.trim().split(/\s+/);
        problem = {
          ...rawProblem,
          type: 'sort',
          answer: words,
          data: {
            ...rawProblem.data,
            options: shuffleArray(words),
          },
        };
      }

      // 難易度はモードで決定: select=2, input=3, sort=4
      const difficulty = problem.type === 'select' ? 2 : problem.type === 'input' ? 3 : 4;
      const card: ProblemCard = {
        id: idCounter++,
        mainCategory: mainCat as SocialCategory,
        category: problem.type,
        difficulty,
        problem,
      };
      card.ability = assignAbility(card);
      allProblems.push(card);
    }
  }
  return allProblems;
};

export const CARD_DEFINITIONS: ProblemCard[] = processProblems();

// ============================
// Gamification Helpers
// ============================
export const getTodayStr = (): string => new Date().toISOString().slice(0, 10);

export const getWeekStart = (): string => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // Monday
  return d.toISOString().slice(0, 10);
};

// ============================
// Badge Definitions
// エビデンスB: 達成バッジ × 自己決定理論（有能感欲求）
// ============================
export const BADGE_DEFS: BadgeDef[] = [
  // --- 正解マイルストーン ---
  { id: 'first_correct', title: '初正解', description: 'はじめて問題に正解した', icon: '⭐' },
  { id: 'correct_50', title: '50問達成', description: '通算50問正解した', icon: '🎯' },
  { id: 'correct_100', title: '100問達成', description: '通算100問正解した', icon: '💯' },
  { id: 'correct_500', title: '500問達成', description: '通算500問正解した', icon: '🌟' },
  { id: 'correct_1000', title: '1000問達成', description: '通算1000問正解した', icon: '🏅' },
  // --- PvPバトル ---
  { id: 'first_pvp_win', title: '初勝利', description: 'はじめてPvPで勝利した', icon: '⚔️' },
  { id: 'pvp_10wins', title: 'PvP10勝', description: 'PvPで10勝した', icon: '🏆' },
  { id: 'pvp_50wins', title: 'PvP50勝', description: 'PvPで50勝した', icon: '🥇' },
  { id: 'first_cpu_win', title: 'CPU撃破', description: 'はじめてCPU戦に勝利した', icon: '🤖' },
  { id: 'perfect_battle', title: '完全勝利', description: 'HP満タンで勝利した', icon: '💎' },
  // --- ログインストリーク ---
  { id: 'streak_3', title: '3日連続', description: '3日連続でログインした', icon: '🔥' },
  { id: 'streak_7', title: '7日連続', description: '7日連続でログインした', icon: '🔥🔥' },
  { id: 'streak_14', title: '14日連続', description: '14日連続でログインした', icon: '🔥🔥🔥' },
  { id: 'streak_30', title: '30日連続', description: '30日連続でログインした', icon: '👑' },
  // --- 連鎖 ---
  { id: 'chain_5', title: '5連鎖', description: '5問連続正解した', icon: '⚡' },
  { id: 'chain_10', title: '10連鎖', description: '10問連続正解した', icon: '⚡⚡' },
  { id: 'chain_20', title: '20連鎖', description: '20問連続正解した', icon: '⚡⚡⚡' },
  // --- 単元マスター ---
  { id: 'master_europe', title: 'ヨーロッパ近世マスター', description: 'ヨーロッパ近世の正答率85%以上', icon: '🚀' },
  { id: 'master_azuchi', title: '安土桃山マスター', description: '安土桃山時代の正答率85%以上', icon: '📝' },
  { id: 'master_culture', title: '安土文化マスター', description: '安土桃山の文化の正答率85%以上', icon: '✏️' },
  { id: 'master_edo', title: '江戸のしくみマスター', description: '江戸時代のしくみの正答率85%以上', icon: '🛡️' },
  { id: 'master_genroku', title: '元禄享保マスター', description: '元禄〜享保の正答率85%以上', icon: '⏰' },
  { id: 'master_tanuma', title: '田沼寛政マスター', description: '田沼〜寛政の正答率85%以上', icon: '⚖️' },
  { id: 'all_master', title: '全単元制覇', description: '全カテゴリの正答率85%以上', icon: '🎓' },
  // --- コレクション ---
  { id: 'deck_full', title: 'フルデッキ', description: 'カードを50枚以上所持', icon: '🃏' },
  { id: 'shop_first', title: '初めての買い物', description: 'ショップで初購入', icon: '🛒' },
  { id: 'title_collector', title: '称号コレクター', description: '称号を3つ以上購入', icon: '🏷️' },
  // --- クエスト ---
  { id: 'daily_complete', title: 'デイリー完遂', description: '全デイリークエストを達成', icon: '📋' },
  { id: 'weekly_complete', title: 'ウィークリー完遂', description: '全ウィークリークエストを達成', icon: '📅' },
  // --- チュートリアル ---
  { id: 'tutorial_clear', title: 'チュートリアル完了', description: 'チュートリアルバトルをクリア', icon: '🎮' },
  // --- スペシャル ---
  { id: 'speed_demon', title: 'スピードデーモン', description: '3秒以内に正解した', icon: '⏱️' },
  { id: 'comeback', title: '逆転勝利', description: 'HP5以下から勝利した', icon: '🔄' },
];

// ============================
// Quest Definitions
// エビデンスA: 目標設定理論（Locke & Latham 1990, d=0.48）
// 3層設計: Easy(確実達成) → Medium(努力で達成) → Hard(チャレンジ)
// ============================
export const DAILY_QUEST_DEFS: DailyQuestDef[] = [
  // Easy層: ほぼ全員が達成でき、毎日の起動動機になる
  { id: 'dq_5', title: '今日の5問', description: '5問正解しよう', target: 5, reward: { mp: 150, exp: 80 }, icon: '⚡' },
  // Medium層: 15-20分の学習を要する。目標設定理論の最適難度
  { id: 'dq_15', title: '15問突破', description: '15問正解しよう', target: 15, reward: { mp: 400, exp: 200 }, icon: '🔥' },
  // Hard層: 30分以上+高品質。達成感が最大のチャレンジ目標
  { id: 'dq_30', title: '30問＆正答率80%', description: '30問正解（正答率80%以上）', target: 30, reward: { mp: 1000, exp: 500 }, icon: '💎' },
  // PvP: 社会的動機づけ（SDT関係性欲求）
  { id: 'dq_pvp', title: 'PvP参戦', description: 'PvP対戦を1回行おう', target: 1, reward: { mp: 200, exp: 100 }, icon: '⚔️' },
];

export const WEEKLY_QUEST_DEFS: DailyQuestDef[] = [
  { id: 'wq_50', title: '週50問チャレンジ', description: '今週50問正解しよう', target: 50, reward: { mp: 800, exp: 400 }, icon: '🌟' },
  { id: 'wq_pvp3', title: '週3回PvP', description: '今週PvPを3回行おう', target: 3, reward: { mp: 800, exp: 400 }, icon: '🏆' },
  { id: 'wq_100', title: '週100問マスター', description: '今週100問正解しよう', target: 100, reward: { mp: 2000, exp: 1000 }, icon: '👑' },
];

// ============================
// 称号定義 (条件達成で付与)
// ============================
export const TITLE_DEFS: TitleDef[] = [
  // --- 入門 ---
  { id: 'title_newcomer', name: '新入生', description: '旅を始めた証', icon: '🔰', condition: { type: 'any' }, rarity: 'common' },
  // --- 正解マイルストーン ---
  { id: 'title_correct_50', name: '問題解き師', description: '通算50問正解', icon: '📝', condition: { type: 'total_correct', value: 50 }, rarity: 'common' },
  { id: 'title_correct_100', name: '百問突破', description: '通算100問正解', icon: '💯', condition: { type: 'total_correct', value: 100 }, rarity: 'common' },
  { id: 'title_correct_500', name: '解答機械', description: '通算500問正解', icon: '⚙️', condition: { type: 'total_correct', value: 500 }, rarity: 'rare' },
  { id: 'title_correct_1000', name: '千問達人', description: '通算1000問正解', icon: '🏅', condition: { type: 'total_correct', value: 1000 }, rarity: 'rare' },
  { id: 'title_correct_5000', name: '万能数学者', description: '通算5000問正解', icon: '🌟', condition: { type: 'total_correct', value: 5000 }, rarity: 'epic' },
  // --- PvP勝利 ---
  { id: 'title_first_pvp_win', name: '初陣', description: 'はじめてPvPで勝利した', icon: '⚔️', condition: { type: 'badge_owned', badgeId: 'first_pvp_win' }, rarity: 'common' },
  { id: 'title_pvp_10wins', name: '闘士', description: 'PvPで10勝した', icon: '🗡️', condition: { type: 'badge_owned', badgeId: 'pvp_10wins' }, rarity: 'common' },
  { id: 'title_pvp_50wins', name: '戦士', description: 'PvPで50勝した', icon: '🏆', condition: { type: 'badge_owned', badgeId: 'pvp_50wins' }, rarity: 'rare' },
  { id: 'title_pvp_100wins', name: '猛将', description: 'PvPで100勝した', icon: '👑', condition: { type: 'total_wins', value: 100 }, rarity: 'epic' },
  // --- ログインストリーク ---
  { id: 'title_streak_3', name: '習慣者', description: '3日連続ログイン', icon: '🔥', condition: { type: 'login_streak', value: 3 }, rarity: 'common' },
  { id: 'title_streak_7', name: '精勤', description: '7日連続ログイン', icon: '🔥🔥', condition: { type: 'login_streak', value: 7 }, rarity: 'common' },
  { id: 'title_streak_30', name: '皆勤賞', description: '30日連続ログイン', icon: '🏆', condition: { type: 'login_streak', value: 30 }, rarity: 'epic' },
  { id: 'title_streak_90', name: '鉄人', description: '90日連続ログイン', icon: '🔥🔥🔥', condition: { type: 'login_streak', value: 90 }, rarity: 'legendary' },
  // --- 連鎖 ---
  { id: 'title_chain_5', name: '連続正解者', description: '5連鎖達成', icon: '⚡', condition: { type: 'badge_owned', badgeId: 'chain_5' }, rarity: 'common' },
  { id: 'title_chain_10', name: '怒涛の連撃', description: '10連鎖達成', icon: '⚡⚡', condition: { type: 'badge_owned', badgeId: 'chain_10' }, rarity: 'rare' },
  { id: 'title_chain_20', name: '無敵連鎖', description: '20連鎖達成', icon: '⚡⚡⚡', condition: { type: 'badge_owned', badgeId: 'chain_20' }, rarity: 'epic' },
  // --- レベル ---
  { id: 'title_level_10', name: '一人前', description: 'レベル10到達', icon: '📈', condition: { type: 'level', value: 10 }, rarity: 'common' },
  { id: 'title_level_30', name: '熟練者', description: 'レベル30到達', icon: '🎖️', condition: { type: 'level', value: 30 }, rarity: 'rare' },
  { id: 'title_level_50', name: '上級者', description: 'レベル50到達', icon: '🌠', condition: { type: 'level', value: 50 }, rarity: 'epic' },
  // --- 単元マスター ---
  { id: 'title_master_europe', name: 'ヨーロッパの達人', description: 'ヨーロッパ近世マスター獲得', icon: '🌍', condition: { type: 'badge_owned', badgeId: 'master_europe' }, rarity: 'rare' },
  { id: 'title_master_azuchi', name: '安土の覇者', description: '安土桃山マスター獲得', icon: '🏯', condition: { type: 'badge_owned', badgeId: 'master_azuchi' }, rarity: 'rare' },
  { id: 'title_all_master', name: '全科目制覇', description: '全単元制覇バッジ獲得', icon: '🎓', condition: { type: 'badge_owned', badgeId: 'all_master' }, rarity: 'legendary' },
  // --- スペシャル ---
  { id: 'title_perfect_battle', name: '完璧主義者', description: 'HP満タンで勝利', icon: '💎', condition: { type: 'badge_owned', badgeId: 'perfect_battle' }, rarity: 'epic' },
  { id: 'title_comeback', name: '逆転の帝王', description: '逆転勝利バッジ獲得', icon: '🔄', condition: { type: 'badge_owned', badgeId: 'comeback' }, rarity: 'rare' },
  { id: 'title_speed_demon', name: 'スピードデーモン', description: '3秒以内に正解', icon: '⏱️', condition: { type: 'badge_owned', badgeId: 'speed_demon' }, rarity: 'rare' },
  // --- 月次チャンピオン ---
  { id: 'title_monthly_champion', name: '数学王', description: '今月の月次チャンピオン', icon: '👑', condition: { type: 'monthly_top1' }, isMonthly: true, rarity: 'legendary' },
];

/**
 * MPシンク — ストリークシールド・テーマ・消耗品
 * エビデンスB: 仮想経済バランス（Castronova 2005）
 *   消費先がないとインフレ → モチベーション低下
 */
export const SHOP_ITEMS: ShopItemDef[] = [
  // ストリークシールド（ログイン連続日数を1回保護）
  { id: 'streak_shield', name: 'ストリークシールド', description: 'ログイン途切れを1回だけ防ぐ', cost: 2000, icon: '🛡️', type: 'streak_shield' },
  // バトルテーマ
  { id: 'theme_fire', name: '炎のテーマ', description: 'バトル画面が炎に包まれる', cost: 4000, icon: '🔴', type: 'theme' },
  { id: 'theme_ice', name: '氷のテーマ', description: '冷徹な戦場で戦う', cost: 4000, icon: '🔵', type: 'theme' },
  { id: 'theme_gold', name: '黄金のテーマ', description: '栄光のゴールドバトル', cost: 8000, icon: '🟡', type: 'theme' },
  // 消耗品
  { id: 'mp_booster', name: '2倍MPブースター', description: '1時間MP獲得量が2倍になる', cost: 3000, icon: '⚡', type: 'mp_booster', durationMs: 3600000 },
  { id: 'hint_token', name: 'ヒントトークン', description: '問題のヒントを1回表示できる', cost: 500, icon: '💡', type: 'hint_token' },
  { id: 'exp_booster', name: 'EXP2倍ブースター', description: '次のバトル1回のEXPが2倍になる', cost: 1500, icon: '✨', type: 'exp_booster' },
];

// テーマ設定
export const THEME_CONFIGS: Record<string, { bgClass: string; accentColor: string }> = {
  theme_fire: { bgClass: 'bg-gradient-to-br from-red-950 via-orange-900/20 to-red-950', accentColor: '#ef4444' },
  theme_ice: { bgClass: 'bg-gradient-to-br from-blue-950 via-cyan-900/20 to-slate-950', accentColor: '#06b6d4' },
  theme_gold: { bgClass: 'bg-gradient-to-br from-amber-950 via-yellow-900/20 to-amber-950', accentColor: '#f59e0b' },
};
