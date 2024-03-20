const express = require('express');
const app = express();
const axios = require('axios');
const apiKey = 'gckYpXqcXTIGTPgFAZdDMkKSwKPAD1a5'; 

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { title: 'Homepage' }); 
  });

app.use(express.static('public'));

//Testing API
app.get('/articles', async (req, res) => {
    try {
        const response = await axios.get('https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json', {
            params: {
                'api-key': apiKey
            }
        });

        const articles = response.data.results;
        

        res.render('mostpopular', { articles }); 

        console.log(articles)
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const topStoriesRoutes = require('./routes/topStories');
topStoriesRoutes(app, apiKey);

const bestSellersHistory = require('./routes/bestSellersHistory');
bestSellersHistory(app, apiKey);

const bestSellersByDate = require('./routes/bestSellersByDate');
bestSellersByDate(app, apiKey);

const articleSearch = require('./routes/articleSearch');
articleSearch(app, apiKey);

const archive = require('./routes/archive');
archive(app, apiKey);

const mostEmailed = require('./routes/mostEmailed');
mostEmailed(app, apiKey);

const mostShared = require('./routes/mostShared');
mostShared(app, apiKey);

const mostViewed = require('./routes/mostViewed');
mostViewed(app, apiKey);

const realtimeNewswire = require('./routes/realtimeNewswire');
realtimeNewswire(app, apiKey);

const sectionList = require('./routes/newswireSectionList');
sectionList(app, apiKey);

const bookReviews = require('./routes/bookReviews');
bookReviews(app, apiKey);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
