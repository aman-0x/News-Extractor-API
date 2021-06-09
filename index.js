const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

app.use(cors());

const newsRoute = require('./app/routes/news');

app.use('/api/news', newsRoute);

app.listen(port, () => {
    console.log(`Server Started, Listening at http://localhost:${port}`)
})