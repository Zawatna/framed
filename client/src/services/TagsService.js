import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";

class TagsService {
  async getPhotoTagsByQuery(queryTerm) {
    const response = await api.get(`api/tags/search?query=${queryTerm}`)
    logger.log("Photos comeback by tag search?", response.data)
  }

  // async getProfilesByQuery(profileQuery) {
  //     AppState.profiles = [];
  //     AppState.searchTerm = profileQuery;
  //     const response = await api.get(`api/profiles/search?query=${profileQuery}`);
  //     logger.log(response.data);
  //     const profiles = response.data.map((pojo) => new Account(pojo));
  //     AppState.profiles = profiles;
  //   }



}

export const tagsService = new TagsService()