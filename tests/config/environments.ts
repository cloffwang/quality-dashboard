export interface EnvConfig {
  name: 'prod' | 'stage';
  baseURL: string;
  showsStagingBanner: boolean;
  titleSuffix: string;
}

export const environments = {
  prod: {
    name: 'prod',
    baseURL: 'http://localhost:3000',
    showsStagingBanner: false,
    titleSuffix: '',
  },
  stage: {
    name: 'stage',
    baseURL: 'http://localhost:3001',
    showsStagingBanner: true,
    titleSuffix: ' (Staging)',
  },
} as const satisfies Record<'prod' | 'stage', EnvConfig>;
