const axios = require('axios');
const mostEmailed = require('./mostEmailed');


jest.mock('axios');

describe('mostEmailed', () => {
  it('should fetch most emailed articles', async () => {
    const mockResponse = {
      data: {
        results: [
          {
            title: 'Article 1',
            byline: 'Byline 1',
            published_date: '2024-03-30',
            abstract: 'Abstract 1',
            url: 'https://example.com/article1'
          },
          {
            title: 'Article 2',
            byline: 'Byline 2',
            published_date: '2024-03-31',
            abstract: 'Abstract 2',
            url: 'https://example.com/article2'
          }
        ]
      }
    };

    axios.get.mockResolvedValueOnce(mockResponse);

    const req = { params: { period: '7' } };
    const res = { render: jest.fn() };

    const apiKey = 'gckYpXqcXTIGTPgFAZdDMkKSwKPAD1a5';

    await mostEmailed({ get: jest.fn() }, apiKey)(req, res);

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('mostpopular/v2/emailed/7.json'), {
      params: { 'api-key': apiKey }
    });
    expect(res.render).toHaveBeenCalledWith('mostEmailed', { articles: mockResponse.data.results });
  });

  it('should handle errors', async () => {
    
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    
    const req = { params: { period: '7' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    
    const apiKey = 'gckYpXqcXTIGTPgFAZdDMkKSwKPAD1a5';

    
    await mostEmailed({ get: jest.fn() }, apiKey)(req, res);

    
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('mostpopular/v2/emailed/7.json'), {
      params: { 'api-key': apiKey }
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
