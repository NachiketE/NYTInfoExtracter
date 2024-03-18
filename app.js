const express = require('express');
const app = express();
const axios = require('axios');
const apiKey = 'gckYpXqcXTIGTPgFAZdDMkKSwKPAD1a5'; 

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { title: 'Homepage' }); 
  });

app.use(express.static('public'));


// Define a route to fetch data from the API
app.get('/articles', async (req, res) => {
    try {
        const response = await axios.get('https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json', {
            params: {
                'api-key': apiKey
            }
        });

        const articles = response.data.results;
        res.render('index', { articles }); 

        console.log(articles)
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
