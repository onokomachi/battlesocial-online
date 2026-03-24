import type { Problem } from '../types';

// ── 中1：古代〜中世 ──────────────────────────────────────
import { ancientCivilizationsProblems } from './social_11_ancient_civilizations';
import { jomonYayoiKofunProblems } from './social_12_jomon_yayoi_kofun';
import { asukaProblems } from './social_13_asuka';
import { naraProblems } from './social_14_nara';
import { heianProblems } from './social_15_heian';
import { europeEarlyModernProblems } from './social_01_europe_early_modern';
// ── 中2：近世〜明治 ──────────────────────────────────────
import { kamakuraProblems } from './social_16_kamakura';
import { muroumachiProblems } from './social_17_muromachi';
import { azuchiMomoyamaProblems } from './social_02_azuchi_momoyama';
import { azuchiCultureProblems } from './social_03_azuchi_culture';
import { edoSystemProblems } from './social_04_edo_system';
import { edoEarlyDiplomacyProblems } from './social_05_edo_early_diplomacy';
import { edoIndustryProblems } from './social_06_edo_industry';
import { genrokuKyohoProblems } from './social_07_genroku_kyoho';
import { tanumaKanseiProblems } from './social_08_tanuma_kansei';
import { bunkaBunseiTenpoProblems } from './social_09_bunka_bunsei_tenpo';
import { europe17_18cProblems } from './social_10_europe_17_18c';
import { civilIndustrialRevProblems } from './social_18_civil_industrial_rev';
import { meijiRestorationProblems } from './social_19_meiji_restoration';
import { freedomConstitutionProblems } from './social_20_freedom_constitution';
import { sinoRussoWarsProblems } from './social_21_sino_russo_wars';
// ── 中3：近代〜現代 ──────────────────────────────────────
import { wwiTaishoProblems } from './social_22_wwi_taisho';
import { depressionMilitarismProblems } from './social_23_depression_militarism';
import { wwiiProblems } from './social_24_wwii';
import { postwarProblems } from './social_25_postwar';
import { modernJapanProblems } from './social_26_modern';

export const SOCIAL_PROBLEMS: Record<string, Problem[]> = {
  // 中1
  "古代文明と宗教":                    ancientCivilizationsProblems,
  "縄文・弥生・古墳":                  jomonYayoiKofunProblems,
  "飛鳥時代":                          asukaProblems,
  "奈良時代":                          naraProblems,
  "平安時代":                          heianProblems,
  "ヨーロッパ近世":                    europeEarlyModernProblems,
  // 中2
  "鎌倉時代":                          kamakuraProblems,
  "室町時代":                          muroumachiProblems,
  "安土桃山時代":                      azuchiMomoyamaProblems,
  "安土桃山の文化":                    azuchiCultureProblems,
  "江戸時代のしくみ":                  edoSystemProblems,
  "江戸初期の外交":                    edoEarlyDiplomacyProblems,
  "江戸の産業と都市":                  edoIndustryProblems,
  "元禄〜享保":                        genrokuKyohoProblems,
  "田沼〜寛政":                        tanumaKanseiProblems,
  "文化文政〜天保":                    bunkaBunseiTenpoProblems,
  "17,18世紀ヨーロッパ":              europe17_18cProblems,
  "市民革命と産業革命":                civilIndustrialRevProblems,
  "明治維新":                          meijiRestorationProblems,
  "自由民権運動と憲法":                freedomConstitutionProblems,
  "日清・日露戦争":                    sinoRussoWarsProblems,
  // 中3
  "第一次世界大戦と大正デモクラシー": wwiTaishoProblems,
  "世界恐慌と軍国主義":                depressionMilitarismProblems,
  "第二次世界大戦":                    wwiiProblems,
  "戦後の日本と世界":                  postwarProblems,
  "現代の日本と世界":                  modernJapanProblems,
};
