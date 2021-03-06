import {
  Schedule,
  ScheduleTeam,
  Team,
  Player,
  Game,
  Standings,
} from '../generated';
import { getPeriod } from '../utils';

interface Linescore {
  score: string;
}

export function reducePlayer(data: any): Player {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    personId: data.personId,
    jersey: data.jersey,
    pos: data.pos,
    heightFeet: data.heightFeet,
    heightInches: data.heightInches,
    heightMeters: data.heightMeters,
    weightPounds: data.weightPounds,
    weightKilograms: data.weightKilograms,
    dateOfBirthUTC: data.dateOfBirthUTC,
    teams: data.teams,
  };
}

export function reduceTeam(data: any): Team {
  return {
    city: data.city,
    fullName: data.fullName,
    triCode: data.tricode,
    teamId: data.teamId,
    confName: data.confName,
    divName: data.divName,
    logo: getTeamLogoUrl(data.fullName),
  };
}

export function reduceSchedule(data: any): Schedule {
  return {
    gameId: data.gameId,
    clock: data.clock,
    isGameActivated: data.isGameActivated,
    startTimeUTC: data.startTimeUTC,
    startDateEastern: data.startDateEastern,
    nugget: data.nugget.text,
    period: data.period,
    periodString: getPeriod(data),
    vTeam: reduceScheduleTeam(data.vTeam),
    hTeam: reduceScheduleTeam(data.hTeam),
    seasonYear: data.seasonYear,
    statusNum: data.statusNum,
  };
}

export function reduceScheduleTeam(data: any): ScheduleTeam {
  return {
    teamId: data.teamId,
    linescore: data.linescore.map(({ score }: Linescore) => Number(score)),
    score: Number(data.score),
    loss: Number(data.loss),
    win: Number(data.win),
    triCode: data.triCode,
  };
}

export function reduceGame(data: any): Game {
  return {
    gameId: data.basicGameData.gameId,
    arena: data.basicGameData.arena.name,
    isGameActivated: data.basicGameData.isGameActivated,
    statusNum: data.basicGameData.statusNum,
    startTimeEastern: data.basicGameData.startTimeEastern,
    startTimeUTC: data.basicGameData.startTimeUTC,
    startDateEastern: data.basicGameData.startDateEastern,
    clock: data.basicGameData.clock,
    nugget: data.basicGameData.nugget.text || '',
    playoffs: data.basicGameData.playoffs
      ? { summary: data.basicGameData.playoffs.seriesSummaryText }
      : null,
    period: data.basicGameData.period,
    vTeam: reduceScheduleTeam(data.basicGameData.vTeam),
    hTeam: reduceScheduleTeam(data.basicGameData.hTeam),
    stats: data.stats,
  };
}

export function getTeamLogoUrl(teamName: string) {
  const teamNameUrl = teamName
    .toLowerCase()
    .replace(/ /g, '-')
    .replace('la-clippers', 'los-angeles-clippers');
  return `https://i.logocdn.com/nba/current/${teamNameUrl}.svg`;
}

export function reduceStandings(data: any): Standings[] {
  const east = data.east.map((team: any) => ({ ...team, conference: 'east' }));
  const west = data.east.map((team: any) => ({ ...team, conference: 'west' }));
  return [...east, ...west].map((team: any) => ({
    clinchedPlayoffsCode: team.clinchedPlayoffsCode,
    clinchedPlayoffsCodeV2: team.clinchedPlayoffsCodeV2,
    conference: team.conference,
    confRank: Number(team.confRank),
    gamesBehind: Number(team.gamesBehind),
    isWinStreak: team.isWinStreak,
    lastTenLoss: Number(team.lastTenLoss),
    lastTenWin: Number(team.lastTenWin),
    loss: Number(team.loss),
    lossPct: Number(team.lossPct),
    sortKey: {
      defaultOrder: Number(team.sortKey.defaultOrder),
      gamesBehind: Number(team.sortKey.gamesBehind),
      loss: Number(team.sortKey.loss),
      win: Number(team.sortKey.win),
      winPct: Number(team.sortKey.winPct),
    },
    streak: Number(team.streak),
    team: team.teamId,
    win: Number(team.win),
    winPct: Number(team.winPct),
  }));
}
