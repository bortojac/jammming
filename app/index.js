const express = require('express');
const path = require('path');


const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
    //console.log(__dirname);
    //console.log(path);
    //console.log(req);
    res.sendFile(path.join(__dirname, '../public/index.html'))
    //res.sendFile(path.join(__dirname, '../public/reset.css'));
});

app.listen(3000, () => console.log('Server is running'));

