require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const AuthRouter = require("./modules/auth");
const ProfileRouter = require("./modules/profile/profile.router");
const UserRouter = require("./modules/user");
const { createServer } = require("http");
const FollowRouter = require("./modules/follow");
const PostRouter = require("./modules/post");
const CommentRouter = require("./modules/comment");
const UploadRouter = require("./modules/upload/upload.router");
const errorHandler = require("./common/errorHandler");
const { Server } = require("socket.io");
const EventEmitter = require("events");
const ioEvent = new EventEmitter();

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);

  console.log("Mongodb connected");
  const app = express();

  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });
  global.io = io;

  io.on("connection", (socket) => {
    console.log("socket connected", socket.id);

    socket.emit("hi", { messgage: "chay roi ban oi" });
    socket.on("test", (data) => console.log(data));

    socket.on("disconnect", () => {
      console.log("socket disconnected", socket.id);
    });
  });
  app.use(express.json());
  app.use(cors());
  app.use((req, res, next) => {
    req.io = io;
    req.ioEvent = ioEvent;
    next();
  });
  app.use(express.json());

  app.use(express.static("public"));

  //Router

  app.use("/api/auth", AuthRouter);
  app.use("/api/profile", ProfileRouter);
  app.use("/api/upload", UploadRouter);
  app.use("/api/posts", PostRouter);
  app.use("/api/comments", CommentRouter);
  app.use("/api/follows", FollowRouter);
  app.use("/api/users", UserRouter);
  app.use(errorHandler);

  const port = process.env.PORT || 9000;

  httpServer.listen(port, (err) => {
    if (err) throw err;

    console.log(`Server connected ${port}`);
  });
}

main();
