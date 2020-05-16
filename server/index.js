const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3001;

const overviewService = "http://ec2-3-22-119-240.us-east-2.compute.amazonaws.com:3000";
const gamesService = "http://ec2-3-22-119-240.us-east-2.compute.amazonaws.com:80";
const reviewsService = "http://ec2-52-91-162-130.compute-1.amazonaws.com:3003/";

app.use(express.static(path.join(__dirname, '../public')));

app.use('/overview/*', createProxyMiddleware({ target: overviewService, changeOrigin: true }));
app.use('/games/*', createProxyMiddleware({ target: gamesService, changeOrigin: true }));
app.use('/reviews/*', createProxyMiddleware({ target: reviewsService, changeOrigin: true }));

app.listen(port, () => {
  console.log(`Proxy server running at port ${port}`);
});
 