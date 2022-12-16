// const fetchCollection = require('./controller'); ??? controller isn't the right file.
const URI = require('./uri');
const dotenv = require('dotenv');
dotenv.config();

// const asyncF = async () => {
//     const result = await fetchCollection();
//     console.log(result, "Result");
// }


// asyncF();
console.log(process.env.URI, "ENV");
console.log(URI, "URI");