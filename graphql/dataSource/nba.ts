import { DataSource } from 'apollo-datasource';

import { Schedule, Team, Player, Game, Standings } from '../generated';
import { has, get, put } from '../utils/storage';
import { fetchUrl } from '../utils';
import {
  reduceSchedule,
  reduceTeam,
  reducePlayer,
  reduceGame,
  reduceStandings,
} from './reducers';

export class NbaAPI extends DataSource {
  baseURL = 'http://data.nba.net/10s/prod/';

  async getSchedule(date: string): Promise<Schedule[]> {
    const { games } = await fetchUrl(
      `${this.baseURL}v2/${date}/scoreboard.json`,
    );
    return games.map((game: any) => reduceSchedule(game));
  }

  async getGame(date: string, gameId: string): Promise<Game> {
    const data = await fetchUrl(`v1/${date}/${gameId}_boxscore.json`);
    return reduceGame(data);
  }

  async getTeams(date: string): Promise<Team[]> {
    const key = `${date}:teams`;
    if (has(key)) {
      return get(key);
    }

    const { league } = await fetchUrl(`${this.baseURL}v1/${date}/teams.json`);
    const teams = league.standard.map((team: any) => reduceTeam(team));
    put(key, teams, 86400);
    return teams;
  }

  async getPlayers(date: string): Promise<Player[]> {
    const key = `${date}:players`;
    if (has(key)) {
      return get(key);
    }

    const { league } = await fetchUrl(`v1/${date}/players.json`);
    const players = league.standard.map((team: any) => reducePlayer(team));
    put(key, players, 86400);
    return players;
  }

  async getConferenceStandings(date: string): Promise<Standings[]> {
    const key = `${date}:standings`;
    if (has(key)) {
      return get(key);
    }

    const data = await fetchUrl(
      `${this.baseURL}v1/${date}/standings_conference.json`,
    );

    const standings = reduceStandings(data.league.standard.conference);
    put(key, standings, 86400);

    return standings;
  }
}
