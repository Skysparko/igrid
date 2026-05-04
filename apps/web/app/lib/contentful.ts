import type {
  AchieveCard,
  ContentfulAsset,
  ContentfulLink,
  FeaturesCard,
  HowItWorksStep,
  InfoCard,
  LandingScreenContent,
  WhiteLabelCard,
} from "~/types/contentful";

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID as string | undefined;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN as string | undefined;
const ENVIRONMENT = (import.meta.env.VITE_CONTENTFUL_ENVIRONMENT as string | undefined) ?? "master";
const LANDING_CONTENT_TYPE =
  (import.meta.env.VITE_CONTENTFUL_CONTENT_TYPE as string | undefined) ?? "igirdLandingScreen";

export function isContentfulConfigured(): boolean {
  return Boolean(SPACE_ID && ACCESS_TOKEN);
}

type RawEntry = { sys: { id: string }; fields: Record<string, unknown> };
type RawAsset = { sys: { id: string }; fields: Record<string, unknown> };

function buildIncludesMap(raw: {
  includes?: { Entry?: RawEntry[]; Asset?: RawAsset[] };
}): Map<string, unknown> {
  const map = new Map<string, unknown>();
  for (const entry of raw.includes?.Entry ?? []) {
    map.set(entry.sys.id, entry);
  }
  for (const asset of raw.includes?.Asset ?? []) {
    map.set(asset.sys.id, asset);
  }
  return map;
}

function resolveLink<T>(
  value: ContentfulLink | T | undefined,
  includes: Map<string, unknown>,
): T | undefined {
  if (!value) return undefined;
  const maybeLink = value as ContentfulLink;
  if (maybeLink?.sys?.type === "Link") {
    return includes.get(maybeLink.sys.id) as T | undefined;
  }
  return value as T;
}

function resolveLinks<T>(
  values: (ContentfulLink | T)[] | undefined,
  includes: Map<string, unknown>,
): T[] {
  if (!values) return [];
  return values.map((v) => resolveLink<T>(v, includes)).filter((v): v is T => v !== undefined);
}

export async function fetchLandingContent(): Promise<LandingScreenContent | null> {
  if (!SPACE_ID || !ACCESS_TOKEN) return null;

  const url = new URL(
    `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries`,
  );
  url.searchParams.set("content_type", LANDING_CONTENT_TYPE);
  url.searchParams.set("include", "2");
  url.searchParams.set("access_token", ACCESS_TOKEN);
  url.searchParams.set("limit", "1");

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Contentful request failed with status ${res.status}`);
  }

  const raw = await res.json();
  const entry: RawEntry | undefined = raw.items?.[0];
  if (!entry) return null;

  const includes = buildIncludesMap(raw);
  const f = entry.fields;

  return {
    tag: f.tag as string | undefined,
    title: f.title as string | undefined,
    description: f.description as string | undefined,
    buttonText1: f.buttonText1 as string | undefined,
    buttonText2: f.buttonText2 as string | undefined,
    info: f.info as string | undefined,
    image1: resolveLink<ContentfulAsset>(f.image1 as ContentfulLink | undefined, includes),
    activeLearnerNumbers: f.activeLearnerNumbers as string | undefined,
    activeLearnerText: f.activeLearnerText as string | undefined,
    coursesAvailableNumber: f.coursesAvailableNumber as string | undefined,
    coursesAvailableText: f.coursesAvailableText as string | undefined,
    completionRateNumber: f.completionRateNumber as string | undefined,
    completionRateText: f.completionRateText as string | undefined,
    companySectionTitle: f.companySectionTitle as string | undefined,
    companySectionCompanyNames: f.companySectionCompanyNames as string[] | undefined,
    achieveSectionTitle: f.achieveSectionTitle as string | undefined,
    achieveSectionCards: resolveLinks<AchieveCard>(
      f.achieveSectionCards as ContentfulLink[] | undefined,
      includes,
    ),
    infoCards: resolveLinks<InfoCard>(f.infoCards as ContentfulLink[] | undefined, includes),
    featuresTitle: f.featuresTitle as string | undefined,
    featuresDescription: f.featuresDescription as string | undefined,
    featuresCards: resolveLinks<FeaturesCard>(
      f.featuresCards as ContentfulLink[] | undefined,
      includes,
    ),
    howItWorksTitle: f.howItWorksTitle as string | undefined,
    howItWorksDescription: f.howItWorksDescription as string | undefined,
    howItWorksSteps: resolveLinks<HowItWorksStep>(
      f.howItWorksSteps as ContentfulLink[] | undefined,
      includes,
    ),
    trendingTitle: f.trendingTitle as string | undefined,
    categoryTitle: f.categoryTitle as string | undefined,
    newReleasesTag: f.newReleasesTag as string | undefined,
    newReleasesTitle: f.newReleasesTitle as string | undefined,
    newReleasesDescription: f.newReleasesDescription as string | undefined,
    newReleasesButtonText: f.newReleasesButtonText as string | undefined,
    whiteLabelTag: f.whiteLabelTag as string | undefined,
    whiteLabelTitle: f.whiteLabelTitle as string | undefined,
    whiteLabelDescription: f.whiteLabelDescription as string | undefined,
    whiteLabelCards: resolveLinks<WhiteLabelCard>(
      f.whiteLabelCards as ContentfulLink[] | undefined,
      includes,
    ),
    whiteLabelBigCardTitle: f.whiteLabelBigCardTitle as string | undefined,
    whiteLabelBigCardSubTitle: f.whiteLabelBigCardSubTitle as string | undefined,
    whiteLabelBigCardDescription: f.whiteLabelBigCardDescription as string | undefined,
    whiteLabelBigCardButtonText: f.whiteLabelBigCardButtonText as string | undefined,
    lastSectionTag: f.lastSectionTag as string | undefined,
    lastSectionTitle: f.lastSectionTitle as string | undefined,
    lastSectionDecription: f.lastSectionDecription as string | undefined,
    lastSectionButtonText1: f.lastSectionButtonText1 as string | undefined,
    lastSectionButtonText2: f.lastSectionButtonText2 as string | undefined,
    lastSectionInfo: f.lastSectionInfo as string | undefined,
  };
}
