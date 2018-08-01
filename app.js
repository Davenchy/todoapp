const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// main routes
require('./routes/main')(app);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})
