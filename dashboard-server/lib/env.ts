export type AppEnv = 'prod' | 'stage';

export function getAppEnv(): AppEnv {
  return process.env.APP_ENV === 'stage' ? 'stage' : 'prod';
}
