import { Ads } from "@/models/Ads.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { logger } from "@/utils/Logger.js"

class AdsService{
  async getAds() {
    const response = await api.get('/api/ads')
    const ads = response.data.map(adPojo => new Ads(adPojo))
    AppState.Ads = ads
    logger.log('[Successfully Got Ads]', response.data)
}

}

export const adsService = new AdsService()