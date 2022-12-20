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
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.URI, { useNewUrlParser: true });
console.log(process.env.URI, "Process.env.uri");
// Function to fetch all current tasks.
const fetchCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        client.connect((err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return console.log("Unable to connect to database.");
            }
            const taskCollection = client.db("task_app").collection("tasks");
            const result = yield taskCollection.find();
            client.close();
            return result;
        }));
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
        client.connect((err) => __awaiter(void 0, void 0, void 0, function* () {
            const taskCollection = client.db("task_app").collection("tasks");
            const taskDocument = {
                task: inputTask,
            };
            yield taskCollection.insertOne(taskDocument);
            client.close();
        }));
    }
    catch (error) {
        console.error(error);
    }
});
exports.addTask = addTask;
// Delete a task from the database.
const deleteTask = (deleteId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        client.connect((err) => __awaiter(void 0, void 0, void 0, function* () {
            const taskCollection = client.db("task_app").collection("tasks");
            yield taskCollection.deleteOne({ _id: deleteId });
            client.close();
        }));
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteTask = deleteTask;
module.exports = { fetchCollection: exports.fetchCollection, addTask: exports.addTask, deleteTask: exports.deleteTask };
//# sourceMappingURL=db.js.map