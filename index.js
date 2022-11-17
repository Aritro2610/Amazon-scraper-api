const express = require('express');
const request = require('request-promise');
const app = express();
const PORT = process.env.PORT||8080;

app.use(express.json());

const generateScraperUrl = (apiKey)=>{`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;}

app.get('/',(req,res)=>{
    res.send('Your server is running on here')
});

app.get('/product/:productId',async(req,res)=>{
    const productId = req.params.productId;
    const {api_key} = req.query
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.in/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})
app.get('/product/:productId/reviews',async(req,res)=>{
    const productId = req.params.productId;
    const {api_key} = req.query
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.in/product-reviews/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})
app.get('/product/:productId/offers',async(req,res)=>{
    const productId = req.params.productId;
    const {api_key} = req.query
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.in/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})
app.get('/search/:searchQuery',async(req,res)=>{
    const query = req.params.searchQuery;
    const {api_key} = req.query
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.in/s?k=${query}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});