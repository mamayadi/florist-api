import { Document, Schema, Model, model } from 'mongoose';
import { IFleur } from './fleur.model';

/**
 * @swagger
 *  components:
 *    schemas:
 *      Bouquet:
 *        type: object
 *        properties:
 *          fleur:
 *            type: object
 *            $ref: '#/components/schemas/Fleur'
 *          nombreFleur:
 *            type: number
 *            example: 10
 *          prixBouquet:
 *            type: number
 *            example: 50
 */
/**
 * Bouquet Interface
 */
export interface IBouquet extends Document {
  fleur: IFleur | string;
  nombreFleur: number;
  prixBouquet: number;
}

export const bouquetSchema: Schema = new Schema({
  fleur: {
    type: Schema.Types.ObjectId,
    ref: 'Fleur',
    required: true,
    autopopulate: true
  },
  nombreFleur: { type: Number, require: true },
  prixBouquet: { type: Number, require: true }
});

interface BouquetModel extends Model<IBouquet> {}

export const Bouquet: BouquetModel = model<IBouquet, BouquetModel>(
  'Bouquet',
  bouquetSchema
);
