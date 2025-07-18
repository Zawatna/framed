import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Photo } from "@/models/Photo.js";
import { AppState } from "@/AppState.js";

class PhotosService {
  async getPhotosByQuery(photoQuery) {
    AppState.photos = [];
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

  async deletePhoto(photoId) {
    const res = await api.delete(`api/photos/${photoId}`);
    logger.log("Deleted Photo: ", res.data);
    const photos = AppState.photos;
    const photoIndex = photos.findIndex((photo) => photo.id == photoId);
    photos.splice(photoIndex, 1);
  }
}

export const photosService = new PhotosService();
