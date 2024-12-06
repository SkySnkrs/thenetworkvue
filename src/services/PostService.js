import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Posts } from "@/models/Posts.js"

class PostService {
  async getPosts() {
    const response = await api.get('/api/posts')
    logger.log("[Get Posts]", response)
    const mapablePosts = response.data.map(postPojo => new Posts(postPojo))
  }


}

export const postService = new PostService()