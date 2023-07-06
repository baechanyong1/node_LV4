const express = require("express");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const likesRouter = require("./routes/like");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3003;

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use("/api", [usersRouter]);
app.use("/api", [postsRouter]);
app.use("/api", [commentsRouter]);
app.use("/api", [likesRouter]);

app.listen(PORT, () => {
  console.log(PORT, "포트 번호로 서버가 실행되었습니다.");
});
