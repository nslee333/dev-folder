import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 1300;
app.use(cors())

app.get('/api/forecast/', async (request: Request, response: Response) =>  {
    return response.status(200).send("api/forcast success");
});


app.get('/api/realtime/', async (request: Request, response: Response) =>  {
    return response.status(200).send("api/realtime success");
});


app.get('/api/hourly/', async (request: Request, response: Response) =>  {
    return response.status(200).send("api/realtime success");
});






app.listen(port, () => {
    console.log(`Server has started listening on port ${port}`);
})