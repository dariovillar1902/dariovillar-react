// Job Search Service — 9 API sources
// ✅ Remotive API: remote tech jobs (free, no key)
// ✅ Arbeitnow API: tech jobs global (free, no key)
// ✅ RemoteOK API: remote jobs (free, no key)
// ✅ Himalayas API: remote jobs with salary data (free, no key)
// ✅ JSearch API: LinkedIn/Indeed/Glassdoor aggregator (RapidAPI key)
// ✅ Mercado Libre Careers (Eightfold AI): direct company portal (free, no key)
// ✅ GetOnBoard API: LATAM tech jobs (free, no key)
// ✅ Ashby HQ: Mural, Linear, PostHog, WorkOS, Deel, Sentry, LiveKit, Clerk, Close, Replit
// ✅ Workday API (POST): Chevron, Halliburton, Baker Hughes, Weatherford
// 🔗 Direct links: LinkedIn, Indeed AR, Bumeran, Zonajobs, Computrabajo,
//    WorkingNomads, WeWorkRemotely, Wellfound, Remote.co,
//    Globant, Tiendanube, Ualá, OLX, MeLi
// 🔗 IT Recruiters BA: DR Reclutamiento IT, Michael Page, Robert Half,
//    Hays, Adecco, Experis
// 🔗 Oil & Gas / Engineering: ExxonMobil, Shell, SLB, TotalEnergies, BP,
//    YPF, PAE, Pluspetrol, Tenaris, Ternium, Tecpetrol, Techint, Raizen

const TECH_KEYWORDS = [
  'angular', 'react', 'typescript', 'javascript', '.net', 'dotnet',
  'c#', 'csharp', 'sql', 'sql server', 'azure', 'node', 'nodejs',
  'next', 'nextjs', 'next.js', 'python', 'entity framework',
  'asp.net', 'git', 'github', 'gitlab', 'docker', 'kubernetes',
  'ci/cd', 'devops', 'agile', 'scrum', 'rest', 'api', 'microservices',
  'power apps', 'power bi', 'bootstrap', 'tailwind', 'sass', 'css',
  'html', 'jest', 'postman', 'redis', 'mongodb', 'postgresql',
  'aws', 'gcp', 'firebase', 'full stack', 'fullstack', 'backend',
  'frontend', 'vue', 'svelte', 'graphql', 'terraform', 'linux',
  'java', 'golang', 'go', 'rust', 'swift', 'kotlin', 'ruby',
  'rails', 'django', 'flask', 'spring', 'laravel', 'php',
  'elasticsearch', 'kafka', 'rabbitmq', 'nginx'
];

const TITLE_KEYWORDS = [
  { term: 'lead', weight: 15 },
  { term: 'senior', weight: 12 },
  { term: 'ssr', weight: 10 },
  { term: 'semi senior', weight: 10 },
  { term: 'semi-senior', weight: 10 },
  { term: 'full stack', weight: 10 },
  { term: 'fullstack', weight: 10 },
  { term: 'full-stack', weight: 10 },
  { term: 'software engineer', weight: 12 },
  { term: 'developer', weight: 8 },
  { term: 'frontend', weight: 6 },
  { term: 'backend', weight: 6 },
  { term: 'front-end', weight: 6 },
  { term: 'back-end', weight: 6 },
  { term: 'programador', weight: 8 },
  { term: 'desarrollador', weight: 8 },
  { term: 'ingeniero', weight: 8 },
  { term: 'architect', weight: 14 },
  { term: 'tech lead', weight: 15 },
  { term: 'staff', weight: 14 },
  { term: 'principal', weight: 14 },
];

const DISPLAY_MAP = {
  'c#': 'C#', 'csharp': 'C#',
  '.net': '.NET', 'dotnet': '.NET',
  'angular': 'Angular', 'react': 'React',
  'typescript': 'TypeScript', 'javascript': 'JavaScript',
  'sql': 'SQL', 'sql server': 'SQL Server',
  'azure': 'Azure', 'node': 'Node.js', 'nodejs': 'Node.js',
  'next': 'Next.js', 'nextjs': 'Next.js', 'next.js': 'Next.js',
  'python': 'Python', 'docker': 'Docker',
  'kubernetes': 'Kubernetes', 'git': 'Git',
  'github': 'GitHub', 'gitlab': 'GitLab',
  'entity framework': 'Entity Framework',
  'asp.net': 'ASP.NET', 'rest': 'REST', 'api': 'API',
  'ci/cd': 'CI/CD', 'devops': 'DevOps',
  'agile': 'Agile', 'scrum': 'SCRUM',
  'power apps': 'Power Apps', 'power bi': 'Power BI',
  'bootstrap': 'Bootstrap', 'tailwind': 'Tailwind',
  'sass': 'Sass', 'css': 'CSS', 'html': 'HTML',
  'jest': 'Jest', 'postman': 'Postman',
  'redis': 'Redis', 'mongodb': 'MongoDB',
  'postgresql': 'PostgreSQL', 'aws': 'AWS',
  'gcp': 'GCP', 'firebase': 'Firebase',
  'microservices': 'Microservices',
  'full stack': 'Full Stack', 'fullstack': 'Full Stack',
  'backend': 'Backend', 'frontend': 'Frontend',
  'vue': 'Vue', 'svelte': 'Svelte', 'graphql': 'GraphQL',
  'terraform': 'Terraform', 'linux': 'Linux',
  'java': 'Java', 'golang': 'Go', 'go': 'Go',
  'rust': 'Rust', 'swift': 'Swift', 'kotlin': 'Kotlin',
  'ruby': 'Ruby', 'rails': 'Rails', 'django': 'Django',
  'flask': 'Flask', 'spring': 'Spring', 'laravel': 'Laravel',
  'php': 'PHP', 'elasticsearch': 'Elasticsearch',
  'kafka': 'Kafka', 'rabbitmq': 'RabbitMQ', 'nginx': 'Nginx',
};

// ─── CORS proxy for APIs that don't send CORS headers ───
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

function proxiedFetch(url) {
  return fetch(CORS_PROXY + encodeURIComponent(url));
}

// ─── 1. Remotive API ───

const REMOTIVE_CATEGORIES = ['software-dev', 'data', 'devops'];

async function fetchRemotiveJobs() {
  const allJobs = [];
  for (const category of REMOTIVE_CATEGORIES) {
    try {
      const res = await fetch(
        `https://remotive.com/api/remote-jobs?category=${category}&limit=50`
      );
      if (!res.ok) continue;
      const data = await res.json();
      if (data.jobs) {
        allJobs.push(...data.jobs.map(job => ({
          id: `remotive-${job.id}`,
          title: job.title,
          company: job.company_name,
          companyLogo: job.company_logo || null,
          city: 'Remoto',
          isRemote: true,
          applyUrl: job.url,
          description: stripHtml(job.description || ''),
          salaryMin: parseSalary(job.salary, 'min'),
          salaryMax: parseSalary(job.salary, 'max'),
          salaryCurrency: 'USD',
          salaryPeriod: 'YEAR',
          employmentType: job.job_type || 'full_time',
          postedTimestamp: job.publication_date
            ? Math.floor(new Date(job.publication_date).getTime() / 1000)
            : null,
          publisher: 'Remotive',
          tags: job.tags || [],
        })));
      }
    } catch (e) {
      console.warn('Remotive fetch error:', e);
    }
  }
  return allJobs;
}

// ─── 2. Arbeitnow API ───

async function fetchArbeitnowJobs() {
  const allJobs = [];
  try {
    for (let page = 1; page <= 2; page++) {
      const res = await fetch(`https://www.arbeitnow.com/api/job-board-api?page=${page}`);
      if (!res.ok) continue;
      const data = await res.json();
      if (data.data) {
        allJobs.push(...data.data.map(job => ({
          id: `arbeitnow-${job.slug}`,
          title: job.title,
          company: job.company_name,
          companyLogo: null,
          city: job.location || (job.remote ? 'Remoto' : 'No especificada'),
          isRemote: job.remote || false,
          applyUrl: job.url,
          description: stripHtml(job.description || ''),
          salaryMin: null,
          salaryMax: null,
          salaryCurrency: 'EUR',
          salaryPeriod: null,
          employmentType: 'FULLTIME',
          postedTimestamp: job.created_at || null,
          publisher: 'Arbeitnow',
          tags: job.tags || [],
        })));
      }
    }
  } catch (e) {
    console.warn('Arbeitnow fetch error:', e);
  }
  return allJobs;
}

// ─── 3. RemoteOK API ───

async function fetchRemoteOKJobs() {
  const allJobs = [];
  try {
    // RemoteOK may need CORS proxy
    let res;
    try {
      res = await fetch('https://remoteok.com/api');
    } catch {
      res = await proxiedFetch('https://remoteok.com/api');
    }
    if (!res.ok) return allJobs;
    const data = await res.json();
    // First element is metadata, rest are jobs
    const jobs = Array.isArray(data) ? data.slice(1) : [];
    allJobs.push(...jobs.filter(j => j.position).map(job => ({
      id: `remoteok-${job.id}`,
      title: job.position,
      company: job.company,
      companyLogo: job.company_logo || job.logo || null,
      city: job.location || 'Remoto',
      isRemote: true,
      applyUrl: job.url || `https://remoteok.com/l/${job.id}`,
      description: stripHtml(job.description || ''),
      salaryMin: job.salary_min ? Number(job.salary_min) : null,
      salaryMax: job.salary_max ? Number(job.salary_max) : null,
      salaryCurrency: 'USD',
      salaryPeriod: 'YEAR',
      employmentType: 'FULLTIME',
      postedTimestamp: job.epoch || (job.date ? Math.floor(new Date(job.date).getTime() / 1000) : null),
      publisher: 'RemoteOK',
      tags: job.tags || [],
    })));
  } catch (e) {
    console.warn('RemoteOK fetch error:', e);
  }
  return allJobs;
}

// ─── 4. Himalayas API ───

async function fetchHimalayasJobs() {
  const allJobs = [];
  try {
    let res;
    try {
      res = await fetch('https://himalayas.app/jobs/api?limit=50');
    } catch {
      res = await proxiedFetch('https://himalayas.app/jobs/api?limit=50');
    }
    if (!res.ok) return allJobs;
    const data = await res.json();
    const jobs = data.jobs || [];
    allJobs.push(...jobs.map(job => ({
      id: `himalayas-${job.id}`,
      title: job.title,
      company: job.companyName || (job.company && job.company.name) || '',
      companyLogo: (job.company && job.company.logo) || null,
      city: job.locationRestrictions
        ? (Array.isArray(job.locationRestrictions) ? job.locationRestrictions.join(', ') : job.locationRestrictions)
        : 'Worldwide',
      isRemote: true,
      applyUrl: job.applicationLink || job.externalUrl || `https://himalayas.app/jobs/${job.id}`,
      description: stripHtml(job.description || job.excerpt || ''),
      salaryMin: job.minSalary || null,
      salaryMax: job.maxSalary || null,
      salaryCurrency: job.salaryCurrency || 'USD',
      salaryPeriod: 'YEAR',
      employmentType: job.type || 'FULLTIME',
      postedTimestamp: job.pubDate
        ? Math.floor(new Date(job.pubDate).getTime() / 1000)
        : null,
      publisher: 'Himalayas',
      tags: job.categories || job.tags || [],
    })));
  } catch (e) {
    console.warn('Himalayas fetch error:', e);
  }
  return allJobs;
}

// ─── 5. JSearch API (RapidAPI) ───

const JSEARCH_QUERIES = [
  'Software Engineer Buenos Aires',
  'Full Stack Developer Buenos Aires',
  '.NET Developer Buenos Aires',
  'React Developer Buenos Aires',
];

async function fetchJSearchJobs() {
  const key = process.env.REACT_APP_JSEARCH_API_KEY;
  if (!key || key === 'your_key_here') return []; // Skip if not configured

  const allJobs = [];
  const headers = {
    'X-RapidAPI-Key': key,
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
  };

  for (const query of JSEARCH_QUERIES) {
    try {
      const params = new URLSearchParams({
        query,
        page: '1',
        num_pages: '1',
        date_posted: 'month',
        country: 'ar',
      });
      const res = await fetch(
        `https://jsearch.p.rapidapi.com/search?${params}`,
        { headers }
      );
      if (!res.ok) {
        if (res.status === 429) break; // Rate limited, stop
        continue;
      }
      const data = await res.json();
      if (data.data) {
        allJobs.push(...data.data.map(job => ({
          id: `jsearch-${job.job_id}`,
          title: job.job_title,
          company: job.employer_name,
          companyLogo: job.employer_logo || null,
          city: job.job_city || (job.job_is_remote ? 'Remoto' : 'No especificada'),
          isRemote: job.job_is_remote || false,
          applyUrl: job.job_apply_link,
          description: job.job_description || '',
          salaryMin: job.job_min_salary || null,
          salaryMax: job.job_max_salary || null,
          salaryCurrency: job.job_salary_currency || 'USD',
          salaryPeriod: job.job_salary_period || 'YEAR',
          employmentType: job.job_employment_type || 'FULLTIME',
          postedTimestamp: job.job_posted_at_timestamp || null,
          publisher: job.job_publisher || 'JSearch',
          tags: [],
        })));
      }
      // Small delay between queries to avoid rate limiting
      await new Promise(r => setTimeout(r, 300));
    } catch (e) {
      console.warn('JSearch fetch error:', e);
    }
  }
  return allJobs;
}

// ─── 6. Workday — Oil & Gas / Engineering companies ───
// Workday's /wday/cxs/{tenant}/{site}/jobs endpoint accepts unauthenticated
// POST requests and allows CORS (used for embedded job widgets).
// Slugs verified from known Workday tenant configurations.

const WORKDAY_COMPANIES = [
  { tenant: 'chevron',      wdNum: '5', site: 'Chevron',              name: 'Chevron' },
  { tenant: 'halliburton',  wdNum: '1', site: 'Halliburton_External', name: 'Halliburton' },
  { tenant: 'bakerhughes',  wdNum: '5', site: 'External',             name: 'Baker Hughes' },
  { tenant: 'weatherford',  wdNum: '5', site: 'External',             name: 'Weatherford' },
];

function parseWorkdayDate(postedOn) {
  if (!postedOn) return null;
  const now = Date.now() / 1000;
  const s = postedOn.toLowerCase();
  if (s.includes('today')) return now;
  if (s.includes('yesterday')) return now - 86400;
  const days = s.match(/(\d+)\+?\s*day/);
  if (days) return now - parseInt(days[1], 10) * 86400;
  const weeks = s.match(/(\d+)\+?\s*week/);
  if (weeks) return now - parseInt(weeks[1], 10) * 7 * 86400;
  const months = s.match(/(\d+)\+?\s*month/);
  if (months) return now - parseInt(months[1], 10) * 30 * 86400;
  return null;
}

async function fetchWorkdayJobs() {
  const allJobs = [];

  for (const company of WORKDAY_COMPANIES) {
    try {
      const baseUrl = `https://${company.tenant}.wd${company.wdNum}.myworkdayjobs.com`;
      const apiUrl = `${baseUrl}/wday/cxs/${company.tenant}/${company.site}/jobs`;

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ appliedFacets: {}, limit: 50, offset: 0, searchText: '' }),
      });

      if (!res.ok) continue;
      const data = await res.json();
      const postings = data.jobPostings || [];

      allJobs.push(...postings.map((job, i) => {
        const path = job.externalPath || '';
        return {
          id: `workday-${company.tenant}-${job.jobReqId || i}`,
          title: job.title || '',
          company: company.name,
          companyLogo: null,
          city: job.locationsText || '',
          isRemote: /remote/i.test(job.locationsText || ''),
          applyUrl: path ? `${baseUrl}/en-US/${company.site}${path}` : baseUrl,
          description: (job.bulletFields || []).join(' '),
          salaryMin: null,
          salaryMax: null,
          salaryCurrency: 'USD',
          salaryPeriod: 'YEAR',
          employmentType: job.timeType || 'FULLTIME',
          postedTimestamp: parseWorkdayDate(job.postedOn),
          publisher: company.name,
          tags: [],
        };
      }));
    } catch (e) {
      console.warn(`Workday ${company.tenant} fetch error:`, e);
    }
  }

  return allJobs;
}

// ─── 7. Ashby HQ — direct company career portals ───

// Ashby is an ATS used by many product-led tech companies. Their public
// posting API requires no key and is CORS-friendly.
// Confirmed working slugs verified against live API (March 2026).

const ASHBY_COMPANIES = [
  { slug: 'mural',   name: 'Mural' },
  { slug: 'linear',  name: 'Linear' },
  { slug: 'posthog', name: 'PostHog' },
  { slug: 'workos',  name: 'WorkOS' },
  { slug: 'deel',    name: 'Deel' },
  { slug: 'sentry',  name: 'Sentry' },
  { slug: 'livekit', name: 'LiveKit' },
  { slug: 'clerk',   name: 'Clerk' },
  { slug: 'close',   name: 'Close' },
  { slug: 'replit',  name: 'Replit' },
];

async function fetchAshbyJobs() {
  const allJobs = [];

  for (const company of ASHBY_COMPANIES) {
    try {
      const url = `https://api.ashbyhq.com/posting-api/job-board/${company.slug}`;
      let res;
      try {
        res = await fetch(url);
      } catch {
        res = await proxiedFetch(url);
      }
      if (!res || !res.ok) continue;
      const data = await res.json();
      const jobs = Array.isArray(data.jobs) ? data.jobs : [];

      allJobs.push(...jobs.map(job => ({
        id: `ashby-${company.slug}-${job.id}`,
        title: job.title || '',
        company: company.name,
        companyLogo: null,
        city: job.location || (job.isRemote ? 'Remote' : ''),
        isRemote: job.isRemote || job.workplaceType === 'Remote',
        applyUrl: job.applyUrl || job.jobUrl || `https://jobs.ashbyhq.com/${company.slug}/${job.id}`,
        description: job.descriptionPlain || stripHtml(job.descriptionHtml || ''),
        salaryMin: null,
        salaryMax: null,
        salaryCurrency: 'USD',
        salaryPeriod: 'YEAR',
        employmentType: job.employmentType || 'FULLTIME',
        postedTimestamp: job.publishedAt
          ? Math.floor(new Date(job.publishedAt).getTime() / 1000)
          : null,
        publisher: company.name,
        tags: [job.department, job.team].filter(Boolean),
      })));
    } catch (e) {
      console.warn(`Ashby ${company.slug} fetch error:`, e);
    }
  }

  return allJobs;
}

// ─── 7. GetOnBoard — LATAM tech job board ───

// Public JSON:API (no key required). Categories fetched: programming,
// data-science, mobile, ML/AI, devops. CORS proxy used as fallback.

const GOB_CATEGORIES = [
  'programming',
  'data-science-analytics',
  'mobile-developer',
  'machine-learning-ai',
  'sysadmin-devops-qa',
];

async function fetchGetOnBoardJobs() {
  const allJobs = [];

  for (const cat of GOB_CATEGORIES) {
    try {
      const url = `https://getonbrd.com/api/v0/categories/${cat}/jobs?per_page=30&page=1&include=company`;
      let res;
      try {
        res = await fetch(url);
      } catch {
        res = await proxiedFetch(url);
      }
      if (!res || !res.ok) continue;
      const data = await res.json();

      // Build company name lookup from JSON:API `included` array
      const companyMap = {};
      if (Array.isArray(data.included)) {
        data.included.forEach(item => {
          if (item.type === 'company') {
            companyMap[String(item.id)] = (item.attributes && item.attributes.name) || '';
          }
        });
      }

      const jobs = Array.isArray(data.data) ? data.data : [];
      allJobs.push(...jobs.map(job => {
        const attrs = job.attributes || {};
        const companyRel = (job.relationships && job.relationships.company && job.relationships.company.data)
          || (job.company && job.company.data);
        const companyName = companyRel ? (companyMap[String(companyRel.id)] || '') : '';
        const countries = Array.isArray(attrs.countries) ? attrs.countries.join(', ') : (attrs.countries || 'LATAM');

        return {
          id: `getonbrd-${job.id}`,
          title: attrs.title || '',
          company: companyName,
          companyLogo: null,
          city: countries,
          isRemote: attrs.remote || false,
          applyUrl: (job.links && job.links.public_url) || `https://www.getonbrd.com/jobs/${job.id}`,
          description: stripHtml(attrs.description || attrs.description_headline || ''),
          salaryMin: attrs.min_salary || null,
          salaryMax: attrs.max_salary || null,
          salaryCurrency: 'USD',
          salaryPeriod: 'YEAR',
          employmentType: 'FULLTIME',
          postedTimestamp: attrs.published_at
            ? Math.floor(new Date(attrs.published_at).getTime() / 1000)
            : null,
          publisher: 'GetOnBoard',
          tags: [],
        };
      }));
    } catch (e) {
      console.warn(`GetOnBoard ${cat} fetch error:`, e);
    }
  }

  return allJobs;
}

// ─── 8. Mercado Libre — Eightfold AI portal ───

// Eightfold exposes a public JSON API at /api/apply/v2/jobs used by their
// hosted career sites. No key required; CORS proxy used as fallback.

async function fetchMercadoLibreJobs() {
  const allJobs = [];
  try {
    const apiUrl = 'https://mercadolibre.eightfold.ai/api/apply/v2/jobs?domain=mercadolibre&start=0&num=100&query=';
    let res;
    try {
      res = await fetch(apiUrl);
    } catch {
      res = await proxiedFetch(apiUrl);
    }
    if (!res || !res.ok) return allJobs;
    const data = await res.json();
    const positions = data.positions || [];
    allJobs.push(...positions.map(job => ({
      id: `meli-${job.id}`,
      title: job.name || job.title || '',
      company: 'Mercado Libre',
      companyLogo: 'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.21.22/mercadolibre/logo__large_plus@2x.png',
      city: job.location || 'Buenos Aires, AR',
      isRemote: /remot/i.test(job.location || ''),
      applyUrl: `https://mercadolibre.eightfold.ai/careers?pid=${job.id}`,
      description: stripHtml(job.description || ''),
      salaryMin: null,
      salaryMax: null,
      salaryCurrency: 'USD',
      salaryPeriod: 'YEAR',
      employmentType: 'FULLTIME',
      postedTimestamp: job.t_create
        ? Math.floor(new Date(job.t_create).getTime() / 1000)
        : null,
      publisher: 'Mercado Libre',
      tags: [],
    })));
  } catch (e) {
    console.warn('MercadoLibre fetch error:', e);
  }
  return allJobs;
}

// ─── Helpers ───

function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function parseSalary(salaryStr, type) {
  if (!salaryStr || typeof salaryStr !== 'string') return null;
  const numbers = salaryStr.match(/[\d,]+/g);
  if (!numbers || numbers.length === 0) return null;
  const parsed = numbers.map(n => parseInt(n.replace(/,/g, ''), 10)).filter(n => !isNaN(n));
  if (type === 'min') return parsed[0] || null;
  if (type === 'max') return parsed[parsed.length - 1] || parsed[0] || null;
  return null;
}

function extractTechTags(text) {
  if (!text) return [];
  const lower = text.toLowerCase();
  const found = new Set();
  TECH_KEYWORDS.forEach(keyword => {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(lower)) {
      found.add(DISPLAY_MAP[keyword] || keyword);
    }
  });
  return Array.from(found);
}

function scoreJob(job) {
  let score = 0;
  const title = (job.title || '').toLowerCase();
  const description = (job.description || '').toLowerCase();
  const combined = `${title} ${description} ${(job.tags || []).join(' ').toLowerCase()}`;
  const city = (job.city || '').toLowerCase();

  // Tech stack match (up to 40 points)
  const techTags = extractTechTags(combined);
  score += Math.min(techTags.length * 4, 40);

  // Title match (up to 25 points)
  let titleScore = 0;
  TITLE_KEYWORDS.forEach(({ term, weight }) => {
    if (title.includes(term)) titleScore = Math.max(titleScore, weight);
  });
  score += Math.min(titleScore, 25);

  // Location match (up to 15 points)
  if (city.includes('buenos aires') || city.includes('caba') || city.includes('argentina')) {
    score += 15;
  } else if (job.isRemote) {
    score += 12;
  } else if (city.includes('latam') || city.includes('latin america') || city.includes('south america') || city.includes('worldwide')) {
    score += 10;
  }

  // Recency bonus (up to 10 points)
  if (job.postedTimestamp) {
    const daysSincePosted = (Date.now() / 1000 - job.postedTimestamp) / 86400;
    if (daysSincePosted <= 3) score += 10;
    else if (daysSincePosted <= 7) score += 7;
    else if (daysSincePosted <= 14) score += 4;
    else if (daysSincePosted <= 30) score += 2;
  }

  // Salary info bonus (up to 10 points)
  if (job.salaryMin || job.salaryMax) score += 10;

  return Math.min(score, 100);
}

function deduplicateJobs(jobs) {
  const seen = new Map();
  jobs.forEach(job => {
    const key = job.id || `${job.title}-${job.company}`;
    if (!seen.has(key)) seen.set(key, job);
  });
  return Array.from(seen.values());
}

function getRelativeDate(timestamp) {
  if (!timestamp) return null;
  const now = Date.now() / 1000;
  const diffDays = Math.floor((now - timestamp) / 86400);
  if (diffDays <= 0) return { esp: 'Hoy', eng: 'Today' };
  if (diffDays === 1) return { esp: 'Ayer', eng: 'Yesterday' };
  if (diffDays < 7) return { esp: `Hace ${diffDays} días`, eng: `${diffDays} days ago` };
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return { esp: `Hace ${weeks} semana${weeks > 1 ? 's' : ''}`, eng: `${weeks} week${weeks > 1 ? 's' : ''} ago` };
  }
  const months = Math.floor(diffDays / 30);
  return { esp: `Hace ${months} mes${months > 1 ? 'es' : ''}`, eng: `${months} month${months > 1 ? 's' : ''} ago` };
}

// ─── Argentina / remote filter ────────────────────────────────────────────
// Returns true when a job is either:
//   • located in Argentina / LATAM (explicit mention), OR
//   • 100% remote with no explicit geographic restriction to another region.
//
// Pattern logic:
//   - Positive signals: argentina, buenos aires, latam, south america,
//     worldwide, global, work from anywhere, "remoto" (Spanish)
//   - Negative signals on remote jobs: united states, usa, north america,
//     europe, emea, uk, canada, australia, asia — when they appear as the
//     PRIMARY location constraint (not just in the description body).

const ARGENTINA_POSITIVE = /argentina|buenos\s*aires|caba|neuqu[eé]n|mendoza|c[oó]rdoba|rosario|patagonia|comodoro|santa\s*cruz|chubut|salta|tierra\s*del\s*fuego|latam|latin\s*am[eé]r|south\s*america|sudamer|worldwide|global|work\s*from\s*anywhere|anywhere|remoto/i;

const GEO_RESTRICTED = /\b(united\s*states|usa|u\.s\.?(\s|$)|north\s*america|europe\b|emea\b|uk\s*only|canada\s*only|australia\s*only|asia\s*only|india\s*only|apac\b)\b/i;

export function isArgentinaAccessible(job) {
  const loc = job.city || '';

  // Explicit Argentina / LATAM / worldwide mention → always include
  if (ARGENTINA_POSITIVE.test(loc)) return true;

  // Remote job with no geographic restriction in the location field → include
  if (job.isRemote && !GEO_RESTRICTED.test(loc)) return true;

  return false;
}

export function getGlassdoorUrl(companyName) {
  return `https://www.glassdoor.com/Search/results.htm?keyword=${encodeURIComponent(companyName)}`;
}

export function getOpenqubeUrl(companyName) {
  return `https://openqube.io/empresas?search=${encodeURIComponent(companyName)}`;
}

// ─── Direct Search Links for Job Boards without APIs ───

export function getJobBoardSearchLinks() {
  const devQueries = [
    'Software Engineer',
    'Full Stack Developer',
    'Desarrollador .NET',
    'React Developer',
  ];

  return {
    local: [
      {
        name: 'LinkedIn Jobs',
        icon: 'fab fa-linkedin',
        urls: devQueries.map(q => ({
          label: q,
          url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(q)}&location=Buenos%20Aires%2C%20Argentina&f_TPR=r2592000`,
        })),
      },
      {
        name: 'Indeed Argentina',
        icon: 'fas fa-search',
        urls: devQueries.map(q => ({
          label: q,
          url: `https://ar.indeed.com/jobs?q=${encodeURIComponent(q)}&l=Buenos+Aires`,
        })),
      },
      {
        name: 'Bumeran',
        icon: 'fas fa-briefcase',
        urls: [
          { label: 'Full Stack', url: 'https://www.bumeran.com.ar/empleos-busqueda-desarrollador-full-stack.html' },
          { label: '.NET', url: 'https://www.bumeran.com.ar/empleos-busqueda-.net.html' },
          { label: 'React', url: 'https://www.bumeran.com.ar/empleos-busqueda-react.html' },
        ],
      },
      {
        name: 'Zonajobs',
        icon: 'fas fa-map-marker-alt',
        urls: [
          { label: 'Desarrollador', url: 'https://www.zonajobs.com.ar/ofertas-de-trabajo/desarrollador-full-stack' },
          { label: '.NET', url: 'https://www.zonajobs.com.ar/ofertas-de-trabajo/.net' },
        ],
      },
      {
        name: 'Computrabajo',
        icon: 'fas fa-laptop-code',
        urls: [
          { label: 'Software', url: 'https://www.computrabajo.com.ar/trabajo-de-desarrollador-software' },
          { label: 'Full Stack', url: 'https://www.computrabajo.com.ar/trabajo-de-full-stack' },
        ],
      },
      {
        name: 'Mercado Libre',
        icon: 'fas fa-shopping-cart',
        urls: [
          { label: 'Todas las posiciones', url: 'https://mercadolibre.eightfold.ai/careers' },
          { label: 'Engineering', url: 'https://mercadolibre.eightfold.ai/careers?pid=&query=engineer' },
          { label: 'Software Developer', url: 'https://mercadolibre.eightfold.ai/careers?pid=&query=developer' },
        ],
      },
      {
        name: 'Ashby — Product Companies',
        icon: 'fas fa-rocket',
        urls: [
          { label: 'Mural', url: 'https://jobs.ashbyhq.com/mural' },
          { label: 'Linear', url: 'https://jobs.ashbyhq.com/linear' },
          { label: 'PostHog', url: 'https://jobs.ashbyhq.com/posthog' },
          { label: 'WorkOS', url: 'https://jobs.ashbyhq.com/workos' },
          { label: 'Deel', url: 'https://jobs.ashbyhq.com/deel' },
          { label: 'Sentry', url: 'https://jobs.ashbyhq.com/sentry' },
          { label: 'LiveKit', url: 'https://jobs.ashbyhq.com/livekit' },
          { label: 'Clerk', url: 'https://jobs.ashbyhq.com/clerk' },
          { label: 'Close', url: 'https://jobs.ashbyhq.com/close' },
          { label: 'Replit', url: 'https://jobs.ashbyhq.com/replit' },
        ],
      },
      {
        name: 'Tech Companies AR',
        icon: 'fas fa-building',
        urls: [
          { label: 'Globant', url: 'https://careers.globant.com/global/en' },
          { label: 'Tiendanube / Nuvemshop', url: 'https://www.tiendanube.com/jobs' },
          { label: 'Ualá', url: 'https://jobs.lever.co/uala' },
          { label: 'OLX Argentina', url: 'https://www.linkedin.com/company/olx/jobs/' },
          { label: 'Despegar', url: 'https://careers.despegar.com/' },
        ],
      },
    ],
    oilgas: [
      {
        name: 'ExxonMobil',
        icon: 'fas fa-oil-can',
        urls: [
          { label: 'Argentina / LATAM', url: 'https://jobs.exxonmobil.com/jobs?keywords=&location=Argentina&stretch=10&stretchUnit=MILES' },
          { label: 'Software / IT', url: 'https://jobs.exxonmobil.com/jobs?keywords=software+engineer&location=Argentina' },
        ],
      },
      {
        name: 'Chevron',
        icon: 'fas fa-oil-can',
        urls: [
          { label: 'Todas las posiciones', url: 'https://chevron.wd5.myworkdayjobs.com/en-US/Chevron' },
          { label: 'Software / IT', url: 'https://chevron.wd5.myworkdayjobs.com/en-US/Chevron?q=software' },
          { label: 'Argentina', url: 'https://chevron.wd5.myworkdayjobs.com/en-US/Chevron?locations=0cc3265bb0f801a6d25f014c1e010000' },
        ],
      },
      {
        name: 'Shell',
        icon: 'fas fa-oil-can',
        urls: [
          { label: 'Argentina', url: 'https://careers.shell.com/global/en/search-results?keywords=&country=AR' },
          { label: 'Software / Digital', url: 'https://careers.shell.com/global/en/search-results?keywords=software&country=AR' },
        ],
      },
      {
        name: 'SLB (Schlumberger)',
        icon: 'fas fa-oil-can',
        urls: [
          { label: 'Search jobs', url: 'https://careers.slb.com/job-search-results/?keyword=&location=Argentina' },
        ],
      },
      {
        name: 'TotalEnergies',
        icon: 'fas fa-oil-can',
        urls: [
          { label: 'Argentina', url: 'https://careers.totalenergies.com/global/en/search-results?keywords=&country=AR' },
        ],
      },
      {
        name: 'BP',
        icon: 'fas fa-oil-can',
        urls: [
          { label: 'Search jobs', url: 'https://www.bp.com/en/global/corporate/careers/jobs.html' },
        ],
      },
      {
        name: 'Halliburton',
        icon: 'fas fa-oil-can',
        urls: [
          { label: 'Search jobs', url: 'https://www.halliburton.com/en/careers/search-jobs?country=AR' },
        ],
      },
      {
        name: 'Baker Hughes',
        icon: 'fas fa-oil-can',
        urls: [
          { label: 'Argentina', url: 'https://careers.bakerhughes.com/global/en/search-results?keywords=&location=Argentina' },
        ],
      },
      {
        name: 'YPF',
        icon: 'fas fa-industry',
        urls: [
          { label: 'Trabajá en YPF', url: 'https://www.ypf.com/trabaja-con-nosotros' },
        ],
      },
      {
        name: 'PAE — Pan American Energy',
        icon: 'fas fa-industry',
        urls: [
          { label: 'Carreras', url: 'https://www.pae.com.ar/sustentabilidad/personas/unete-al-equipo' },
        ],
      },
      {
        name: 'Pluspetrol',
        icon: 'fas fa-industry',
        urls: [
          { label: 'Trabajá con nosotros', url: 'https://www.pluspetrol.net/es/carreras' },
        ],
      },
      {
        name: 'Grupo Techint — Tenaris / Ternium / Tecpetrol',
        icon: 'fas fa-hard-hat',
        urls: [
          { label: 'Tenaris Careers', url: 'https://www.tenaris.com/en/careers' },
          { label: 'Ternium Careers', url: 'https://careers.ternium.com' },
          { label: 'Tecpetrol', url: 'https://www.tecpetrol.com/en/about-us/working-at-tecpetrol' },
          { label: 'Techint Engineering', url: 'https://www.techint.com/work-with-us' },
        ],
      },
      {
        name: 'Raizen',
        icon: 'fas fa-industry',
        urls: [
          { label: 'Vagas / Carreras', url: 'https://carreiras.raizen.com' },
        ],
      },
    ],
    recruiters: [
      {
        name: 'DR Reclutamiento IT',
        icon: 'fas fa-user-tie',
        urls: [
          { label: 'Oportunidades activas', url: 'https://www.drreclutamientoit.com.ar/oportunidades' },
        ],
      },
      {
        name: 'Michael Page — Tecnología',
        icon: 'fas fa-briefcase',
        urls: [
          { label: 'IT & Technology', url: 'https://www.michaelpage.com.ar/our-expertise/technology' },
          { label: 'Buscar posiciones', url: 'https://www.michaelpage.com.ar/jobs/technology' },
        ],
      },
      {
        name: 'Robert Half — IT',
        icon: 'fas fa-briefcase',
        urls: [
          { label: 'Tecnología', url: 'https://www.roberthalf.com/ar/es/trabajo/tecnologia' },
        ],
      },
      {
        name: 'Hays Argentina — IT',
        icon: 'fas fa-briefcase',
        urls: [
          { label: 'Technology', url: 'https://www.hays.com.ar/buscar-empleo/technology' },
        ],
      },
      {
        name: 'Experis (ManpowerGroup IT)',
        icon: 'fas fa-laptop-code',
        urls: [
          { label: 'Buscar empleos IT', url: 'https://www.manpower.com.ar/empleos?area=tecnologia' },
        ],
      },
      {
        name: 'Adecco Argentina — IT',
        icon: 'fas fa-briefcase',
        urls: [
          { label: 'IT & Digital', url: 'https://www.adecco.com.ar/busca-empleo?sector=it-digital' },
        ],
      },
    ],
    remote: [
      {
        name: 'Working Nomads',
        icon: 'fas fa-globe-americas',
        urls: [
          { label: 'Development', url: 'https://www.workingnomads.com/jobs?category=development' },
          { label: 'DevOps', url: 'https://www.workingnomads.com/jobs?category=devops' },
        ],
      },
      {
        name: 'WeWorkRemotely',
        icon: 'fas fa-wifi',
        urls: [
          { label: 'Full Stack', url: 'https://weworkremotely.com/categories/remote-full-stack-programming-jobs' },
          { label: 'Front-End', url: 'https://weworkremotely.com/categories/remote-front-end-programming-jobs' },
          { label: 'Back-End', url: 'https://weworkremotely.com/categories/remote-back-end-programming-jobs' },
        ],
      },
      {
        name: 'Wellfound (AngelList)',
        icon: 'fas fa-rocket',
        urls: [
          { label: 'Software Engineer', url: 'https://wellfound.com/jobs?role=Software+Engineer' },
          { label: 'Full Stack', url: 'https://wellfound.com/jobs?role=Full+Stack+Developer' },
        ],
      },
      {
        name: 'Remote.co',
        icon: 'fas fa-building',
        urls: [
          { label: 'Developer', url: 'https://remote.co/remote-jobs/developer/' },
          { label: 'Software', url: 'https://remote.co/remote-jobs/software/' },
        ],
      },
    ],
  };
}

// ─── Main fetch function ───

const SOURCES = [
  { name: 'JSearch',       fn: fetchJSearchJobs },
  { name: 'Remotive',      fn: fetchRemotiveJobs },
  { name: 'Arbeitnow',     fn: fetchArbeitnowJobs },
  { name: 'RemoteOK',      fn: fetchRemoteOKJobs },
  { name: 'Himalayas',     fn: fetchHimalayasJobs },
  { name: 'Workday',       fn: fetchWorkdayJobs },
  { name: 'Ashby',         fn: fetchAshbyJobs },
  { name: 'GetOnBoard',    fn: fetchGetOnBoardJobs },
  { name: 'Mercado Libre', fn: fetchMercadoLibreJobs },
];

export async function fetchAndRankJobs(onProgress) {
  const errors = [];
  const sourceResults = {};
  const total = SOURCES.length;

  // Fetch from all APIs in parallel
  const promises = SOURCES.map(async (source, idx) => {
    if (onProgress) {
      onProgress({ current: idx + 1, total, query: source.name });
    }
    try {
      const jobs = await source.fn();
      sourceResults[source.name] = jobs.length;
      return jobs;
    } catch (err) {
      errors.push({ query: source.name, error: err.message });
      sourceResults[source.name] = 0;
      return [];
    }
  });

  const results = await Promise.all(promises);
  const allJobs = results.flat();
  const unique = deduplicateJobs(allJobs);

  // Enrich and filter
  const enriched = unique.map(job => {
    const techTags = extractTechTags(
      `${job.title || ''} ${job.description || ''} ${(job.tags || []).join(' ')}`
    );
    const matchScore = scoreJob(job);
    const relDate = getRelativeDate(job.postedTimestamp);

    return {
      ...job,
      techTags,
      matchScore,
      postedAt: relDate,
      glassdoorUrl: getGlassdoorUrl(job.company),
      openqubeUrl: getOpenqubeUrl(job.company),
    };
  }).filter(job => job.techTags.length > 0 || job.matchScore >= 20);

  // Sort by match score descending, then by recency
  enriched.sort((a, b) => {
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
    return (b.postedTimestamp || 0) - (a.postedTimestamp || 0);
  });

  return { jobs: enriched, errors, totalRaw: allJobs.length, sourceResults };
}
