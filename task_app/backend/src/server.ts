import express from 'express';
import { Request, Response } from 'express';
import { addTask, deleteTask, fetchCollection } from './db';
import { WithId } from 'mongodb';
import cors from 'cors';


const app = express();
const port = 1300;
app.use(express.json());
app.use(cors());

app.get('/api/', async (req: Request, res: Response) => {
    try {
        const collection: any = await fetchCollection();

        if (collection) {
            res.status(200).json({collection});
        }

    } catch (err) {
        console.error(err);
        res.status(400).json({message: Error});
    }
});


app.post('/api/', async (req: Request, res: Response) => {
    try {
        const addTaskResult = await addTask(req.body);

        if (addTaskResult) {
            res.status(200).json(addTaskResult);
        }

    } catch (error) {
        console.error(error);
        res.status(400).json({message: Error});
    }
});


app.delete('/api/', async (req: Request, res: Response) => {
    try {
        const deleteResult = await deleteTask(req.body._id);

        if (deleteResult) {
            res.status(200).json(deleteResult);
        } 
        
    } catch (error) {
        console.error(error);
        res.status(400).json({message: Error});
    }
});


app.listen(port, () => {
    console.log(`Server has started listening on port ${port}`);
});