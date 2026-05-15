export interface ContentfulSys {
  id: string;
  type: string;
  contentType?: { sys: { id: string } };
}

export interface ContentfulLink {
  sys: { type: "Link"; linkType: "Entry" | "Asset"; id: string };
}

export interface ContentfulAsset {
  sys: ContentfulSys;
  fields: {
    title?: string;
    file?: {
      url: string;
      contentType?: string;
      details?: { size?: number; image?: { width: number; height: number } };
    };
  };
}

export interface AchieveCard {
  sys: ContentfulSys;
  fields: {
    title?: string;
    description?: string;
    buttonText?: string;
  };
}

export interface FeaturesCard {
  sys: ContentfulSys;
  fields: {
    title?: string;
    description?: string;
  };
}

export interface HowItWorksStep {
  sys: ContentfulSys;
  fields: {
    title?: string;
    description?: string;
  };
}

export interface InfoCard {
  sys: ContentfulSys;
  fields: {
    tag?: string;
    title?: string;
    description?: string;
    buttonText?: string;
    pricing?: string;
    multipleTags?: string[];
  };
}

export interface WhiteLabelCard {
  sys: ContentfulSys;
  fields: {
    title?: string;
    description?: string;
  };
}

export interface LandingScreenContent {
  tag?: string;
  title?: string;
  description?: string;
  buttonText1?: string;
  buttonText2?: string;
  info?: string;
  image1?: ContentfulAsset;
  activeLearnerNumbers?: string;
  activeLearnerText?: string;
  coursesAvailableNumber?: string;
  coursesAvailableText?: string;
  completionRateNumber?: string;
  completionRateText?: string;
  companySectionTitle?: string;
  companySectionCompanyNames?: string[];
  achieveSectionTitle?: string;
  achieveSectionCards?: AchieveCard[];
  infoCards?: InfoCard[];
  featuresTitle?: string;
  featuresDescription?: string;
  featuresCards?: FeaturesCard[];
  howItWorksTitle?: string;
  howItWorksMainTitle?: string;
  howItWorksDescription?: string;
  howItWorksSteps?: HowItWorksStep[];
  trendingTitle?: string;
  categoryTitle?: string;
  newReleasesTag?: string;
  newReleasesTitle?: string;
  newReleasesDescription?: string;
  newReleasesButtonText?: string;
  whiteLabelTag?: string;
  whiteLabelTitle?: string;
  whiteLabelDescription?: string;
  whiteLabelCards?: WhiteLabelCard[];
  whiteLabelBigCardTitle?: string;
  whiteLabelBigCardSubTitle?: string;
  whiteLabelBigCardDescription?: string;
  whiteLabelBigCardButtonText?: string;
  lastSectionTag?: string;
  lastSectionTitle?: string;
  lastSectionDecription?: string;
  lastSectionButtonText1?: string;
  lastSectionButtonText2?: string;
  lastSectionInfo?: string;
}
