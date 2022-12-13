const express = require('express');
import {Request, Response} from 'express';
const app = express();
const port = 3001;
import {fetchCollection, addTask, deleteTask} from './db';

app.get('/api/', (req: Request, res: Response) => {
    res.send("Sucessful get req")
});

app.post('/api/', (req: Request, res: Response) => {
    res.send("Sucessful post req")
});

app.delete('/api/', (req: Request, res: Response) => {
    res.send("Sucessful delete req")
})

app.listen(port, () => {
    console.log(`Server has started listening on port ${port}`);
})