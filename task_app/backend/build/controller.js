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
exports.getDocuments = void 0;
const db_1 = require("./db");
const getDocuments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.fetchCollection)();
        return result;
    }
    catch (error) {
        console.error(error);
    }
});
exports.getDocuments = getDocuments;
// console.log(getDocuments());
module.exports = exports.getDocuments;
//# sourceMappingURL=controller.js.map