export interface Repository {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  siteUrl: string;
  repoUrl?: string;
}
