const Joi = require('joi');
const {validate} = require('joi')
const express = require('express');
const app = express();

app.use(express.json());

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

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given id was not found.');

    res.send(course);
    
});

app.post('/api/courses', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    const result = schema.validate(req.body);

    // if (!req.body.name || req.body.name.length < 3) {
    //     res.status(400).send('Name is required and should be a minimum of 3 characters.')
    // }

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
})


const port = process.send.PORT || 3013;
app.listen(port, () => console.log(`Listening on port ${port} ...`));