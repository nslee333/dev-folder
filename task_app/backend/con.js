// const {fetchCollection} = require('./controller.js');
const {env} = require('dotenv');
dotenv.config();

const asyncF = async () => {
    // const result = await fetchCollection();
    // console.log(result);
}

asyncF();
console.log(process.env.URI);