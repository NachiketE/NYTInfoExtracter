const axios = require('axios');

module.exports = (app, apiKey) => {
    app.get('/archive/:year/:month', async (req, res) => {
        const { year, month } = req.params;

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        try {
            const response = await axios.get(`https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`, {
                params: {
                    'api-key': apiKey
                }
            });

            const articles = response.data.response.docs;
            const monthName = monthNames[parseInt(month) - 1]; 
            res.render('archive', { articles, year, month: monthName });
        } catch (error) {
            console.error('Error fetching articles:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
