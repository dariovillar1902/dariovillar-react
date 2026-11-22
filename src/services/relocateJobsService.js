// Relocate & Travel Job Service
// Filters the same 11 job sources used by jobSearchService.js down to remote
// roles at companies based in / hiring from the US, Europe, LATAM or ANZ,
// scores them against a salary target (converted from ARS via live FX rate),
// and flags whether the listing suggests Argentina-based contractors are
// welcome. All authorization signals are heuristic — always verify manually.

import { fetchRawJobs, extractTechTags, getRelativeDate } from './jobSearchService';
import globalCompanies from '../data/globalCompanies.json';

const FX_API_URL = 'https://dolarapi.com/v1/dolares/blue';
const FALLBACK_ARS_PER_USD = 1500; // used only if the live FX fetch fails

const REGION_PATTERNS = {
  us: /united\s*states|\busa\b|\bu\.s\.?\b|\bcalifornia\b|new\s*york|\btexas\b|remote\s*-\s*us\b|us\s*only/i,
  europe: /united\s*kingdom|\buk\b|\bireland\b|\bgermany\b|\bfrance\b|\bspain\b|\bportugal\b|netherlands|\bbelgium\b|\bitaly\b|\bpoland\b|\bsweden\b|\bnorway\b|\bdenmark\b|\bfinland\b|\baustria\b|switzerland|europe\b|\bemea\b/i,
  latam: /latam|latin\s*am[eé]rica|south\s*america|argentina|\bbrazil\b|brasil|\bmexico\b|colombia|\bchile\b|\bperu\b|uruguay|ecuador|bolivia/i,
  anz: /australia|new\s*zealand|\banz\b|sydney|melbourne|auckland/i,
  worldwide: /worldwide|\bglobal\b|anywhere|international/i,
};

const REGION_LABELS = {
  us: { esp: 'Estados Unidos', eng: 'United States' },
  europe: { esp: 'Europa', eng: 'Europe' },
  latam: { esp: 'Latinoamérica', eng: 'LATAM' },
  anz: { esp: 'Australia / NZ', eng: 'Australia / NZ' },
  worldwide: { esp: 'Mundial', eng: 'Worldwide' },
};

const AUTH_NEGATIVE = /no\s*visa\s*sponsorship|must\s*be\s*(a\s*)?(us|uk|eu)\s*citizen|must\s*be\s*(currently\s*)?(located|residing|based)\s*in\s*the\s*(us|united\s*states|uk|canada|australia)|must\s*reside\s*in\s*(the\s*)?(us|united\s*states|uk|canada|australia)|relocation\s*(is\s*)?required|security\s*clearance|us\s*citizens?\s*only|w-?2\s*employee\s*only|on-?site\s*(only|required)/i;

const AUTH_POSITIVE = /work\s*from\s*anywhere|remote[-\s]?first|distributed\s*team|hire[s]?\s*(internationally|globally)|independent\s*contractor|\beor\b|open\s*to\s*candidates\s*(worldwide|globally|anywhere)|globally\s*remote/i;

export function getJobRegions(job) {
  const haystack = `${job.city || ''} ${job.description || ''}`;
  const matches = Object.keys(REGION_PATTERNS).filter(key => REGION_PATTERNS[key].test(haystack));
  if (matches.length === 0 && job.isRemote) return ['worldwide'];
  return matches;
}

export function getRegionLabel(key, isSpanish) {
  const label = REGION_LABELS[key];
  if (!label) return key;
  return isSpanish ? label.esp : label.eng;
}

export function getAuthorizationStatus(job) {
  const haystack = `${job.city || ''} ${job.description || ''}`;
  if (AUTH_NEGATIVE.test(haystack)) return 'unlikely';
  if (AUTH_POSITIVE.test(haystack)) return 'likely';
  const regions = getJobRegions(job);
  if (regions.includes('latam') || regions.includes('worldwide')) return 'likely';
  return 'unclear';
}

const AUTH_GUIDANCE = {
  likely: {
    esp: 'La publicación sugiere que contratan internacionalmente o como contractor — probablemente no necesites una visa de trabajo local, solo firmar un contrato como contractor (a veces vía Deel, Remote.com u Oyster) mientras vivís en o viajás desde Argentina.',
    eng: 'The listing suggests they hire internationally or as a contractor — you likely won\'t need a local work visa, just a contractor agreement (sometimes via Deel, Remote.com or Oyster) while based in or traveling from Argentina.',
  },
  unclear: {
    esp: 'No se pudo determinar la política de contratación desde la publicación. Revisá las FAQ de carreras de la empresa o preguntale directamente al reclutador si contratan contractors internacionales desde Argentina.',
    eng: 'Could not determine the hiring policy from the listing. Check the company\'s careers FAQ or ask the recruiter directly whether they hire international contractors from Argentina.',
  },
  unlikely: {
    esp: 'La publicación sugiere que se requiere patrocinio de visa o residencia local. Aplicar es posible, pero probablemente se necesite relocalización o visa.',
    eng: 'The listing suggests visa sponsorship or local residency is required. Applying is possible, but relocation or a visa would likely be necessary.',
  },
};

export function getAuthorizationGuidance(status, isSpanish) {
  const g = AUTH_GUIDANCE[status] || AUTH_GUIDANCE.unclear;
  return isSpanish ? g.esp : g.eng;
}

const REQUIREMENT_PATTERNS = [
  { key: 'experience', regex: /\b(\d+)\+?\s*years?\s*(of\s*)?experience\b/i },
  { key: 'degree', regex: /bachelor'?s?\s*degree|computer\s*science\s*degree|equivalent\s*(practical\s*)?experience/i },
  { key: 'english', regex: /fluent\s*english|english\s*proficiency|advanced\s*english|c1\s*english/i },
  { key: 'timezone', regex: /\b(UTC[+-]\d{1,2}|overlap[^.]{0,30}(hours|time\s*zone)|EST|PST|CET|GMT[+-]?\d*)\b/i },
  { key: 'visa', regex: AUTH_NEGATIVE },
  { key: 'contractor', regex: AUTH_POSITIVE },
];

// Pulls the sentence around each matched requirement pattern so the user can verify it themselves.
export function extractRequirementSnippets(description) {
  if (!description) return [];
  const sentences = description.split(/(?<=[.!?])\s+/);
  const found = [];
  const seenKeys = new Set();

  REQUIREMENT_PATTERNS.forEach(({ key, regex }) => {
    if (seenKeys.has(key)) return;
    const sentence = sentences.find(s => regex.test(s));
    if (sentence) {
      found.push(sentence.trim().slice(0, 160));
      seenKeys.add(key);
    }
  });

  return found.slice(0, 5);
}

let cachedFxRate = null;

export async function fetchArsPerUsd() {
  if (cachedFxRate) return cachedFxRate;
  try {
    const res = await fetch(FX_API_URL);
    if (!res.ok) return FALLBACK_ARS_PER_USD;
    const data = await res.json();
    const compra = Number(data.compra);
    const venta = Number(data.venta);
    if (!compra || !venta) return FALLBACK_ARS_PER_USD;
    cachedFxRate = (compra + venta) / 2;
    return cachedFxRate;
  } catch (e) {
    console.warn('FX rate fetch error:', e);
    return FALLBACK_ARS_PER_USD;
  }
}

const EUR_TO_USD = 1.08; // static approximation, EUR/USD is far less volatile than ARS/USD

const MIN_PLAUSIBLE_MONTHLY_USD = 300; // below this, treat as bad/incomplete source data rather than a real salary

function monthlyUsdFromSalary(job) {
  const value = job.salaryMax || job.salaryMin;
  if (!value) return null;
  let usd = value;
  if (job.salaryCurrency === 'EUR') usd = value * EUR_TO_USD;
  if (job.salaryCurrency === 'ARS') return null; // not comparable, treat as unknown
  const monthly = job.salaryPeriod === 'YEAR' ? usd / 12 : usd;
  return monthly >= MIN_PLAUSIBLE_MONTHLY_USD ? monthly : null;
}

export function getSalaryComparison(job, targetUsdMonthly) {
  const monthlyUsd = monthlyUsdFromSalary(job);
  if (monthlyUsd === null) return { status: 'unknown', monthlyUsd: null };
  return {
    status: monthlyUsd >= targetUsdMonthly ? 'meets_or_exceeds' : 'below',
    monthlyUsd: Math.round(monthlyUsd),
  };
}

export function getCuratedCompanies() {
  return globalCompanies;
}

export async function fetchRelocateJobs(onProgress) {
  const [{ unique, errors, totalRaw, sourceResults }, fxRate] = await Promise.all([
    fetchRawJobs(onProgress),
    fetchArsPerUsd(),
  ]);

  const enriched = unique
    .filter(job => job.isRemote)
    .map(job => {
      const techTags = extractTechTags(
        `${job.title || ''} ${job.description || ''} ${(job.tags || []).join(' ')}`
      );
      const regions = getJobRegions(job);
      const authorizationStatus = getAuthorizationStatus(job);
      const requirements = extractRequirementSnippets(job.description);
      const relDate = getRelativeDate(job.postedTimestamp);

      return {
        ...job,
        techTags,
        regions,
        authorizationStatus,
        requirements,
        postedAt: relDate,
      };
    })
    .filter(job => job.regions.length > 0 && (job.techTags.length > 0));

  return { jobs: enriched, errors, totalRaw, sourceResults, fxRate };
}
