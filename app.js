const express = require("express");
const app = express();
const Post = require("./api/models/posts");
const postdata = new Post();
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
app.use(express.json());
// const posts = [
//   {
//     id: "1581461442206",
//     title: "This is a New Blog Post",
//     content: "This is the content! ",
//     post_image: "uploads/post-image-1581461442199.jpg",
//     added_date: "1581461442206"
//   }
// ];

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
  }
});

var upload = multer({ storage: storage });

const getExt = MimeType => {
  switch (MimeType) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpeg";
  }
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-origin", "*");
  next();
});

app.use("/uploads", express.static("uploads"));

app.get("/api/posts", (req, res) => {
  //   const test = {
  //     testing: "testing"
  //   };
  //   postdata.add(test);
  res.status(200).send(postdata.get());

  //   postdata.readData();
});

app.get("/api/posts/:post_id", (req, res) => {
  const postId = req.params.post_id;
  const foundPost = postdata.getindividualBlog(postId);
  if (foundPost) {
    res.status(200).send(foundPost);
  } else {
    res.status(404).send("Not Found");
  }
});

app.post("/api/posts", upload.single("post-image"), (req, res) => {
  const newPost = {
    id: `${Date.now()}`,
    title: req.body.title,
    content: req.body.content,
    post_image: req.file.path,
    added_date: `${Date.now()}`
  };
  postdata.add(newPost);
  res.status(201).send(newPost);
  //   console.log(req.body);
  //   console.log(req.file);
  //   res.status(201).send("OK");
});

app.listen(3000, () => console.log("Listening on localhost 3000!"));
