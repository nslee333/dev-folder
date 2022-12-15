const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!!!!")
});

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"},
]

app.get("/api/courses", (req, res) => {
    res.send([1, 2, 3]);
});

app.get("/api/courses/:year/:month", (req, res) => {
    res.send(req.params);
});

// app.get("/api/courses/:id", (req, res) => {
//     res.send(req.params.id);
// });

//localhost:3000/api/posts/2018/1?sortBy=name
// ?sortBy=name
    // This is a query.

app.get("/api/posts/:year/:month", (req, res) => {
    res.send(req.query);
});


const port = process.send.PORT || 3013;
app.listen(port, () => console.log(`Listening on port ${port} ...`));