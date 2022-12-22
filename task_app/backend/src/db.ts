const dotenv = require("dotenv").config();
import {ObjectId} from 'mongodb';

 // Function to fetch all current tasks.
export const fetchCollection = async () => {
    try {
        const MongoClient = require('mongodb').MongoClient;
        const client = new MongoClient(process.env.URI, {useNewUrlParser: true});

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
        const MongoClient = require('mongodb').MongoClient;
        const client = new MongoClient(process.env.URI, {useNewUrlParser: true});

        await client.connect().catch((err: Error) => {
            console.error(err);
        });

        const taskCollection = client.db("task_app").collection("tasks");
        const addedTaskResult = await taskCollection.insertOne(inputTask);

        client.close();
        return addedTaskResult;

    } catch (error) {
        console.error(error);
    }
}

// Delete a task from the database.
export const deleteTask = async (deleteId: ObjectId ) => {
    try {
        const MongoClient = require('mongodb').MongoClient;
        const client = new MongoClient(process.env.URI, {useNewUrlParser: true});

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
    }
}


module.exports = {fetchCollection, addTask, deleteTask}