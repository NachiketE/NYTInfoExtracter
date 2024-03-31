
const axios = require('axios');

module.exports = (app, apiKey) => {
    app.get('/most-shared/:period', async (req, res) => {
        const { period } = req.params;

        try {
            const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/shared/${period}.json`, {
                params: {
                    'api-key': apiKey
                }
            });

            const articles = response.data.results;
            res.render('mostShared', { articles });
        } catch (error) {
            console.error('Error fetching emailed articles:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
