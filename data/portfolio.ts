export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  before?: string;
  insight?: string;
  transformation?: string;
  experience?: string;
}

export const portfolioData: PortfolioItem[] = []; // do not populate — nothing is confirmed yet
