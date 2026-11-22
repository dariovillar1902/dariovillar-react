// Derives role, seniority level and freshness from a job title/timestamp so the
// job board can offer role chips, level/date filters and a "new" badge.

export const JOB_ROLES = [
  { key: 'ai', esp: 'Inteligencia artificial', eng: 'AI / ML', pattern: /\b(ai|ml|mlops|llm|nlp|machine learning|artificial intelligence|inteligencia artificial)\b/ },
  { key: 'qa', esp: 'QA', eng: 'QA', pattern: /\b(qa|sdet|tester|quality assurance|test automation|quality engineer)\b/ },
  { key: 'mobile', esp: 'Mobile', eng: 'Mobile', pattern: /\b(mobile|ios|android|react native|flutter|swift|kotlin)\b/ },
  { key: 'devops', esp: 'DevOps', eng: 'DevOps', pattern: /\b(devops|sre|site reliability|platform engineer|infrastructure|cloud engineer|sysadmin|kubernetes|terraform)\b/ },
  { key: 'data', esp: 'Datos', eng: 'Data', pattern: /\b(data|bi|etl|analytics|dba|database|datos)\b/ },
  { key: 'product', esp: 'Agilidad y producto', eng: 'Agile & product', pattern: /\b(product manager|product owner|scrum|agile coach|project manager|program manager|delivery manager)\b/ },
  { key: 'support', esp: 'Soporte técnico', eng: 'Tech support', pattern: /\b(support|helpdesk|help desk|soporte|it technician)\b/ },
  { key: 'fullstack', esp: 'Full stack', eng: 'Full stack', pattern: /\bfull[\s-]?stack\b/ },
  { key: 'frontend', esp: 'Frontend', eng: 'Frontend', pattern: /\b(front[\s-]?end|ui engineer|react|angular|vue|svelte)\b/ },
  { key: 'backend', esp: 'Backend', eng: 'Backend', pattern: /\b(back[\s-]?end|api|java|\.net|dotnet|node|golang|go developer|ruby|rails|php|django|python)\b/ },
];

export const GENERAL_ROLE = { key: 'software', esp: 'Software general', eng: 'General software' };

export const JOB_LEVELS = [
  { key: 'junior', esp: 'Junior', eng: 'Junior', rank: 0, pattern: /\b(junior|jr|trainee|intern|entry[\s-]?level|graduate)\b/ },
  { key: 'semi', esp: 'Semi senior', eng: 'Mid-level', rank: 1, pattern: /\b(semi[\s-]?senior|ssr|mid[\s-]?level|mid|intermediate)\b/ },
  { key: 'senior', esp: 'Senior o superior', eng: 'Senior+', rank: 2, pattern: /\b(senior|sr|lead|principal|staff|architect|head|manager|director)\b/ },
];

const NEW_JOB_MAX_DAYS = 3;
const SECONDS_PER_DAY = 86400;

export function getJobRole(title) {
  const t = (title || '').toLowerCase();
  const match = JOB_ROLES.find(role => role.pattern.test(t));
  return match ? match.key : GENERAL_ROLE.key;
}

// Levels are checked in order (junior, semi, senior) so "semi senior" is not read as "senior".
export function getJobLevel(title) {
  const t = (title || '').toLowerCase();
  const match = JOB_LEVELS.find(level => level.pattern.test(t));
  return match ? match.key : '';
}

export function getRoleLabel(key, isSpanish) {
  const role = [...JOB_ROLES, GENERAL_ROLE].find(r => r.key === key);
  if (!role) return key;
  return isSpanish ? role.esp : role.eng;
}

export function getLevelLabel(key, isSpanish) {
  const level = JOB_LEVELS.find(l => l.key === key);
  if (!level) return '';
  return isSpanish ? level.esp : level.eng;
}

// Unspecified level sorts after senior so it never hides labelled jobs when ordering by level.
export function getLevelRank(key) {
  const level = JOB_LEVELS.find(l => l.key === key);
  return level ? level.rank : JOB_LEVELS.length;
}

export function isNewJob(postedTimestamp, nowSeconds = Date.now() / 1000) {
  if (!postedTimestamp) return false;
  return nowSeconds - postedTimestamp <= NEW_JOB_MAX_DAYS * SECONDS_PER_DAY;
}

export const DATE_RANGES = [
  { key: 'all', days: null, esp: 'Cualquier fecha', eng: 'Any date' },
  { key: '1', days: 1, esp: 'Últimas 24 horas', eng: 'Last 24 hours' },
  { key: '7', days: 7, esp: 'Últimos 7 días', eng: 'Last 7 days' },
  { key: '30', days: 30, esp: 'Últimos 30 días', eng: 'Last 30 days' },
];

export function isWithinDays(postedTimestamp, days, nowSeconds = Date.now() / 1000) {
  if (days === null) return true;
  if (!postedTimestamp) return false;
  return nowSeconds - postedTimestamp <= days * SECONDS_PER_DAY;
}
