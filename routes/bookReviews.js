const axios = require('axios');

module.exports = (app, apiKey) => {

    app.get('/book-reviews', async (req, res) => {
        const { isbn, title, author } = req.query;

        try {
            const response = await axios.get('https://api.nytimes.com/svc/books/v3/reviews.json', {
                params: {
                    'api-key': apiKey,
                    isbn,
                    title,
                    author
                }
            });

            const bookReviews = response.data.results;
            res.render('bookReviews', { bookReviews });
        } catch (error) {
            console.error('Error fetching book reviews:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
