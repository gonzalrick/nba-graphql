import { makeExecutableSchema } from 'graphql-tools';
import { gql } from 'apollo-server-lambda';

import { GameTypeDefs, GameResolvers } from './game';
import { ScheduleTypeDefs, ScheduleResolvers } from './schedule';
import { PlayerTypeDefs, PlayerResolvers } from './player';
import { TeamTypeDefs, TeamResolvers } from './team';
import { StandingsTypeDefs, StandingsResolvers } from './standings';

const typeDef = gql`
  type Query
`;

export const schema = makeExecutableSchema({
  typeDefs: [
    typeDef,
    GameTypeDefs,
    ScheduleTypeDefs,
    PlayerTypeDefs,
    TeamTypeDefs,
    StandingsTypeDefs,
  ],
  resolvers: [
    GameResolvers,
    ScheduleResolvers,
    StandingsResolvers,
    PlayerResolvers,
    TeamResolvers,
  ],
});
