import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {import('./models/Photo.js').Photo[]} */
  photos: [],

  /** @type {import('./models/Photo.js').Photo} */
  photo: null,

  /**@type {import ('./models/Album.js').Album[]}*/
  albums: [],

  /**@type {import ('./models/Album.js').Album} */
  album: null,

  /**@type {import('./models/AlbumPhoto.js').AlbumPhoto[]} */
  albumPhotos: [],

  /**@type {import('./models/AlbumPhoto.js').AlbumPhoto} */
  albumPhoto: null,
});

