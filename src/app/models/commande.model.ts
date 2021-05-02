import { Document, Schema, Model, model } from 'mongoose';
import { LivraisonStatus } from '../constants/livraisonStatus.enum';
import { IBouquet } from './bouquet.model';
import { IClient } from './client.model';
import { IFleuriste } from './fleuriste.model';

/**
 * @swagger
 *  components:
 *    schemas:
 *      Commande:
 *        type: object
 *        properties:
 *          listBouquet:
 *            type: array
 *            items:
 *              type: object
 *              $ref: '#/components/schemas/Bouquet'
 *          client:
 *            type: object
 *            $ref: '#/components/schemas/Client'
 *          fleuriste:
 *            type: object
 *            $ref: '#/components/schemas/Fleuriste'
 *          status:
 *            type: string
 *            $ref: '#/components/schemas/LivraisonStatus'
 */
/**
 * Commande Interface
 */
export interface ICommande extends Document {
  listBouquet: Array<IBouquet['_id']>;
  client: IClient | string;
  fleuriste: IFleuriste| string;
  prixTotal: number;
  status: LivraisonStatus;
}

export const commandeSchema: Schema = new Schema({
  listBouquet: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Bouquet',
      required: true,
      autopopulate: true
    }
  ],
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
    autopopulate: true
  },
  fleuriste: {
    type: Schema.Types.ObjectId,
    ref: 'Fleuriste',
    required: true,
    autopopulate: true
  },
  prixTotal: {
    type: Number
  },
  status: {
    type: String,
    enum: LivraisonStatus,
    default: LivraisonStatus.PENDING
  }
});

interface CommandeModel extends Model<ICommande> {}

export const Commande: CommandeModel = model<ICommande, CommandeModel>(
  'Commande',
  commandeSchema
);
