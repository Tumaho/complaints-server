const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const app = express();

// use cors to avoid CORS problems
app.use(cors())


const authRoutes = require('./routes/auth');
const verifyToken = require('./routes/validate-token');

const compRoutes = require('./routes/compRoute');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


// route middlewares
app.use('/api/user', authRoutes);

app.use('/api/comp',verifyToken,compRoutes);

const uri = `mongodb://localhost/complaints`;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true  ,useFindAndModify: false}
)
.then(() => console.log('Connected database'))
.catch(e => console.log('error db:', e))

// start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server running on: ${PORT}`)
})