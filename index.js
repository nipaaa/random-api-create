const express = require('express');
const cors = require('cors');
const userRouters = require('./routes/v1/user.route')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/user', userRouters);

app.get('/', (req, res) => {
    res.send('ACC Assignment-1');
});


app.listen(port, () => {
    console.log(`ACC assignment listening on port ${port}`);
});

