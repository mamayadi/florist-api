import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../util/secrets';

function verifyToken(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.header('Authorization')?.split(' ')[1];
    if (!jwtToken) {
      return res.status(401).send({ message: 'Unauthorized' });
    } else {
      const user = jwt.verify(jwtToken, JWT_SECRET);
      if (roles.includes(user['role'])) {
        return next();
      } else {
        return res
          .status(401)
          .send({ message: "Unauthorized you don't have permission" });
      }
    }
  };
}

export default verifyToken;
