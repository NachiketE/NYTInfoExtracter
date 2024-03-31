const axios = require('axios');

module.exports = (app, apiKey) => {
    app.get('/topstories/:section', async (req, res) => {
        const section = req.params.section;
        const page = parseInt(req.query.page) || 1; 
        const pageSize = 5; 

        try {
            const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${section}.json`, {
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

            res.render('topstories', { section, articles: currentPageArticles, totalPages, currentPage: page });
        } catch (error) {
            console.error('Error fetching top stories:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
