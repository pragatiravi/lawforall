import constitutionData from './constitution.json';
import verifiedArticlesPart1 from './articles_part1.json';
import verifiedArticlesPart2 from './articles_part2.json';

export interface Article {
  article_number: string;
  title: string;
  official_title?: string;
  official_text?: string;
  simple_explanation: string;
  key_points: string[];
  example: string;
  do: string | string[];
  dont: string | string[];
}

export interface Part {
  part_number: string;
  title: string;
  articles: Article[];
}

export interface Schedule {
  schedule_number: number;
  title: string;
  content: string;
}

export interface Constitution {
  preamble: string;
  parts: Part[];
  schedules: Schedule[];
}

// Verified article data (typed)
interface VerifiedArticle {
  article_number: string;
  official_title: string;
  official_text: string;
  simple_explanation: string;
  key_points: string[];
  example: string;
  do: string[];
  dont: string[];
}

// Build a lookup map from verified articles
const verifiedMap = new Map<string, VerifiedArticle>();
[...verifiedArticlesPart1, ...verifiedArticlesPart2].forEach((article) => {
  verifiedMap.set((article as VerifiedArticle).article_number.toUpperCase(), article as VerifiedArticle);
});

/**
 * Merges verified article data into the base article.
 * Verified data takes priority where available.
 */
function enrichArticle(baseArticle: Article): Article {
  const key = baseArticle.article_number.toUpperCase();
  const verified = verifiedMap.get(key);
  if (!verified) return baseArticle;

  return {
    ...baseArticle,
    title: verified.official_title || baseArticle.title,
    official_title: verified.official_title,
    official_text: verified.official_text,
    simple_explanation: verified.simple_explanation,
    key_points: verified.key_points,
    example: verified.example,
    do: verified.do,
    dont: verified.dont,
  };
}

// Type assertion to ensure correctness
const data = constitutionData as Constitution;

/**
 * Returns the preamble text.
 */
export const getPreamble = (): string => {
  return data.preamble;
};

/**
 * Returns all parts with their articles (enriched with verified data).
 */
export const getParts = (): Part[] => {
  return data.parts.map((part) => ({
    ...part,
    articles: part.articles.map(enrichArticle),
  }));
};

/**
 * Returns all articles flattened into a single array (enriched with verified data).
 */
export const getAllArticles = (): Article[] => {
  const articles: Article[] = [];
  data.parts.forEach((part) => {
    part.articles.forEach((a) => {
      articles.push(enrichArticle(a));
    });
  });
  return articles;
};

/**
 * Retrieves a single article by its number (enriched with verified data).
 * @param {string | number} article_number - The article number (e.g., 1, "51A")
 */
export const getArticleByNumber = (article_number: string | number): Article | undefined => {
  const target = article_number.toString().toUpperCase();
  const allArticles = getAllArticles();
  return allArticles.find((a) => a.article_number.toUpperCase() === target);
};

/**
 * Returns all schedules.
 */
export const getSchedules = (): Schedule[] => {
    return data.schedules;
};

/**
 * Checks if an article has verified data.
 */
export const isVerifiedArticle = (article_number: string | number): boolean => {
  return verifiedMap.has(article_number.toString().toUpperCase());
};
