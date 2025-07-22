import { reactive } from "vue";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/Account.js').Account[]}*/
  profiles: [],

  /** @type {import('./models/Account.js').Account}*/
  profile: null,

  profileTags: [],

  albumTagsThatMatchSearch: [],
  photoTagsThatMatchSearch: [],

  /** @type {import('./models/Photo.js').Photo[]} */
  photos: [],

  /** @type {import('./models/Photo.js').Photo} */
  photo: null,

  /**@type {import ('./models/Album.js').Album[]}*/
  albums: [],

  /**@type {import ('./models/Album.js').Album} */
  album: null,
  searchTerm: null,

  // NOTE Used to select which photo to draw in popChoice modal vp, please leave alone!!!!
  choicePhotoIndex: 0,

  /**@type {import('./models/AlbumPhoto.js').AlbumPhoto[]} */
  albumPhotos: [],

  /**@type {import('./models/AlbumPhoto.js').AlbumPhoto} */
  albumPhoto: null,
});
