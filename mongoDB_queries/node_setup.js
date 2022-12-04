const {MongoClient} = require('mongodb'); // In app.js file.
const uri = require('file_path')

module.exports = uri = "connection string";

const client = new MongoClient(uri);
const dbname = "bank";



const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log(`Connected to the ${dbname} database`);
    } catch (err) {
        console.log(`Error connecting to the database: ${err}`);
    }
}



const main = async () => {
    try {
        await connectToDatabase();
    } catch (error) {
        console.error(error)
    } finally {
        await client.close();
    }
}
