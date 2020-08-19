const mongoose = require("mongoose");

const URI =
  "mongodb+srv://ZydeInsta:Zyde123@cluster0.ng0yt.mongodb.net/ZydeInstaNode?retryWrites=true&w=majority";

const conncetDB = async () => {
  await mongoose
    .connect(URI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .catch((error) => console.log(error));
  console.log("Database Connected...!");
};
module.exports = conncetDB;
