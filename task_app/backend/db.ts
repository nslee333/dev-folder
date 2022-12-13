const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.URI, {useNewUrlParser: true});
import {ObjectId} from 'mongodb';

 // Function to fetch all current tasks.
const fetchCollection = async () => {
    try {
        client.connect(async (err: Error) => {
            const collection = client.db("task_app").collection("tasks");
            await collection.find();
            client.close();
        });
    } catch (error) {
        console.error(error);
    } 
}

// Function to add a new task to the collection.
const addTask = async (inputTask: string) => {
    try {
        client.connect(async (err: Error) => {
            const collection = client.db("task_app").collection("tasks");
            
            const taskDocument = {
                task: inputTask,
            }

            await collection.insertOne(taskDocument);
            client.close();
        });
    } catch (error) {
        console.error(error);
    }
}

// Delete a task from the database.
const deleteTask = async (deleteId: ObjectId ) => {
    try {
        client.connect(async (err: Error) => {
            const collection = client.db("task_app").collection("tasks");
            await collection.deleteOne({_id: deleteId});
            client.close();
        })

    } catch (error) {
        console.error(error);
    }
}


module.exports = {fetchCollection, addTask, deleteTask}