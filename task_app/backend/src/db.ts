const dotenv = require("dotenv").config();
import {ObjectId, MongoClient} from 'mongodb';

 // Function to fetch all current tasks.\

const mongoClientConnection:  () => MongoClient = () => {
    const MongoClient = require('mongodb').MongoClient;
    const client = new MongoClient(process.env.URI, {useNewUrlParser: true});

    return client;
}


export const fetchCollection = async () => {
    try {
        const client = mongoClientConnection();

        await client.connect().catch((err: Error) => {
            console.error(err);
        });

        const taskCollection = await client.db("task_app").collection("tasks");
        const result = await taskCollection.find({}).toArray();

        client.close();
        return result;

    } catch (error) {
        console.error(error);
        return error;
    } 
}

// Function to add a new task to the collection.
export const addTask = async (inputTask: object) => {
    try {
        const client = mongoClientConnection();;

        await client.connect().catch((err: Error) => {
            console.error(err);
        });

        const taskCollection = client.db("task_app").collection("tasks");
        const addedTaskResult = await taskCollection.insertOne(inputTask);

        client.close();
        return addedTaskResult;

    } catch (error) {
        console.error(error);
        return error;
    }
}

// Delete a task from the database.
export const deleteTask = async (deleteId: ObjectId ) => {
    try {
        const client = mongoClientConnection();

        client.connect().catch((err: Error) => {
            console.error(err);
        });

        const taskCollection = client.db("task_app").collection("tasks");

        const deleteQuery = {
            _id: new ObjectId(deleteId)
        }
        
        const deleteResult = await taskCollection.deleteOne(deleteQuery);
        
        client.close();
        return deleteResult;

    } catch (error) {
        console.error(error);
        return error;
    }
}


module.exports = {fetchCollection, addTask, deleteTask}