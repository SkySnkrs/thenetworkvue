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

    get createdTime(){
        return this.createdAt.toLocaleDateString('en-us', {day: "2-digit", month:"numeric", year:"2-digit"})
    }

    get likeCount(){
        return this.likes.length
    }
}