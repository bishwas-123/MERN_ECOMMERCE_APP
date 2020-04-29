const baseUrl= process.env.NODE_ENV==='Production'
?'https://bishwas-mernstack-ecommerce.herokuapp.com':
'http://localhost:3000';
export default baseUrl;