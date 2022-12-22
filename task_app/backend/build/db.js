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
const dotenv = require("dotenv").config();
const mongodb_1 = require("mongodb");
// Function to fetch all current tasks.
const fetchCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MongoClient = require('mongodb').MongoClient;
        const client = new MongoClient(process.env.URI, { useNewUrlParser: true });
        yield client.connect().catch((err) => {
            console.error(err);
        });
        const taskCollection = yield client.db("task_app").collection("tasks");
        const result = yield taskCollection.find({}).toArray();
        client.close();
        return result;
    }
    catch (error) {
        console.error(error);
        return error;
    }
});
exports.fetchCollection = fetchCollection;
// Function to add a new task to the collection.
const addTask = (inputTask) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MongoClient = require('mongodb').MongoClient;
        const client = new MongoClient(process.env.URI, { useNewUrlParser: true });
        yield client.connect().catch((err) => {
            console.error(err);
        });
        const taskCollection = client.db("task_app").collection("tasks");
        const addedTaskResult = yield taskCollection.insertOne(inputTask);
        client.close();
        return addedTaskResult;
    }
    catch (error) {
        console.error(error);
    }
});
exports.addTask = addTask;
// Delete a task from the database.
const deleteTask = (deleteId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MongoClient = require('mongodb').MongoClient;
        const client = new MongoClient(process.env.URI, { useNewUrlParser: true });
        client.connect().catch((err) => {
            console.error(err);
        });
        const taskCollection = client.db("task_app").collection("tasks");
        const deleteQuery = {
            _id: new mongodb_1.ObjectId(deleteId)
        };
        const deleteResult = yield taskCollection.deleteOne(deleteQuery);
        client.close();
        return deleteResult;
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteTask = deleteTask;
module.exports = { fetchCollection: exports.fetchCollection, addTask: exports.addTask, deleteTask: exports.deleteTask };
//# sourceMappingURL=db.js.map