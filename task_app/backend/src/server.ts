import express from 'express';
import { Request, Response } from 'express';
import { addTask, deleteTask, fetchCollection } from './db';
import { InsertOneResult, ObjectId, DeleteResult } from 'mongodb';
import cors from 'cors';


const app = express();
const port = 1300;
app.use(express.json(), cors());


type taskDocument = {
    _id: ObjectId
  }


app.get('/api/', async (req: Request, res: Response) => {
    const collection: Error | taskDocument[] = await fetchCollection();

    if (collection instanceof Error) {
        console.error(Error);
        res.status(400).json({message: Error});
        
    } else {
        res.status(200).json({collection});
    }
});


app.post('/api/', async (req: Request, res: Response) => {
    const addTaskResult: Error | InsertOneResult = await addTask(req.body);

    if (addTaskResult instanceof Error) {
        console.error(Error);
        res.status(400).json({message: Error});

    } else {
        res.status(200).json(addTaskResult);
    }
});


app.delete('/api/', async (req: Request, res: Response) => {
    const deleteResult: Error | DeleteResult = await deleteTask(req.body._id);

    if (deleteResult instanceof Error)  {
        console.error(Error);
        res.status(400).json({message: Error});

    } else {
        res.status(200).json(deleteResult);
    } 
});


app.listen(port, () => {
    console.log(`Server has started listening on port ${port}`);
});