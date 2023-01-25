import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { AxiosError } from 'axios';
import { processCurrentWeather, processForecastWeather } from './weatherAPI';
import { CurrentWeather, ForecastCombined } from './types';

const app = express();
const port = 1300;

app.use(express.json(), cors());

// ^ Post request for current weather conditions.
app.post('/api/current', async (req: Request, res: Response) => {
  if (req.body.location !== undefined && req.body.metric !== undefined) {

    const result: CurrentWeather | AxiosError | Error 
    = await processCurrentWeather(req.body.location, req.body.metric);

    if (result instanceof AxiosError) {
      return res.status(500).send(result);
      
    } else {
      return res.status(200).send(result);
    }
      
  } else {
    return res.status(400)
    .send("Bad request - possible missing location and metric request parameters.");
  }
})

// ^ Post request for weather forecast.
app.post('/api/forecast', async (req: Request, res: Response) => {
  if (req.body.location !== undefined && req.body.metric !== undefined) {
      
    const result: ForecastCombined | AxiosError | Error 
    = await processForecastWeather(req.body.location, req.body.metric);

    if (req instanceof AxiosError) {
      return res.status(500).send(result);

    } else {
      return res.status(200).send(result);
    }

  } else {
    return res.status(400)
    .send("Bad request - possible missing location and metric request parameters.");
  }
})


app.listen(port, () => {
    console.log(`Server has started listening on port ${port}`);
});
