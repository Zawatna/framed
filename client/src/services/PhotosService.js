import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Photo } from "@/models/Photo.js";
import { AppState } from "@/AppState.js";

class PhotosService {
  async likePhoto(photoId) {
    const response = await api.put(`api/photos/${photoId}/like`);
    logger.log(response.data);
    const photo = new Photo(response.data);
    AppState.photo = photo;
  }
  async getPhotosByQuery(photoQuery) {
    AppState.photos = [];
    AppState.searchTerm = photoQuery;
    const response = await api.get(`api/photos/search?query=${photoQuery}`);
    logger.log(response.data);
    const photos = response.data.map((pojo) => new Photo(pojo));
    AppState.photos = photos;
  }

  async createPhoto(photoData) {
    const response = await api.post(`api/photos`, photoData);
    logger.log("Did it work?♦️💖🗺️", response.data);
    const photo = new Photo(response.data);
    AppState.photos.unshift(photo);
    return photo.id;
  }

  async getAllPhotos() {
    const res = await api.get("api/photos");
    logger.log("All Photos:", res.data);
    const photos = res.data.map((pojo) => new Photo(pojo));
    AppState.photos = photos;
  }

  async getPhotoById(photoId) {
    AppState.photo = null;
    const res = await api.get(`api/photos/${photoId}`);
    logger.log("Got Photo By Id: ", res.data);
    const photo = new Photo(res.data);
    AppState.photo = photo;
  }

async deleteAlbumPhoto(photoId){
  const response = await api.get(`api/albumphotos/${photoId}`)
  logger.log('albumphotos with photoid', response.data)
  const albumPhotos = response.data
  for (const albumPhoto of albumPhotos){
    await api.delete(`api/albumphotos/${albumPhoto.id}`)
    logger.log(`deleted photo with id of ${albumPhoto.photoId} off of the album ${albumPhoto.albumId}`)
  }
}

  async deletePhoto(photoId) {
    const res = await api.delete(`api/photos/${photoId}`);
    logger.log("Deleted Photo: ", res.data);
    const photos = AppState.photos;
    const photoIndex = photos.findIndex((photo) => photo.id == photoId);
    photos.splice(photoIndex, 1);
  }

  async getUserPhotos(profileId) {
    const res = await api.get(`api/profiles/${profileId}/photos`);
    logger.log("Got Photos by profile Id", res.data);
    const photos = res.data.map((pojo) => new Photo(pojo));
    AppState.photos = photos;
  }
}

export const photosService = new PhotosService();
