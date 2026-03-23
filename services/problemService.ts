
import { SOCIAL_PROBLEMS } from '../data';
import { Problem } from '../types';
import { getDueItems } from './spacedRepetitionService';

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

/**
 * Returns up to 5 shuffled problems for a given category and subTopic.
 *
 * Subtopics:
 *   '選択式' → select, '記述式' → input, '並び替え' → sort
 */
export const getShuffledProblemSet = (category: string, subTopic: string): Problem[] => {
  const allForCategory = SOCIAL_PROBLEMS[category] || [];

  const typeMap: Record<string, string> = {
    '選択式': 'select',
    '記述式': 'input',
    '並び替え': 'sort',
  };
  const targetType = typeMap[subTopic];
  const filtered = targetType
    ? allForCategory.filter(p => p.type === targetType)
    : allForCategory;

  return shuffleArray(filtered).slice(0, 5);
};

/**
 * Returns up to `count` shuffled problems drawn from multiple categories.
 * Used by Master modes and Custom selection in Practice mode.
 */
export const getMultiCategoryProblemSet = (categories: string[], count: number = 5): Problem[] => {
  const allProblems: Problem[] = [];
  for (const cat of categories) {
    allProblems.push(...(SOCIAL_PROBLEMS[cat] || []));
  }
  return shuffleArray(allProblems).slice(0, count);
};

/**
 * Returns up to 5 Problems for SRS review (due items).
 * Looks up the full problem from SOCIAL_PROBLEMS by matching answer + questionPreview.
 */
export const getSrsProblemsForReview = (): Problem[] => {
  const dueItems = getDueItems();
  const problems: Problem[] = [];

  for (const item of dueItems) {
    const categoryProblems = SOCIAL_PROBLEMS[item.category] || [];
    const found =
      categoryProblems.find(p => {
        const ans = Array.isArray(p.answer) ? p.answer.join(' ') : p.answer;
        return ans === item.answer && p.data.question.startsWith(item.questionPreview);
      }) ||
      categoryProblems.find(p => {
        const ans = Array.isArray(p.answer) ? p.answer.join(' ') : p.answer;
        return ans === item.answer;
      });

    if (found) {
      problems.push(found);
    } else {
      // Fallback: synthetic select problem from stored data
      problems.push({
        type: 'input',
        data: { question: item.questionPreview },
        answer: item.answer,
      });
    }
  }

  return shuffleArray(problems).slice(0, 5);
};
