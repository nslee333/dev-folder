const express = require('express');
const app = express();
const port = 3001;
console.log("Hello");
app.get('/api/', async (req, res) => {
    try {
        res.send(":)");
        // const collection = await getDocuments(); 
        // res.status(200).json({collection});
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ message: Error });
    }
});
app.post('/api/', (req, res) => {
    res.send("Sucessful post req");
});
app.delete('/api/', (req, res) => {
    res.send("Sucessful delete req");
});
app.listen(port, () => {
    console.log(`Server has started listening on port ${port}`);
});
//# sourceMappingURL=server.js.map