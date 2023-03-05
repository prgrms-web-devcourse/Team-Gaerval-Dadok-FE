export interface APIJob {
  jobGroupKoreanName: APIJobGroup['koreanName'];
  jobGroupName: APIJobGroup['name'];
  jobNameKoreanName: APIJobName['koreanName'] | null;
  jobName: APIJobName['name'];
  order: APIJobName['order'];
}

export interface APIJobGroup {
  koreanName: string;
  name: string;
}

export interface APIJobName {
  koreanName: string;
  name: string;
  order: number;
}

export interface APIAllJob {
  jobs: {
    jobGroup: APIJobGroup;
    jobNames: APIJobName[];
  }[];
}
