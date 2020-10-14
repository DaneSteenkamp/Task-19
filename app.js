const express = require("express");
const fs = require("fs");
const app = express();
const morgan = require("morgan");

app.use(express.json());
app.use(morgan("dev"));

//Creating the variable context and writing the responce to the file DB.json
const context = JSON.parse(fs.readFileSync("DB.json"));
app.get("/api", (req, res) => {
  res.send(context);
});

//Creating a post request wich writes additional data to the end of the array in db.json
app.post("/api/new", (req, res) => {
  const id = context[context.length - 1].id + 1;
  const newPost = Object.assign({ id }, req.body);

  context.push(newPost);
  fs.writeFile("DB.json", JSON.stringify(context), (err) => {
    res.status(201).json(context);
  });
});

//Creating a put request that loops through each item in the array and updates the info you input into postman
app.put("/api/new/:id", (req, res) => {
  const requestID = Number(req.params.id);
  const newPost = Object.assign({ id: requestID }, req.body);
  const Posts = [];
  context.forEach((post) => {
    if (post.id === requestID) {
      Posts.push(newPost);
    } else {
      Posts.push(post);
    }
  });

  fs.writeFile("DB.json", JSON.stringify(Posts), (err) => {
    res.status(201).json(Posts);
  });
});

// Deletes the object from the arry in db.json by entering the id number at the end URL in the postman application. eg http://localhost:8080/api/delete:3
app.delete("/api/delete/:id", (req, res) => {
  const requestID = Number(req.params.id);
  const Posts = context.filter((post) => post.id !== requestID);
  fs.writeFile("DB.json", JSON.stringify(Posts), (err) => {
    res.status(201).json(Posts);
  });
});

//The port that the server is running on
app.listen(8080, () => console.log("listning on port 8080..."));
