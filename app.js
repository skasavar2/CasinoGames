
const express = require('express');
const dotenv = require('dotenv').config();
const router = express.Router();
const connectDb = require('./config/dbConnection');

connectDb();

// // Load SSL/TLS certificate and private key
// const options = {
//     key: fs.readFileSync('C:/Users/Admin/Desktop/New folder (2)/key.pem'),
//     //cert: fs.readFileSync('path/to/cert.pem')
// };



const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5001;
//app.use("/api/contacts", require('./routes/contactRoutes'));
app.use("/", require("./routes/userRoutes"));

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});



