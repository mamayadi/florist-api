import { NextFunction, Request, Response } from 'express';
import { Bouquet } from '../models/bouquet.model';

import { Fleur } from '../models/fleur.model';

export class FleurController {
  public createFleur(req: Request, res: Response): void {
    const newFleur = new Fleur(req.body);
    newFleur.save((err: any, savedFleur) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).json(savedFleur);
      }
    });
  }

  public getFleurs(req: Request, res: Response): void {
    Fleur.find({}, (err, fleurs) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(fleurs);
      }
    });
  }

  public getFleurById(req: Request, res: Response): void {
    Fleur.findById(req.params.id, (err, fleur: typeof Fleur) => {
      if (err) {
        res.status(400).send(err);
      } else if (!fleur) {
        res.status(404).json({ message: 'NOT_FOUND' });
      } else {
        res.status(200).json(fleur);
      }
    });
  }

  public updateFleur(req: Request, res: Response): void {
    Fleur.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err: any, updatedFleur) => {
        if (err) {
          res.status(400).send(err);
        } else if (!updatedFleur) {
          res.status(404).json({ message: 'NOT_FOUND' });
        } else {
          res.status(200).json(updatedFleur);
        }
      }
    );
  }

  public async deleteFleur(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const listBouquet = await Bouquet.find({ fleur: req.params.id }).exec();
      if (listBouquet.length > 0) {
        res
          .status(403)
          .send({ message: 'You cannot delete a flower used by a bouquet' });
      } else {
        Fleur.findByIdAndDelete({ _id: req.params.id }, {}, (err: Error) => {
          if (err) {
            res.status(400).send(err);
          }
          res.status(200).json({ message: 'Successfully deleted fleur!' });
        });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
