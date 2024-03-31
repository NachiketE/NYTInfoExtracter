const axios = require('axios');

const mostShared = async (app, apiKey) => {
    app.get('/most-shared/:period', async (req, res) => {
        const { period } = req.params;
        const page = parseInt(req.query.page) || 1; 
        const pageSize = 6; 

        try {
            const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/shared/${period}.json`, {
                params: {
                    'api-key': apiKey
                }
            });

            const articles = response.data.results;
            const totalArticles = articles.length;
            const totalPages = Math.ceil(totalArticles / pageSize);


            const startIndex = (page - 1) * pageSize;
            const endIndex = Math.min(startIndex + pageSize - 1, totalArticles - 1);

            
            const currentPageArticles = articles.slice(startIndex, endIndex + 1);

            res.render('mostShared', { articles: currentPageArticles, totalPages, currentPage: page, period });
        } catch (error) {
            console.error('Error fetching shared articles:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};

module.exports = mostShared;
