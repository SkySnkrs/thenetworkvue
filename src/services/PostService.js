import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Posts } from "@/models/Posts.js"
import { AppState } from "@/AppState.js"

class PostService {

  async likePost(id) {
    const response = await api.post(`/api/posts/${id}/like`)
    const postIndex = AppState.Posts.findIndex(post => id == post.id)
    AppState.Posts.splice(postIndex, 1, new Posts(response.data))
    logger.log('[Like Post]',response.data)
  }

  async getPosts() {
    AppState.Posts = []
    const response = await api.get('/api/posts')
    logger.log("[Get Posts]", response)
    const mapPosts = response.data.posts.map(postPojo => new Posts(postPojo))
    AppState.Posts = mapPosts
  }


}

export const postService = new PostService()