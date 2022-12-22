const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host : "127.0.0.1",
    port : 3306,
    database : "LFW",
    username : "LFW",
    password : "SeSAC4web!"
});

const getConn = async() => {
    return await pool.getConnection(async (conn) => conn);
};

const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen('8000', () => {
    console.log('8000');
});