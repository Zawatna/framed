import { Album } from "@/models/Album.js";
import { AppState } from "../AppState.js";
import { Account } from "../models/Account.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class AccountService {
  async getAlbumsByAccountId() {
    const response = await api.get(`/account/albums`);
    logger.log(response.data);
    const albums = response.data.map((pojo) => new Album(pojo));
    AppState.userAlbums = albums;
  }
  async getAccount() {
    try {
      const res = await api.get("/account");
      AppState.account = new Account(res.data);
    } catch (err) {
      logger.error("HAVE YOU STARTED YOUR SERVER YET???", err);
    }
  }
}

export const accountService = new AccountService();
