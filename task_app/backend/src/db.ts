import {ObjectId, MongoClient, Collection, InsertOneResult, DeleteResult} from 'mongodb';
require("dotenv").config();


type taskDocument = {
_id: ObjectId
}


const mongoClientConnection: () => MongoClient | Error = () => {
    const MongoClient: typeof import('mongodb').MongoClient = require('mongodb').MongoClient;

    if (process.env.URI === undefined) {
        return new Error("Environment Variable Error: URI is Undefined.");

    } else {
        const client: MongoClient = new MongoClient(process.env.URI);
        return client;
    }
}

// Function to grab all documents in database.
export const fetchCollection: () => Promise<taskDocument[] | Error> = async () => {
    const client: MongoClient | Error = mongoClientConnection();

    if (client instanceof MongoClient) {
        await client.connect().catch((err: Error) => {
            console.error(err);
        });

    } else {
        return new Error("MongoClient Error")
    }

    const taskCollection: Collection = client.db("task_app").collection("tasks");
    const result: taskDocument[] = await taskCollection.find({}).toArray();

    client.close();

    if (result === undefined) {
        return new Error("Database Error")
    } else {
        return result;
    } 
}

// Function to add a new task to the collection
export const addTask: (inputTask: object) => Promise <InsertOneResult | Error > = async (inputTask: object) => {
    const client: MongoClient | Error = mongoClientConnection();

    if (client instanceof MongoClient) {
        await client.connect().catch((err: Error) => {
            console.error(err);
        });

    } else {
        return new Error("MongoClient Error")
    }

    const taskCollection: Collection = client.db("task_app").collection("tasks");
    const addedTaskResult: InsertOneResult = await taskCollection.insertOne(inputTask);

    client.close();

    if (addedTaskResult === undefined) {
        return new Error("Database error at addTask().")
    } else {
        return addedTaskResult;
    }    
}

// Delete a task from the database.
export const deleteTask: (deleteId: ObjectId) => Promise<DeleteResult | Error > = async (deleteId: ObjectId ) => {
    const client: MongoClient | Error = mongoClientConnection();

    if (client instanceof MongoClient) {
        await client.connect().catch((err: Error) => {
            console.error(err);
        });
        
    } else {
        return new Error("MongoClient Error")
    }

    
    const deleteQuery = {
        _id: new ObjectId(deleteId)
    }
    
    const taskCollection: Collection = client.db("task_app").collection("tasks");
    const deleteResult: DeleteResult = await taskCollection.deleteOne(deleteQuery);
    
    client.close();
    
    if (deleteResult === undefined) {
        return new Error("Database error at deleteTask().");
    } else {
        return deleteResult;
    }
}

module.exports = {fetchCollection, addTask, deleteTask}