// const axios = require('axios');
// const mostEmailed = require('./mostEmailed'); // Assuming mostEmailed.js is in the same directory

// // Mocking axios
// jest.mock('axios');

// describe('mostEmailed', () => {
//   it('should fetch most emailed articles', async () => {
//     // Mock data for axios response
//     const mockResponse = {
//       data: {
//         results: [
//           {
//             title: 'Article 1',
//             byline: 'Byline 1',
//             published_date: '2024-03-30',
//             abstract: 'Abstract 1',
//             url: 'https://example.com/article1'
//             // Add more fields as needed
//           },
//           {
//             title: 'Article 2',
//             byline: 'Byline 2',
//             published_date: '2024-03-31',
//             abstract: 'Abstract 2',
//             url: 'https://example.com/article2'
//             // Add more fields as needed
//           }
//         ]
//       }
//     };

//     // Mock Axios get method
//     axios.get.mockResolvedValueOnce(mockResponse);

//     // Mock Express req, res
//     const req = { params: { period: '7' } };
//     const res = { render: jest.fn() };

//     // Mock API key
//     const apiKey = 'gckYpXqcXTIGTPgFAZdDMkKSwKPAD1a5';

//     // Call the mostEmailed function
//     await mostEmailed({ get: jest.fn() }, apiKey)(req, res);

//     // Expectations
//     expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('mostpopular/v2/emailed/7.json'), {
//       params: { 'api-key': apiKey }
//     });
//     expect(res.render).toHaveBeenCalledWith('mostEmailed', { articles: mockResponse.data.results });
//   });

//   it('should handle errors', async () => {
//     // Mock Axios get method to throw an error
//     axios.get.mockRejectedValueOnce(new Error('API Error'));

//     // Mock Express req, res
//     const req = { params: { period: '7' } };
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//     // Mock API key
//     const apiKey = 'gckYpXqcXTIGTPgFAZdDMkKSwKPAD1a5';

//     // Call the mostEmailed function
//     await mostEmailed({ get: jest.fn() }, apiKey)(req, res);

//     // Expectations
//     expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('mostpopular/v2/emailed/7.json'), {
//       params: { 'api-key': apiKey }
//     });
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
//   });
// });
