import { dbContext } from "../db/DbContext.js"

class PhotosService {
  async createPhoto(photoData) {
    const photo = await dbContext.Photos.create(photoData)
    await photo.populate('creator')
    return photo
  }


}

export const photosService = new PhotosService()