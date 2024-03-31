
const axios = require('axios');

module.exports = (app, apiKey) => {
    app.get('/realtime-newswire/:source/:section', async (req, res) => {
        const { source, section } = req.params;

        try {
            const response = await axios.get(`https://api.nytimes.com/svc/news/v3/content/${source}/${section}.json`, {
                params: {
                    'api-key': apiKey
                }
            });

            const articles = response.data.results;
            res.render('realtimeNewswire', { articles });
        } catch (error) {
            console.error('Error fetching content:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
