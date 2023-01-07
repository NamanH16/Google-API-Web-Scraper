const express = require('express');
const request = require('request-promise');

const generateUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

const app = express();
const PORT = process.env.PORT||5000;

app.use(express.json());

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

// ENDPOINT 1: Get search result info
app.get('/search/:searchItem', async(req,res)=>{
    const {searchItem} = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${generateUrl(api_key)}&url=https://www.google.com/search?q=${searchItem}`);
        res.json(JSON.parse(response));        
    } catch (error) {
        res.json(error);
    }
});

// ENDPOINT 2: Get News
app.get('/search/news/:searchItem', async(req, res)=>{
    const {searchItem} = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${generateUrl(api_key)}&url=https://www.google.com/search?q=${searchItem}&tbm=nws`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// ENDPOINT 3: Get cost details of the product
app.get('/search/shop/:searchItem', async(req, res)=>{
    const {searchItem} = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${generateUrl(api_key)}&url=https://www.google.com/search?q=${searchItem}&tbm=shop`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, ()=>{
    console.log(`Server started at Port ${PORT}`);
});