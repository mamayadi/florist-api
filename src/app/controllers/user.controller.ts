import bcrypt from 'bcrypt-nodejs';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../util/secrets';
import { Roles } from '../constants/role.enum';
import { Client } from '../models/client.model';
import { Fleuriste } from '../models/fleuriste.model';
import { IUser, User } from '../models/user.model';

export class UserController {
  public async registerUser(req: Request, res: Response): Promise<void> {
    const hashedPassword = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );

    if (req.body.role === Roles.CLIENT) {
      await Client.create({
        username: req.body.username,
        password: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: Roles.CLIENT
      });
    } else if (req.body.role === Roles.FLORIST) {
      await Fleuriste.create({
        username: req.body.username,
        password: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: Roles.CLIENT
      });
    } else {
      res.status(400).send({ message: 'Role invalid' });
    }

    const token = jwt.sign(
      { username: req.body.username, scope: req.body.scope },
      JWT_SECRET
    );
    res.status(200).send({ token: token });
  }

  public authenticateUser(req: Request, res: Response, next: NextFunction) {
    User.findOne(
      {
        username: req.body.username
      },
      async (err, user: IUser) => {
        if (err) res.status(400).send(err);
        if (!user || !user.comparePassword(req.body.password)) {
          res.status(401).json({
            message: 'Authentication failed. Invalid user or password.'
          });
        }
        if (user.role === Roles.CLIENT) {
          const client = await Client.findOne({
            username: user.username
          }).exec();
          if (client) {
            res.json({
              token: jwt.sign(
                { username: user.username, role: user.role },
                JWT_SECRET
              )
            });
          }
        } else if (user.role === Roles.FLORIST) {
          const fleuriste = await Fleuriste.findOne({
            username: user.username
          }).exec();
          if (fleuriste) {
            res.json({
              token: jwt.sign(
                { username: user.username, role: user.role },
                JWT_SECRET
              )
            });
          }
        } else {
          res.status(401).json({
            message: 'Authentication failed. Invalid user or password.'
          });
        }
      }
    );
  }
}
