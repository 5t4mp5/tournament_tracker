import axios from 'axios';

export const tournamentReducer = (
  state: Tournament = defaultTournamentState,
  action: TournamentAction
) => {
  switch (action.type) {
    case 'SET_TOURNAMENT':
      return action.tournament;
    default:
      return state;
  }
};

const setTournament = (data: Tournament) => {
  return {
    type: 'SET_TOURNAMENT',
    tournament: data,
  };
};

export const fetchTournament = (id: string) => {
  return (dispatch: any) => {
    return axios
      .get(`api/tournament/${id}`)
      .then((res) => res.data)
      .then((tournament) => {
        return dispatch(setTournament(tournament));
      });
  };
};

const defaultTournamentState: Tournament = {
  id: '',
  title: '',
  avatar: null,
  format: 'round-robin',
  status: 'open',
};

export interface Tournament {
  id: string;
  title: string;
  avatar: string | null;
  format: 'round-robin' | 'single-elimination';
  status: 'open' | 'locked';
  entrants?: Entrant[];
}

export interface Entrant {
  id: string;
  name: string;
  block: string;
  avatar: string | null;
}

export interface TournamentAction {
  type: 'SET_TOURNAMENT';
  tournament: Tournament;
}
