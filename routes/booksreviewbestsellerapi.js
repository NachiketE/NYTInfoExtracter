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

            const bookList = response.data.results;
            // res.json(bookList);
            res.render('booksreviewbestsellerapi', { date, list, bookList });
        } catch (error) {
            console.error('Error fetching top stories:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

};
