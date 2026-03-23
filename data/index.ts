import type { Problem } from '../types';

import { europeEarlyModernProblems } from './social_01_europe_early_modern';
import { azuchiMomoyamaProblems } from './social_02_azuchi_momoyama';
import { azuchiCultureProblems } from './social_03_azuchi_culture';
import { edoSystemProblems } from './social_04_edo_system';
import { edoEarlyDiplomacyProblems } from './social_05_edo_early_diplomacy';
import { edoIndustryProblems } from './social_06_edo_industry';
import { genrokuKyohoProblems } from './social_07_genroku_kyoho';
import { tanumaKanseiProblems } from './social_08_tanuma_kansei';
import { bunkaBunseiTenpoProblems } from './social_09_bunka_bunsei_tenpo';
import { europe17_18cProblems } from './social_10_europe_17_18c';

export const SOCIAL_PROBLEMS: Record<string, Problem[]> = {
  "ヨーロッパ近世": europeEarlyModernProblems,
  "安土桃山時代": azuchiMomoyamaProblems,
  "安土桃山の文化": azuchiCultureProblems,
  "江戸時代のしくみ": edoSystemProblems,
  "江戸初期の外交": edoEarlyDiplomacyProblems,
  "江戸の産業と都市": edoIndustryProblems,
  "元禄〜享保": genrokuKyohoProblems,
  "田沼〜寛政": tanumaKanseiProblems,
  "文化文政〜天保": bunkaBunseiTenpoProblems,
  "17,18世紀ヨーロッパ": europe17_18cProblems,
};
