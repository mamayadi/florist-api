import { Request, Response } from 'express';

import swaggerUi from 'swagger-ui-express';
import app from './app/app';
import swaggerSpec from './app/config/swaggerConfig';

const port = process.env.PORT || 3000;

app.listen(port, (): void => {
  console.log(`🌍 RESTful API server started on: ${port}`);
  if (process.env.NODE_ENV === 'development') {
    console.log(`📖 Swagger UI hosted at ${process.env.BASE_URL}/dev/api-docs`);
    app.use('/dev/api-docs', swaggerUi.serve);
    app.use('/dev/api-docs', swaggerUi.setup(swaggerSpec, { explorer: true }));
  }

  app.use((req: Request, res: Response) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
  });
});
