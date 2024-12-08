import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Posts } from "@/models/Posts.js"
import { AppState } from "@/AppState.js"
import { TotalPages } from "@/models/TotalPages.js"
import { ActiveProfile } from "@/models/ActiveProfile.js"
import { Profile } from "@/models/Profile.js"

class PostService {
  async goToNewPosts(link) {
    AppState.Posts = []
    AppState.totalPages = null
    const response = await api.get(link)
    logger.log("[Get New Posts]", response.data.posts)
    logger.log("[Get Total Pages]", response.data)
    const mapPosts = response.data.posts.map(postPojo => new Posts(postPojo))
    const pageData = new TotalPages(response.data)
    AppState.Posts = mapPosts
    AppState.totalPages = pageData
  }

  async deletePost(postId) {
    const response = await api.delete(`/api/posts/${postId}`)
    const postIndex = AppState.Posts.findIndex(post => post.id == postId)
    AppState.Posts.splice(postIndex, 1)
    logger.log('[Successfully Deleted]', response.data)
  }

  async createPost(value) {
    try {
        const response = await api.post('/api/posts', value);
        const post = new Posts(response.data);

        AppState.Posts = [post, ...AppState.Posts];

        logger.log('[Successfully Posted]', response.data);
    } catch (error) {
        logger.error('[Failed to Create Post]', error);
    }
}

  async likePost(id) {
    const response = await api.post(`/api/posts/${id}/like`)
    logger.log(response.status)
    const postIndex = AppState.Posts.findIndex(post => id == post.id)
    AppState.Posts.splice(postIndex, 1, new Posts(response.data))
    logger.log('[Like Post]',response.data)
  }

  async getPosts() {
    AppState.Posts = []
    AppState.totalPages = null
    const response = await api.get('/api/posts')
    logger.log("[Get Posts]", response.data.posts)
    const mapPosts = response.data.posts.map(postPojo => new Posts(postPojo))
    const pageData = new TotalPages(response.data)
    logger.log("[Get Total Pages]", response.data)
    AppState.totalPages = pageData
    AppState.Posts = mapPosts
  }


  
  async setActiveProfile(profileId) {
    AppState.Posts = [];
    AppState.activeProfile = null;
    AppState.totalPages = null;
  
    try {
      const [postsResponse, profileResponse] = await Promise.all([
        api.get(`/api/profiles/${profileId}/posts`),
        api.get(`/api/profiles/${profileId}`)
      ]);
  
      logger.log("[Get Posts]", postsResponse.data.posts);
      logger.log("[Get Profile Data]", profileResponse.data);
  
      AppState.activeProfile = new ActiveProfile(profileResponse.data);
      AppState.Posts = postsResponse.data.posts.map(postPojo => new Posts(postPojo));
      AppState.totalPages = new TotalPages(postsResponse.data);
  
      localStorage.setItem("activeProfileId", profileId);
    } catch (error) {
      logger.error("Error setting active profile:", error);
    }
  }

  async getPostsByQuery(searchQuery){
    
    AppState.Posts = [];
    AppState.totalPages = null;
    AppState.Profile = []
    const [postsResponse, profileResponse] = await Promise.all([
      api.get(`/api/posts?query=${searchQuery}`),
      api.get(`/api/profiles?query=${searchQuery}`)
    ]);
    const mapPosts = postsResponse.data.posts.map(postPojo => new Posts(postPojo))
    const profile = profileResponse.data.map(profilePojo => new Profile(profilePojo))
    const pageData = new TotalPages(postsResponse.data)
    AppState.Posts = mapPosts
    AppState.totalPages = pageData
    AppState.Profile = profile
    logger.log('[Got Posts By Search Query]', postsResponse.data)
    logger.log('[Got Profiles By Search Query]', profileResponse.data)

  }

  
}

export const postService = new PostService()