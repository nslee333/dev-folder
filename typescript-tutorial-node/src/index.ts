import express, {Response, Request} from 'express';
const app = express();

app.get('/', (req: Request, res: Response): void => {

    const age: number = 39;


    res.json({message: "Please like the video!"});
})


app.listen('3001', (): void => {
    console.log("Server running!")
})