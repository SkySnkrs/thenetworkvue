import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/Posts.js').Posts[]}*/
  Posts: [],
  likedPosts: null,
  /** @type {import('./models/Ads.js').Ads[]}*/
  Ads: [],
  /** @type {import('./models/TotalPages.js').TotalPages}*/
  totalPages: null,
  /** @type {import('./models/ActiveProfile.js').ActiveProfile}*/
  activeProfile: null,
  /** @type {import('./models/Profile.js').Profile[]}*/
  Profile: []
})

