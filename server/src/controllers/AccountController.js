import { Auth0Provider } from "@bcwdev/auth0provider";
import { accountService } from "../services/AccountService.js";
import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js";

export class AccountController extends BaseController {
  constructor() {
    super("account");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("/albums", this.getUserAlbums)
      .get("", this.getUserAccount)
      .put("", this.editUserAccount);
  }
  async getUserAlbums(req, res, next) {
    try {
      const userId = req.userInfo.id;
      const albums = await albumsService.getUserAlbums(userId);
      res.send(albums);
    } catch (error) {
      next(error);
    }
  }
  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo);
      res.send(account);
    } catch (error) {
      next(error);
    }
  }

  async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id;
      req.body.id = accountId;
      const account = await accountService.updateAccount(
        req.userInfo,
        req.body
      );
      res.send(account);
    } catch (error) {
      next(error);
    }
  }
}
