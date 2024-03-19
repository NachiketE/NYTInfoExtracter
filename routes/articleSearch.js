const axios = require('axios');

module.exports = (app, apiKey) => {
    app.get('/articlesearch', async (req, res) => {
        const { q, begin_date, end_date, facet, facet_fields, facet_filter, fl, fq, page, sort } = req.query;
        
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
            res.render('articlesearch', { articles });
        } catch (error) {
            console.error('Error fetching articles:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
