const PATH = "./data.json";
const fs = require("fs");
class Post {
  get() {
    return this.readData();
  }
  getindividualBlog(id) {
      const posts = this.readData();
      const foundPost = posts.find((post) => post.id == id);
      return foundPost;
  }
  add(newPost) {
    const currentPosts = this.readData();
    currentPosts.unshift(newPost);
    this.storeData(currentPosts);
  }
  readData() {
    let rawData = JSON.parse(fs.readFileSync(PATH, "utf-8"));
    return rawData;
  }
  storeData(rawData) {
    let data = JSON.stringify(rawData);
    fs.writeFileSync(PATH, data);
  }
}

module.exports = Post;
