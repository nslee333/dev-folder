const express = require('express');
import {Request, Response} from 'express';
const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {

});

app.listen(port, () => {
    console.log(`Server has started listening on port ${port}`);
})