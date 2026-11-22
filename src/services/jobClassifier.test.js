import { getJobRole, getJobLevel, getLevelRank, isNewJob, isWithinDays } from './jobClassifier';

describe('getJobRole', () => {
  test.each([
    ['Senior Full Stack Go Developer (Go + Next.js)', 'fullstack'],
    ['Data Engineer', 'data'],
    ['Machine Learning Engineer', 'ai'],
    ['Senior QA Automation Engineer', 'qa'],
    ['iOS Developer', 'mobile'],
    ['DevOps Engineer', 'devops'],
    ['Product Owner', 'product'],
    ['React Frontend Developer', 'frontend'],
    ['Java Backend Developer', 'backend'],
    ['Technical Support Specialist', 'support'],
    ['Software Engineer', 'software'],
  ])('classifies "%s" as %s', (title, role) => {
    expect(getJobRole(title)).toBe(role);
  });

  test('falls back to general software when the title is empty', () => {
    expect(getJobRole(undefined)).toBe('software');
  });
});

describe('getJobLevel', () => {
  test('reads "semi senior" as semi, not senior', () => {
    expect(getJobLevel('Semi Senior Backend Developer')).toBe('semi');
  });

  test.each([
    ['Junior Developer', 'junior'],
    ['Senior Software Engineer', 'senior'],
    ['Tech Lead', 'senior'],
    ['Software Developer', ''],
  ])('classifies "%s" as "%s"', (title, level) => {
    expect(getJobLevel(title)).toBe(level);
  });

  test('ranks unspecified level after senior', () => {
    expect(getLevelRank('')).toBeGreaterThan(getLevelRank('senior'));
  });
});

describe('freshness helpers', () => {
  const now = 1_000_000_000;
  const day = 86400;

  test('marks jobs posted within 3 days as new', () => {
    expect(isNewJob(now - 2 * day, now)).toBe(true);
    expect(isNewJob(now - 5 * day, now)).toBe(false);
    expect(isNewJob(null, now)).toBe(false);
  });

  test('filters by date range and drops undated jobs when a range is set', () => {
    expect(isWithinDays(now - 6 * day, 7, now)).toBe(true);
    expect(isWithinDays(now - 8 * day, 7, now)).toBe(false);
    expect(isWithinDays(null, 7, now)).toBe(false);
    expect(isWithinDays(null, null, now)).toBe(true);
  });
});
