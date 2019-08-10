import { QueryResolvers, Standings } from '../../generated';

export const standings: QueryResolvers.ScheduleResolver<Standings[]> = async (
  root,
  { date },
  { dataSources },
) => {
  return dataSources.nbaAPI.getConferenceStandings(date);
};
