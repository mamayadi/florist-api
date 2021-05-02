import { NextFunction, Request, Response } from 'express';

import { Bouquet } from '../models/bouquet.model';
import { Commande } from '../models/commande.model';

export class BouquetController {
  public createBouquet(req: Request, res: Response): void {
    const newBouquet = new Bouquet(req.body);
    newBouquet.save(async (err: any, savedBouquet) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res
          .status(201)
          .json(await savedBouquet.populate('fleur').execPopulate());
      }
    });
  }

  public getBouquets(req: Request, res: Response): void {
    Bouquet.find({})
      .populate('fleur')
      .then((bouquets) => {
        res.status(200).json(bouquets);
      })
      .catch((err) => res.status(400).send(err));
  }

  public getBouquetById(req: Request, res: Response): void {
    Bouquet.findById(req.params.id)
      .populate('fleur')
      .then((bouquet) => {
        if (!bouquet) {
          res.status(404).json({ message: 'NOT_FOUND' });
        } else {
          res.status(200).json(bouquet);
        }
      })
      .catch((err) => res.status(400).send(err));
  }

  public updateBouquet(req: Request, res: Response): void {
    Bouquet.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .populate('fleur')
      .then((updatedBouquet) => {
        if (!updatedBouquet) {
          res.status(404).json({ message: 'NOT_FOUND' });
        } else {
          res.status(200).json(updatedBouquet);
        }
      })
      .catch((err) => res.status(400).send(err));
  }

  public async deleteBouquet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const listBouquet = await Commande.find({
        listBouquet: { $in: req.params.id }
      }).exec();
      if (listBouquet.length > 0) {
        res.status(403).json({
          message: 'You cannot delete a bouquet used by a commande'
        });
      } else {
        Bouquet.findByIdAndDelete({ _id: req.params.id }, {}, (err: Error) => {
          if (err) {
            res.status(400).send(err);
          }
          res.status(200).json({ message: 'Successfully deleted bouquet!' });
        });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
