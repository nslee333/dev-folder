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
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 1300;
app.use(express_1.default.json(), (0, cors_1.default)());
app.get('/api/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield (0, db_1.fetchCollection)();
    if (collection instanceof Error) {
        console.error(Error);
        res.status(400).json({ message: Error });
    }
    else {
        res.status(200).json({ collection });
    }
}));
app.post('/api/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addTaskResult = yield (0, db_1.addTask)(req.body);
    if (addTaskResult instanceof Error) {
        console.error(Error);
        res.status(400).json({ message: Error });
    }
    else {
        res.status(200).json(addTaskResult);
    }
}));
app.delete('/api/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteResult = yield (0, db_1.deleteTask)(req.body._id);
    if (deleteResult instanceof Error) {
        console.error(Error);
        res.status(400).json({ message: Error });
    }
    else {
        res.status(200).json(deleteResult);
    }
}));
app.listen(port, () => {
    console.log(`Server has started listening on port ${port}`);
});
//# sourceMappingURL=server.js.map