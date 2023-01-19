import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { AxiosError } from 'axios';
import { cityQueryArray, cityRealtimeData } from './types';
import { processCurrentWeather, processForecastWeather } from './weatherAPI';


const app = express();
const port = 1300;

app.use(express.json(), cors());

// Current weather.
app.get('/api/current/', async (request: Request, response: Response) => {
    if (request.body.location !== undefined && request.body.metric !== undefined) {

        const result = await processCurrentWeather(request.body.location, request.body.metric);
        if (result instanceof AxiosError) {
            return response.status(500).send(result);
        } else {
            return response.status(200).send(result);
        }
    } else {
        return response.status(400).send("Bad request - possible missing location and metric request parameters.")
    }
})


app.get('/api/forecast', async (request: Request, response: Response) => {
    if (request.body.location !== undefined && request.body.metric !== undefined) {
        
        const result = await processForecastWeather(request.body.location, request.body.metric);

        if (result instanceof AxiosError) {
            return response.status(500).send(result);
        } else {
            return response.status(200).send(result);
        }

    } else {
        return response.status(400).send("Bad request - possible missing location and metric request parameters.");
    }
})


app.listen(port, () => {
    console.log(`Server has started listening on port ${port}`);
});
