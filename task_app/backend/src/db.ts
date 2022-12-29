const dotenv = require("dotenv").config();
import {ObjectId, MongoClient, Collection, InsertOneResult} from 'mongodb';

 // Function to fetch all current tasks.\

 type taskDocument = {
    _id: ObjectId
  }


const mongoClientConnection: () => MongoClient = () => {
    const MongoClient = require('mongodb').MongoClient;
    const client = new MongoClient(process.env.URI, {useNewUrlParser: true});

    return client;
}


export const fetchCollection: () => Promise<taskDocument[] | Error> = async () => {
    const client: MongoClient = mongoClientConnection();

    await client.connect().catch((err: Error) => {
        console.error(err);
    });

    const taskCollection: Collection = client.db("task_app").collection("tasks");
    const result: taskDocument[] = await taskCollection.find({}).toArray();

    client.close();

    if (result === undefined) {
        return new Error("Database Error at fetchCollection().")
    } else {
        return result;
    } 
}

// Function to add a new task to the collection
export const addTask: (inputTask: object) => Promise <Error | InsertOneResult> = async (inputTask: object) => {
    const client: MongoClient = mongoClientConnection();

    await client.connect().catch((err: Error) => {
        console.error(err);
    });

    const taskCollection = client.db("task_app").collection("tasks");
    const addedTaskResult = await taskCollection.insertOne(inputTask);

    client.close();

    if (addedTaskResult === undefined) {
        return new Error("Database error at addTask().")
    } else {
        return addedTaskResult;
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