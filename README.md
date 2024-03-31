# New York Times WebApp

This project is a multiple-page web application that displays information retrieved from the New York Times API. It provides various features and functionalities for users to explore and interact with the data provided by the API.

Walkthrough of the WebApp, highlighting its features: 
https://youtu.be/nlBmdORVEr8

## Installation and Usage

```bash
git clone https://github.com/NachiketE/NYTInfoExtracter.git
```
```bash
npm install
```
```bash
node app.js
```

Access the WebApp using: http://localhost:3000/

## Features

- Node.js with Express framework
- EJS templates for dynamic content rendering
- Bootstrap integration for responsive design
- Mobile-optimized version of the website
- Pagination for navigating through content
- 9 Node.js API endpoints
- Git version control for code management

## API endpoints created:
- Archive endpoint: The Archive API returns an array of NYT articles for a given month, going back to 1851. Its response fields are the same as the Article Search API. 
- Article Search endpoint: Use the Article Search API to look up articles by keyword. 
- Book Reviews endpoint: The Book Reviews API provides information about book reviews from NYT.
- Most Emailed Articles endpoint: 
Provides services for getting the most emailed articles on NYTimes.com.
- Most Viewed Articles endpoint: 
Provides services for getting the most viewed articles on NYTimes.com.
- Most Shared Articles endpoint: 
Provides services for getting the most shared articles on NYTimes.com.
- Top Stories endpoint: The Top Stories API returns an array of articles currently on the specified section (arts, business, ...).
- NewsWireSectionList endpoint: The section-list endpoint returns a list of sections.
- RealTimeNewsWire endpoint: With the Times Newswire API, you can get links and metadata for Times' articles as soon as they are published on NYTimes.com. 



