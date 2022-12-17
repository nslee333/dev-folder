import {ObjectId} from "mongodb";
// External dependencies.

// Class implementation.
export default class Game {
    constructor(public name: string, public price: number, public catagory: string, public id?: ObjectId) {}
}

// Hi