import { dbContext } from "../db/DbContext.js"

class PhotosService {
  async getPhotoById(photoId) {
    const photo = await dbContext.Photos.findById(photoId).populate('creator')
    return photo
  }
  async getAllPhotos() {
    const photos = await dbContext.Photos.find().populate('creator')
    return photos
  }
  async createPhoto(photoData) {
    const photo = await dbContext.Photos.create(photoData)
    await photo.populate('creator')
    return photo
  }



}

export const photosService = new PhotosService()