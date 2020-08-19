import { getData, apiRoutes } from "../hooks/useRequest";

export const getSingleProfile = async (slug) => {
  return await getData(apiRoutes.profile.single(slug));
};
export const getGames = async (slug) => {
  return await getData(apiRoutes.games.all);
};
export const getCharactersByGame = async (slug) => {
  return await getData(apiRoutes.characters.charactersByGame(slug));
};
