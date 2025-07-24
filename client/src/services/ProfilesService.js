import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Account } from "@/models/Account.js";
import { AppState } from "@/AppState.js";

class ProfilesService {


  async getProfilesByQuery(profileQuery) {
    AppState.profiles = [];
    AppState.searchTerm = profileQuery;
    const response = await api.get(`api/profiles/search?query=${profileQuery}`);
    logger.log(response.data);
    const profiles = response.data.map((pojo) => new Account(pojo));
    AppState.profiles = profiles;
  }
  async getProfileById(profileId) {
    AppState.profile = null
    const response = await api.get(`api/profiles/${profileId}`);
    logger.log("Profile Data? 🤼🫂👯🧑‍🤝‍🧑", response.data);
    const profile = new Account(response.data);
    AppState.profile = profile;
  }
}

export const profilesService = new ProfilesService();
