export interface APIProfileJob {
  jobGroupKoreanName: APIJobGroup['koreanName'];
  jobGroupName: APIJobGroup['name'];
  jobNameKoreanName: APIJob['koreanName'] | null;
  jobName: APIJob['name'];
  order: APIJob['order'];
}

export interface APIJobGroup {
  koreanName: string;
  name: string;
  jobs: APIJob[];
}

export interface APIJob {
  koreanName: string;
  name: string;
  order: number;
}

export interface APIAllJob {
  jobGroups: APIJobGroup[];
}
