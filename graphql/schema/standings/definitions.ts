import { gql } from 'apollo-server-lambda';

const definitions = gql`
  extend type Query {
    standings(date: String!): [Standings!]!
  }

  type Standings {
    clinchedPlayoffsCode: String
    clinchedPlayoffsCodeV2: String
    conference: String!
    confRank: Int!
    gamesBehind: Float!
    isWinStreak: Boolean!
    lastTenLoss: Int!
    lastTenWin: Int!
    loss: Int!
    lossPct: Float!
    sortKey: SortKey!
    streak: Int!
    team: Team!
    win: Int!
    winPct: Float!
  }

  type SortKey {
    defaultOrder: Int!
    gamesBehind: Int!
    loss: Int!
    win: Int!
    winPct: Int!
  }
`;

export default () => [definitions];
