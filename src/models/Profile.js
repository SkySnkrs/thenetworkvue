export class Profile {
    constructor(data) {
      this.id = data._id;
      this.email = data.email;
      this.name = data.name;
      this.picture = data.picture;
      this.linkedin = data.linkedin;
      this.graduated = data.graduated;
      this.resume = data.resume;
      this.class = data.class;
      this.coverImg = data.coverImg;
      this.github = data.github
      this.bio = data.bio
    }
  }
  