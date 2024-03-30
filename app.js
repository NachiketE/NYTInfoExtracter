const express = require('express');
const app = express();
const axios = require('axios');
const apiKey = 'gckYpXqcXTIGTPgFAZdDMkKSwKPAD1a5'; 

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.nytimes.com/svc/topstories/v2/world.json', {
            params: {
                'api-key': apiKey
            }
        });

        const articlesCarousel = response.data.results;
        res.render('index', { title: 'Homepage', articlesCarousel }); 
    } catch (error) {
        console.error('Error fetching top stories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use(express.static('public'));



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
