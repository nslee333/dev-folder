const express = require('express');
import {Request, Response} from 'express';
import { getDocuments } from './controller';
const app = express();
const port = 3001;
import {fetchCollection, addTask, deleteTask} from './db';

console.log("Hello")

app.get('/api/', async (req: Request, res: Response) => {
    try {
        res.send(":)")
        const collection = await getDocuments(); 
        res.status(200).json({collection});
    } catch (err) {
        console.error(err);
        res.status(400).json({message: Error});
    }
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