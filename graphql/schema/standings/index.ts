import definitions from './definitions';
import { Standings } from './type';
import { standings } from './query';

export const StandingsTypeDefs = definitions;
export const StandingsResolvers = {
  Standings,
  Query: {
    standings,
  },
};
