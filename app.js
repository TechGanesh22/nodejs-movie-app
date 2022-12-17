const express = require("express");
const app = express();
const path = require("path");
const request = require("request");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
// app.use(express.static("public"));

app.get("/result", (req, res) => {
  let query = req.query.search; //here we get the value we search
  request(
    "https://api.themoviedb.org/3/search/movie?api_key=131d65e28d73c7a950aeab8efc2ee292&query=" +
      query,
    (error, response, body) => {
      if (error) {
        console.log(error);
      }
      let data = JSON.parse(body);
      // console.log(data);
      res.render("movies", { data: data, searchQuery: query });
    }
  );
});
app.get("/", (req, res) => {
  res.render("search");
});
app.listen(3000, () => {
  console.log("Server started at port 3000.");
});
