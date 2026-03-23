
// types.ts - BattleSocial Online (社会科カードバトル)

// --- Social Studies Question Types ---
export type QuestionType = 'select' | 'input' | 'sort';

export type SocialCategory =
  // ── 世界史 ────────────────────────────────────────────────
  | 'ヨーロッパ近世'
  | '17,18世紀ヨーロッパ'
  // ── 日本史・安土桃山〜江戸前期 ──────────────────────────
  | '安土桃山時代'
  | '安土桃山の文化'
  | '江戸時代のしくみ'
  | '江戸初期の外交'
  // ── 日本史・江戸中後期 ──────────────────────────────────
  | '江戸の産業と都市'
  | '元禄〜享保'
  | '田沼〜寛政'
  | '文化文政〜天保';

// --- Student Profile (学年・組・番号) ---
export interface StudentProfile {
  grade: number;    // 学年 (1, 2, 3)
  classNum: number; // 組 (1〜10)
  number: number;   // 出席番号 (1〜45)
  displayLabel: string; // e.g. "2年3組12番"
}

// --- Auth / Online Types ---

export interface DailyQuestDef {
  id: string;
  title: string;
  description: string;
  target: number;
  reward: { mp: number; exp: number };
  icon: string;
}

export interface BadgeDef {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  socialPoints: number;     // ポイント（旧: engPoints / mathPoints）
  playerLevel: number;
  playerExp: number;
  totalWins: number;
  totalMatches: number;
  ownedCardIds: number[];
  createdAt?: any;
  // 形式別勝敗 (denormalized for single-query ranking)
  formatWins?: {
    best_of_3?: number;
    best_of_5?: number;
    best_of_7?: number;
    master_duel?: number;
  };
  formatMatches?: {
    best_of_3?: number;
    best_of_5?: number;
    best_of_7?: number;
    master_duel?: number;
  };
}

/** MPシンク: 購入可能アイテム定義 */
export interface ShopItemDef {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  type: 'title' | 'streak_shield' | 'theme';
}

export type BattleMode = 'cpu' | 'pvp';
export type BattleFormat = 'best_of_3' | 'best_of_5' | 'best_of_7' | 'master_duel';

export interface SavedDeck {
  name: string;
  cardIds: number[];
  createdAt: number;
}

export interface Room {
  roomId: string;
  status: 'waiting' | 'playing' | 'finished';
  hostId: string;
  hostName: string;
  guestId: string | null;
  guestName: string | null;
  createdAt: any;
  hostLastActive: any;
  guestLastActive: any;
  hostReady: boolean;
  guestReady: boolean;
  round: number;
  // HP-based battle
  p1Hp: number;
  p2Hp: number;
  // Moves: serialized card IDs (not full card objects for Firestore)
  p1Move: { cardId: number; answeredCorrectly?: boolean } | null;
  p2Move: { cardId: number; answeredCorrectly?: boolean } | null;
  winnerId: 'host' | 'guest' | 'draw' | 'abandoned' | 'admin_terminated' | null;
  // Speed Duel PvP extension (optional fields)
  battleType?: 'deck' | 'speed_duel';
  sdCategories?: string[];
  sdFormat?: BattleFormat;
  sdQuestion?: { type: string; data: { question: string; japanese?: string; options?: string[] }; answer: string | string[] } | null;
  sdQuestionIndex?: number;
  sdHostBuzz?: any;
  sdGuestBuzz?: any;
  sdHostAnswer?: string | null;
  sdGuestAnswer?: string | null;
  sdRoundResult?: 'host' | 'guest' | 'draw' | 'timeout' | null;
  sdHostRoundWins?: number;
  sdGuestRoundWins?: number;
}

// --- Core Game Types ---

export type AbilityType = 'DEFENSIVE_STANCE' | 'TIME_PRESSURE' | 'SCORE_BOOST';

export interface Ability {
  type: AbilityType;
  value?: number;
  description: string;
}

// 社会科問題データ構造
export interface Problem {
  type: QuestionType;
  data: {
    question: string;
    japanese?: string;       // 補足ヒント（使用しない場合あり）
    options?: string[];      // select/sort で使用する選択肢
  };
  answer: string | string[]; // select/input は string, sort は string[]
}

export type ProblemSet = Record<string, Problem[]>;

// カードデータ（バトル用）
export interface ProblemCard {
  id: number;
  mainCategory: SocialCategory;  // "安土桃山時代" 等の歴史カテゴリ
  category: string;              // サブ分類（問題タイプ: "select"/"input"/"sort"）
  difficulty: number;            // select=2, input=3, sort=4
  problem: Problem;
  ability?: Ability;
}

export type TurnPhase = 'selecting_card' | 'solving_problem' | 'round_end' | 'game_over' | 'waiting_for_opponent';
export type GameState = 'login_screen' | 'main_menu' | 'deck_building' | 'in_game' | 'end' | 'practice_mode' | 'card_shop' | 'matchmaking' | 'gamemaster' | 'tutorial' | 'speed_duel_setup' | 'speed_duel' | 'sd_matchmaking';
export type TurnInitiative = 'player' | 'pc';

// --- Speed Duel Types ---
export type SpeedDuelPhase =
  | 'showing_question'   // 問題表示中・早押し受付中
  | 'player_buzzed'      // プレイヤーが先押し → 回答入力中
  | 'opponent_chance'    // プレイヤー誤答 → 相手に回答権
  | 'reveal'             // 結果表示
  | 'game_over';

export interface SpeedDuelSetup {
  categories: SocialCategory[];
  format: BattleFormat;
  mode: BattleMode;
}

export interface SpeedDuelRound {
  problem: Problem;
  phase: SpeedDuelPhase;
  playerBuzzed: boolean;
  cpuBuzzed: boolean;
  playerAnswer: string | null;
  cpuAnswered: boolean;
  result: 'player_win' | 'cpu_win' | 'draw' | 'timeout' | null;
  startedAt: number; // Date.now()
}

// --- Practice Mode Types ---
export interface SubCategoryGroup {
    name: string;
    subtopics: string[];
}
export interface CategoryDef {
    name: string;
    grade: 1 | 2 | 3;  // グループ (1=世界史, 2=日本史・安土桃山〜江戸前期, 3=日本史・江戸中後期)
    groups: SubCategoryGroup[];
}

export interface SessionStats {
  correct: number;
  incorrect: number;
  totalScore: number;
  problemCount: number;
}

export interface LearningRecord {
    id: string;
    date: string;
    category: string;
    subTopic: string;
    stats: SessionStats;
}
