import { TypeResolver } from '../../interface';
import { Standings as StandingsType } from '../../generated';

export const Standings: TypeResolver<StandingsType> = {
  clinchedPlayoffsCode: root => root.clinchedPlayoffsCode,
  clinchedPlayoffsCodeV2: root => root.clinchedPlayoffsCodeV2,
  confRank: root => root.confRank,
  gamesBehind: root => root.gamesBehind,
  isWinStreak: root => root.isWinStreak,
  lastTenLoss: root => root.lastTenLoss,
  lastTenWin: root => root.lastTenWin,
  loss: root => root.loss,
  lossPct: root => root.lossPct,
  sortKey: root => root.sortKey,
  streak: root => root.streak,
  team: (root, args, { loaders }) =>
    loaders.getTeamByIds.load((root.team as unknown) as string),
  win: root => root.win,
  winPct: root => root.winPct,
};
