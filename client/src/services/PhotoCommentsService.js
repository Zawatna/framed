import { AppState } from "@/AppState.js"
import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class PhotoCommentsService {
    async getPhotoComments(photoId) {
        // logger.log('Service is getting photo comments 🏃‍♀️🏃‍♀️🖼️💬🏃‍♀️', photoId)
        AppState.photoComments = []
        const response = await api.get(`api/photos/${photoId}/comments`)
        logger.log('Got photocomments 🏃‍♀️🖼️💬💬🪪😀', response.data)
    }
}

export const photoCommentsService = new PhotoCommentsService()