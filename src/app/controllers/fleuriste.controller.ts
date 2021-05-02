import { NextFunction, Request, Response } from 'express';
import { Commande } from '../models/commande.model';

import { Fleuriste } from '../models/fleuriste.model';

export class FleuristeController {
  public createFleuriste(req: Request, res: Response): void {
    const newFleuriste = new Fleuriste(req.body);
    newFleuriste.save(async (err: any, savedFleuriste) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res
          .status(201)
          .json(await savedFleuriste.populate('listBouquet').execPopulate());
      }
    });
  }

  public getFleuristes(req: Request, res: Response): void {
    Fleuriste.find({})
      .populate('listBouquet')
      .then((fleuristes) => res.status(200).json(fleuristes))
      .catch((err) => res.status(400).send(err));
  }

  public getFleuristeById(req: Request, res: Response): void {
    Fleuriste.findById(req.params.id)
      .populate('listBouquet')
      .then((fleuriste) => {
        if (!fleuriste) {
          res.status(404).json({ message: 'NOT_FOUND' });
        } else {
          res.status(200).json(fleuriste);
        }
      })
      .catch((err) => res.status(400).send(err));
  }

  public updateFleuriste(req: Request, res: Response): void {
    Fleuriste.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .populate('listBouquet')
      .then((updatedFleuriste) => {
        if (!updatedFleuriste) {
          res.status(404).json({ message: 'NOT_FOUND' });
        } else {
          res.status(200).json(updatedFleuriste);
        }
      })
      .catch((err) => res.status(400).send(err));
  }

  public async deleteFleuriste(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const listFleuriste = await Commande.find({
        fleuriste: req.params.id
      }).exec();
      if (listFleuriste.length > 0) {
        res
          .status(403)
          .json({ message: 'You cannot delete a florist used by a commande' });
      } else {
        Fleuriste.findByIdAndDelete(
          { _id: req.params.id },
          {},
          (err: Error) => {
            if (err) {
              res.status(400).send(err);
            }
            res
              .status(200)
              .json({ message: 'Successfully deleted fleuriste!' });
          }
        );
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
