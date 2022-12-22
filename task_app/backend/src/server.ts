import express from 'express';
import {Request, Response} from 'express';
import { getDocuments } from './controller';
import { addTask, fetchCollection } from './db';

const app = express();
const port = 3000;
app.use(express.json());

app.get('/api/', async (req: Request, res: Response) => {
    try {

        const collection = await fetchCollection();
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

        res.status(200).json(addTaskResult);

    } catch (error) {
        console.error(error);
    }
});


app.delete('/api/', (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
});



app.listen(port, () => {
    console.log(`Server has started listening on port ${port}`);
});