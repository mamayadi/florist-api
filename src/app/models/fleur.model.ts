import { Document, Schema, Model, model } from 'mongoose';

/**
 * @swagger
 *  components:
 *    schemas:
 *      Fleur:
 *        type: object
 *        properties:
 *          nom:
 *            type: string
 *            example: yassmine
 *          couleur:
 *            type: string
 *            example: rose
 *          prix:
 *            type: number
 *            example: 5
 */
/**
 * Fleur Interface
 */
export interface IFleur extends Document {
  nom: string;
  couleur: string;
  prix: number;
}

export const fleurSchema: Schema = new Schema({
  nom: { type: String, require: true, unique: true },
  couleur: { type: String, require: true },
  prix: { type: Number, require: true }
});

interface FleurModel extends Model<IFleur> {}

export const Fleur: FleurModel = model<IFleur, FleurModel>(
  'Fleur',
  fleurSchema
);
