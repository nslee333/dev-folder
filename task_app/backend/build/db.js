"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.addTask = exports.fetchCollection = void 0;
const mongodb_1 = require("mongodb");
require("dotenv").config();
const mongoClientConnection = () => {
    const MongoClient = require('mongodb').MongoClient;
    if (process.env.URI === undefined) {
        return new Error("Environment Variable Error: URI is Undefined.");
    }
    else {
        const client = new MongoClient(process.env.URI);
        return client;
    }
};
// Function to grab all documents in database.
const fetchCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = mongoClientConnection();
    if (client instanceof mongodb_1.MongoClient) {
        yield client.connect().catch((err) => {
            console.error(err);
        });
    }
    else {
        return new Error("MongoClient Error");
    }
    const taskCollection = client.db("task_app").collection("tasks");
    const result = yield taskCollection.find({}).toArray();
    client.close();
    if (result === undefined) {
        return new Error("Database Error");
    }
    else {
        return result;
    }
});
exports.fetchCollection = fetchCollection;
// Function to add a new task to the collection
const addTask = (inputTask) => __awaiter(void 0, void 0, void 0, function* () {
    const client = mongoClientConnection();
    if (client instanceof mongodb_1.MongoClient) {
        yield client.connect().catch((err) => {
            console.error(err);
        });
    }
    else {
        return new Error("MongoClient Error");
    }
    const taskCollection = client.db("task_app").collection("tasks");
    const addedTaskResult = yield taskCollection.insertOne(inputTask);
    client.close();
    if (addedTaskResult === undefined) {
        return new Error("Database error at addTask().");
    }
    else {
        return addedTaskResult;
    }
});
exports.addTask = addTask;
// Delete a task from the database.
const deleteTask = (deleteId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = mongoClientConnection();
    if (client instanceof mongodb_1.MongoClient) {
        yield client.connect().catch((err) => {
            console.error(err);
        });
    }
    else {
        return new Error("MongoClient Error");
    }
    const deleteQuery = {
        _id: new mongodb_1.ObjectId(deleteId)
    };
    const taskCollection = client.db("task_app").collection("tasks");
    const deleteResult = yield taskCollection.deleteOne(deleteQuery);
    client.close();
    if (deleteResult === undefined) {
        return new Error("Database error at deleteTask().");
    }
    else {
        return deleteResult;
    }
});
exports.deleteTask = deleteTask;
module.exports = { fetchCollection: exports.fetchCollection, addTask: exports.addTask, deleteTask: exports.deleteTask };
//# sourceMappingURL=db.js.map