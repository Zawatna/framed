import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";
import { Account } from "@/models/Account.js";
import { Photo } from "@/models/Photo.js";
import { Album } from "@/models/Album.js";
import { Pop } from "@/utils/Pop.js";

class TagsService {
  async getPhotoTagsByQuery(queryTerm) {
    AppState.photos = [];
    AppState.albums = [];
    AppState.searchTerm = queryTerm;
    const response = await api.get(`api/tags/search?query=${queryTerm}`);
    logger.log("Photos comeback by tag search?", response.data);
    if (response.data.photos.length > 0) {
      const photos = response.data.photos.map((pojo) => new Photo(pojo));
      AppState.photos = photos;
    }
    if (response.data.albums.length > 0) {
      const albums = response.data.albums.map((pojo) => new Album(pojo));
      AppState.albums = albums;
    }
    if (AppState.albums.length <= 0 && AppState.photos.length <= 0) {
      Pop.error(
        "No results",
        "No albums or photos are currently using this tag",
        "You could be the first"
      );
    }
  }

  // async getProfilesByQuery(profileQuery) {
  //   AppState.profiles = [];
  //   AppState.searchTerm = profileQuery;
  //   const response = await api.get(`api/profiles/search?query=${profileQuery}`);
  //   logger.log(response.data);
  //   const profiles = response.data.map((pojo) => new Account(pojo));
  //   AppState.profiles = profiles;
  // }
}

export const tagsService = new TagsService();
