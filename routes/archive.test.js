const axios = require('axios');
const archive = require('./archive');


jest.mock('axios');

describe('archive endpoint', () => {
  it('should fetch articles from the archive', async () => {
 
    const year = '2023';
    const month = '1';
    const mockResponse = {
      data: {
        response: {
          docs: [
            {
              
              headline: { main: 'Article 1' },
              byline: { original: 'Byline 1' },
              pub_date: '2023-01-01T00:00:00Z',
              abstract: 'Abstract 1',
              web_url: 'https://example.com/article1'
              
            },
            {
              
              headline: { main: 'Article 2' },
              byline: { original: 'Byline 2' },
              pub_date: '2023-01-02T00:00:00Z',
              abstract: 'Abstract 2',
              web_url: 'https://example.com/article2'
              
            }
          ]
        }
      }
    };


    axios.get.mockResolvedValueOnce(mockResponse);

    
    const req = { params: { year, month } };
    const res = { render: jest.fn() };

    
    const apiKey = 'your_api_key_here';

   
    await archive({ get: jest.fn() }, apiKey)(req, res);

    
    expect(axios.get).toHaveBeenCalledWith(`https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`, {
      params: { 'api-key': apiKey }
    });
    expect(res.render).toHaveBeenCalledWith('archive', { articles: mockResponse.data.response.docs, year, month });
  });

  it('should handle errors', async () => {
    
    axios.get.mockRejectedValueOnce(new Error('API Error'));

   
    const req = { params: { year: '2023', month: '1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

 
    const apiKey = 'your_api_key_here';

    
    await archive({ get: jest.fn() }, apiKey)(req, res);

    
    expect(axios.get).toHaveBeenCalledWith(`https://api.nytimes.com/svc/archive/v1/2023/1.json`, {
      params: { 'api-key': apiKey }
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
