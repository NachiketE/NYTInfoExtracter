const axios = require('axios');


module.exports = (app, apiKey) => {
    app.get('/best-sellers-list-history', async (req, res) => {

        const { ageGroup, author, contributor, isbn, offset, price, publisher, title } = req.query;

        try {
            const response = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json`, {
                params: {
                    'api-key': apiKey,
                    'age-group': ageGroup,
                    'author': author,
                    'contributor': contributor,
                    'isbn': isbn,
                    'offset': offset,
                    'price': price,
                    'publisher': publisher,
                    'title':title
                }
            });

            const bestSellersHistory = response.data.results;
            
            res.render('bestSellersHistory', { bestSellersHistory});
        } catch (error) {
            console.error('Error fetching top stories:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

};
