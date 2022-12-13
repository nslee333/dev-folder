const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.URI, {useNewUrlParser: true});
import {ObjectId} from 'mongodb';


client.connect(err => {
    const collection = client.db("task_app").collection("tasks");

    // Function to fetch all current tasks.
    const fetchCollection = async () => {
        try {
            return await collection.find();

        } catch (error) {
            console.error(error);
        }
    }

    // Function to add a new task to the collection.
    const addTask = async (inputTask: string) => {
        try {
            const taskDocument = {
                task: inputTask,
            }
            
            await collection.insertOne(taskDocument);

        } catch (error) {
            console.error(error);
        }
    }

    // Function to delete a specific task.
    const deleteTask = async (deleteId: ObjectId ) => {
        try {
            collection.deleteOne({_id: deleteId});


        } catch (error) {
            console.error(error);
        }
    }

    client.close();
})