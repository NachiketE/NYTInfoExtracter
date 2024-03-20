// bestSellers.js

const axios = require('axios');

module.exports = (app, apiKey) => {
    app.get('/best-sellers-by-date/:date/:list', async (req, res) => {
        const { date, list } = req.params;

        try {
            const response = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/${date}/${list}.json`, {
                params: {
                    'api-key': apiKey
                }
            });

            const bestSellers = response.data.results;
            if (!bestSellers || !bestSellers.books) {
                throw new Error('Invalid response format');
            }
            res.render('bestSellersByDate', { bestSellers });
        } catch (error) {
            console.error('Error fetching best sellers:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
