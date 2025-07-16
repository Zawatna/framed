import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class PhotosService {
  async createPhoto(formData) {
    const response = await api.post(`api/photos`, formData)
    logger.log("Did it work?♦️💖🗺️", response.data)
    return response.data
  }


}

export const photosService = new PhotosService