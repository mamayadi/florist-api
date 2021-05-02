import dotenv from 'dotenv';
import swaggerjSDoc from 'swagger-jsdoc';
import { version } from '../../../package.json';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env' });
}
const appURL = process.env.APP_URL || 'http://localhost:3000/api';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Api fleuriste Node.js / Express / MongoDB',
      version,
      description: 'Api fleuriste Document and Express API',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/'
      },
      contact: {
        name: 'Swagger',
        url: 'https://swagger.io',
        email: 'Info@SmartBear.com'
      }
    },
    servers: [
      {
        url: appURL
      }
    ]
  },
  apis: ['**/*.ts']
};

const swaggerSpec = swaggerjSDoc(options);
export default swaggerSpec;
