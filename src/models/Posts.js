export class Posts{
    constructor(data){
        this.body = data.body;
        this.createdAt = new Date(data.createdAt);
        this.creator = data.creator;
        this.id = data.id;
        this.imgUrl = data.imgUrl;
        this.likeIds = data.likeIds;
        this.likes = data.likes;
        this.updatedAt = new Date(data.updatedAt)
    }
}