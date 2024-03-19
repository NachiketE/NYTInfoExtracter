const axios = require('axios');


module.exports = (app, apiKey) => {
    app.get('/topstories/:section', async (req, res) => {
        const section = req.params.section;
        try {
            const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${section}.json`, {
                params: {
                    'api-key': apiKey
                }
            });

            const articles = response.data.results;
            res.render('topstories', { section, articles });
        } catch (error) {
            console.error('Error fetching top stories:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

};
