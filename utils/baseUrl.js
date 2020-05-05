const baseUrl= process.env.NODE_ENV==='Production'
?'https://intense-bayou-62818.herokuapp.com':
'http://localhost:3000';
export default baseUrl;