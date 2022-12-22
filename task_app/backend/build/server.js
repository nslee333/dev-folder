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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/api/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collection = yield (0, db_1.fetchCollection)();
        if (collection) {
            res.status(200).json({ collection });
        }
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ message: Error });
    }
}));
app.post('/api/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addTaskResult = yield (0, db_1.addTask)(req.body);
        if (addTaskResult) {
            res.status(200).json(addTaskResult);
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: Error });
    }
}));
app.delete('/api/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteResult = yield (0, db_1.deleteTask)(req.body._id);
        if (deleteResult) {
            res.status(200).json(deleteResult);
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: Error });
    }
}));
app.listen(port, () => {
    console.log(`Server has started listening on port ${port}`);
});
//# sourceMappingURL=server.js.map