import { NextFunction, Request, Response } from 'express';

import { Client } from '../models/client.model';
import { Commande } from '../models/commande.model';

export class ClientController {
  public createClient(req: Request, res: Response): void {
    const newClient = new Client(req.body);
    newClient.save(async (err: any, savedClient) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res
          .status(201)
          .json(await savedClient.populate('listCommande').execPopulate());
      }
    });
  }

  public getClients(req: Request, res: Response): void {
    Client.find({})
      .populate('listCommande')
      .then((clients) => res.status(200).json(clients))
      .catch((err) => res.status(400).send(err));
  }

  public getClientById(req: Request, res: Response): void {
    Client.findById(req.params.id)
      .populate('listCommande')
      .then((client) => {
        if (!client) {
          res.status(404).json({ message: 'NOT_FOUND' });
        } else {
          res.status(200).json(client);
        }
      })
      .catch((err) => res.status(400).send(err));
  }

  public updateClient(req: Request, res: Response): void {
    Client.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .populate('listCommande')
      .then((updatedClient) => {
        if (!updatedClient) {
          res.status(404).json({ message: 'NOT_FOUND' });
        } else {
          res.status(200).json(updatedClient);
        }
      })
      .catch((err) => res.status(400).send(err));
  }

  public async deleteClient(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const listClient = await Commande.find({ client: req.params.id }).exec();
      if (listClient.length > 0) {
        res
          .status(403)
          .send({ message: 'You cannot delete a client used by a commande' });
      } else {
        Client.findByIdAndDelete({ _id: req.params.id }, {}, (err: Error) => {
          if (err) {
            res.status(400).send(err);
          }
          res.status(200).json({ message: 'Successfully deleted client!' });
        });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
