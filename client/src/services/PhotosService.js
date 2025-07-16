import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Photo } from "@/models/Photo.js"
import { AppState } from "@/AppState.js"

class PhotosService {
  
  async createPhoto(formData) {
    const response = await api.post(`api/photos`, formData)
    logger.log("Did it work?♦️💖🗺️", response.data)
    return response.data
  }

  async getAllPhotos() {
    const res = await api.get('api/photos');
    logger.log('All Photos:', res.data);
    const photos = res.data.map((pojo) => new Photo(pojo));
    AppState.photos = photos;
  }


}

export const photosService = new PhotosService