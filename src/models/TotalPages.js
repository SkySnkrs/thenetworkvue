export class TotalPages{
    constructor(data){
        this.newer = data.newer;
        this.older = data.older;
        this.page = data.page;
        this.totalPages = data.totalPages
    }
}