import { getData, apiRoutes } from "../hooks/useRequest";

export const getSingleProfile = async (slug) => {
  return await getData(apiRoutes.profile.single(slug));
};
