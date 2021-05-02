import { NextFunction, Request, Response } from 'express';
import { LivraisonStatus } from '../constants/livraisonStatus.enum';
import { IBouquet } from '../models/bouquet.model';

import { Commande } from '../models/commande.model';

export class CommandeController {
  public createCommande(req: Request, res: Response): void {
    const listPrix = req.body.listBouquet
      .map((bouquet) => bouquet.prixBouquet)
      .reduce((a, b) => {
        return a + b;
      });
    const newCommande = new Commande(req.body);
    newCommande.prixTotal = listPrix;
    newCommande.save(async (err: any, savedCommande) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res
          .status(201)
          .json(
            await savedCommande
              .populate('listBouquet')
              .populate('client')
              .populate('fleuriste')
              .execPopulate()
          );
      }
    });
  }

  public getCommandes(req: Request, res: Response): void {
    Commande.find({})
      .populate('listBouquet')
      .populate('client')
      .populate('fleuriste')
      .then((commandes) => res.status(200).json(commandes))
      .catch((err) => res.status(400).send(err));
  }

  public getCommandeById(req: Request, res: Response): void {
    Commande.findById(req.params.id)
      .populate('listBouquet')
      .populate('client')
      .populate('fleuriste')
      .then((commande) => {
        if (!commande) {
          res.status(404).json({ message: 'NOT_FOUND' });
        } else {
          res.status(200).json(commande);
        }
      })
      .catch((err) => res.status(400).send(err));
  }

  public async updateCommande(req: Request, res: Response): Promise<void> {
    try {
      const findCommande = await Commande.findById({
        _id: req.params.id
      }).exec();
      if (findCommande && findCommande.status === LivraisonStatus.DELIVERED) {
        res
          .status(400)
          .send({
            message: 'You cannot update a command has been already delivered'
          });
      } else {
        let commandeToUpdate = req.body;
        if (req.body.listBouquet.length > 0) {
          const prixTotal = (req.body.listBouquet as Array<IBouquet>)
            .map((bouquet) => bouquet.prixBouquet)
            .reduce((a, b) => {
              return a + b;
            });
          commandeToUpdate = {
            ...commandeToUpdate,
            prixTotal
          };
        }
        Commande.findOneAndUpdate({ _id: req.params.id }, commandeToUpdate, {
          new: true
        })
          .populate('listBouquet')
          .populate('client')
          .populate('fleuriste')
          .then((updatedCommande) => {
            if (!updatedCommande) {
              res.status(404).json({ message: 'NOT_FOUND' });
            } else {
              res.status(200).json(updatedCommande);
            }
          })
          .catch((err) => res.status(400).send(err));
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async deleteCommande(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    Commande.findByIdAndDelete({ _id: req.params.id }, {}, (err: Error) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).json({ message: 'Successfully deleted commande!' });
    });
  }
}
