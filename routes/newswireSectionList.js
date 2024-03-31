
const axios = require('axios');

module.exports = (app, apiKey) => {
    app.get('/section-list', async (req, res) => {
        try {
            const response = await axios.get('https://api.nytimes.com/svc/news/v3/content/section-list.json', {
                params: {
                    'api-key': apiKey
                }
            });

            const sections = response.data.results;
            res.render('newswireSectionList', { sections });
        } catch (error) {
            console.error('Error fetching section list:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
