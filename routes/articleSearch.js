const axios = require('axios');

module.exports = (app, apiKey) => {
    app.get('/articlesearch', async (req, res) => {
        const { q, begin_date, end_date, facet, facet_fields, facet_filter, fl, fq, page, sort } = req.query;
        const pageSize = 5; 
        const currentPage = parseInt(page) || 1; 

        try {
            const response = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
                params: {
                    'api-key': apiKey,
                    q,
                    begin_date,
                    end_date,
                    facet,
                    facet_fields,
                    facet_filter,
                    fl,
                    fq,
                    page,
                    sort
                }
            });

            const articles = response.data.response.docs;
            const totalArticles = articles.length;
            const totalPages = Math.ceil(totalArticles / pageSize);


            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = Math.min(startIndex + pageSize - 1, totalArticles - 1);
            const currentPageArticles = articles.slice(startIndex, endIndex + 1);

            res.render('articlesearch', { articles: currentPageArticles, currentPage, totalPages, q });
        } catch (error) {
            console.error('Error fetching articles:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
