import jobAPI from '@/apis/job';
import { useQuery } from '@tanstack/react-query';
import { OptionHTMLAttributes } from 'react';

const useAllJobQuery = () =>
  useQuery(['allJob'], () =>
    jobAPI.getAllJobs().then(({ data }) => {
      const jobGroups: OptionHTMLAttributes<HTMLOptionElement>[] = [];
      const jobs: {
        [index: string]: OptionHTMLAttributes<HTMLOptionElement>[];
      } = {};

      data.jobs.forEach(({ jobGroup, jobNames }) => {
        jobGroups.push({ value: jobGroup.name, label: jobGroup.koreanName });
        jobs[jobGroup.name] = jobNames.map(({ koreanName, name }) => ({
          value: name,
          label: koreanName,
        }));
      });

      return { jobGroups, jobs };
    })
  );

export default useAllJobQuery;
