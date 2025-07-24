import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Account } from "@/models/Account.js";
import { AppState } from "@/AppState.js";
import { Album } from "@/models/Album.js";
import { Photo } from "@/models/Photo.js";

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

  async getAllProfileAlbumns(profileId) {
    AppState.albums = []
    const response = await api.get(`api/profiles/${profileId}/albums`)
    logger.log(response.data)
    const profileAlbums = await response.data.map((podjo) => new Album(podjo))
    logger.log("profile albums 🚆🚂🚃🚄🚅", profileAlbums)
    AppState.albums = profileAlbums
  }

  async getAllProfilePhotos(profileId) {
    AppState.photos = []
    const response = await api.get(`api/profiles/${profileId}/photos`)
    const profilePhotos = await response.data.map((podjo) => new Photo(podjo))
    AppState.photos = profilePhotos

  }
}

export const profilesService = new ProfilesService();
