import 'isomorphic-fetch';

export const REFRESH_GUILD = 'REFRESH_GUILD';
export const refreshGuild = () => ({
  type: REFRESH_GUILD
});

export const REFRESH_MEMBERS = 'REFRESH_MEMBERS';
export const refreshMembers = () => ({
  type: REFRESH_MEMBERS
});

export const REFRESH_TEAMS = 'REFRESH_TEAMS';
export const refreshTeams = () => ({
  type: REFRESH_TEAMS
});

export const CLEAR_REFRESH = 'CLEAR_REFRESH';
export const clearRefresh = () => ({
  type: CLEAR_REFRESH
});