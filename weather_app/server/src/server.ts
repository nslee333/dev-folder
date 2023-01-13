import express, { application } from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import {
    updateMetric,
    updateQueryParams,
    realtimeWeatherSort,
    forecastDailySort,
    forecastHourlySort
} from './api'
import { AxiosError } from 'axios';
import { cityQueryArray, cityRealtimeData } from './types';


const app = express();
const port = 1300;
app.use(express.json(), cors(), express.urlencoded({extended:true}));


app.get('/api/realtime', async (request: Request, response: Response) => {
    const apiResponse = await realtimeWeatherSort();

    if (apiResponse instanceof AxiosError) {
        return response.status(500).json(apiResponse);
    } else {
        return response.status(200).send(apiResponse);
    }
});


app.get('/api/weeklyForecast', async (request: Request, response: Response) => {
    const apiResponse = await forecastDailySort();

    if (apiResponse instanceof Error) {
        return response.status(500).send(apiResponse);
    } else {
        return response.status(200).send(apiResponse);
    }
});


app.get('/api/hourlyForecast', async (request: Request, response: Response) => {
    const apiResponse = await forecastHourlySort();

    if (apiResponse instanceof Error) {
        return response.status(500).send(apiResponse);
    } else {
        return response.status(200).send(apiResponse);
    }
});

app.post('/api/settings/metric/', async (request: Request, response: Response) => {
    const metric = request.body.metric;

    if (typeof metric === 'boolean') {
        updateMetric(!!metric);
        return response.status(200).send("Measurement system updated.");
    } else {
        return response.status(400).send("Bad request. Must include a metric query.")
    }
})


app.post('/api/settings/location', async (request: Request, response: Response) => {
    const locationQuery = request.body.locationQuery;
    
    if (typeof locationQuery === 'string' || typeof locationQuery === 'number') {
        updateQueryParams(locationQuery);
        return response.status(200).send("Default location updated.");
    } else {
        return response.status(400).send("Bad request. LocationQuery must be present and be type of either number or string.")
    }
});


app.listen(port, () => {
    console.log(`Server has started listening on port ${port}`);
})