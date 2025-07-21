import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Album } from "@/models/Album.js";
import { AppState } from "@/AppState.js";
import { AlbumPhoto } from "@/models/AlbumPhoto.js";
import { Tag } from "@/models/Tag.js";
import { AlbumTag } from "@/models/AlbumTag.js";

class AlbumsService {
  async getMostAlbumsTagsById(profileId) {
    const response = await api.get(`api/profiles/${profileId}/tags`)
    AppState.profileTags = response.data
    return response.data
  }
  async getAlbumsByQuery(searchTerm) {
    AppState.albums = [];
    const response = await api.get(`api/albums/search?query=${searchTerm}`);
    logger.log(response.data);
    const albums = response.data.map((album) => new Album(album));
    AppState.albums = albums;
  }
  async getAlbumById(albumId) {
    AppState.album = null;
    const response = await api.get(`api/albums/${albumId}`);
    // logger.log("specific album!", response.data);
    const album = new Album(response.data);
    AppState.album = album;
    logger.log("appstate album", AppState.album);
  }

  async getAlbumPictureById(albumId) {
    AppState.album = null;
    const response = await api.get(`api/albums/${albumId}/albumphotos`);
    // logger.log("album pics", response.data);
    const pictures = response.data.map((picture) => new AlbumPhoto(picture));
    // AppState.albumPhotos = pictures;
    return pictures;
  }

  async createAlbum(editableAlbumData) {
    const response = await api.post(`api/albums`, editableAlbumData);
    logger.log("Is there a new album? 🖼️🖼️🖼️🫙", response.data);
    const album = new Album(response.data);
    AppState.albums.unshift(album);
    return album.id;
  }

  async getAllAlbums() {
    const response = await api.get("api/albums?limit=3");
    // logger.log("albums", response.data);
    const albums = response.data.map((album) => new Album(album));
    logger.log("reformatted albums", albums);
    AppState.albums = albums;
  }
}

export const albumsService = new AlbumsService();
