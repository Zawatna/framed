import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js";

export class SearchController extends BaseController {
  constructor() {
    super("api/search");
    this.router.get("/albums", this.getAlbumsByQuery);
  }
  /**
   * @param {import("express").Request} request,
   * @param {import("express").Response} response,
   * @param {import("express").NextFunction} next,
   */
  async getAlbumsByQuery(request, response, next) {
    try {
      const albumsQuery = request.query;
      const albums = await albumsService.getAlbumsByQuery(albumsQuery);
      response.send(albums);
    } catch (error) {
      next(error);
    }
  }
}
