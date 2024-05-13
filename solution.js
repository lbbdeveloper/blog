import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let posts = [
  {
    id: 1,
    title: "What is Lorem Ipsum",
    content:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design.",
    author: "Wiki A",
    date: "Date 1",
  },
  {
    id: 2,
    title: "Lorem Ipsum",
    content:
      "Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum, a 1st-century BC text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical and improper Latin. The first two words themselves are a truncation of dolorem ipsum ",
    author: "Wiki B",
    date: "Date 2",
  },
  {
    id: 3,
    title: "Versions of the Lorem ipsum text",
    content:
      "Versions of the Lorem ipsum text have been used in typesetting at least since the 1960s, when it was popularized by advertisements for Letraset transfer sheets.",
    author: "Wiki C",
    date: "Date 3",
  },
];

let lastId = 3;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// to get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

//to create a new post in database
app.post("/posts", (req, res) => {
  const newId = (lastId += 1);
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// to update a post
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;
  res.json(post);
});

// to get one post
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// to delete a post
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });
  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
