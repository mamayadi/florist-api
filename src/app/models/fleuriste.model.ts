import { Model, Schema } from 'mongoose';
import { Roles } from '../constants/role.enum';
import { IBouquet } from './bouquet.model';
import { IUser, User } from './user.model';

/**
 * @swagger
 *  components:
 *    schemas:
 *      Fleuriste:
 *        type: object
 *        properties:
 *          firstname:
 *            type: string
 *            example: foulen
 *          lastname:
 *            type: string
 *            example: ben foulen
 *          username:
 *            type: string
 *            example: foulen.benfoulen
 *          password:
 *            type: string
 *            example: 123
 *          listBouquet:
 *            type: array
 *            items:
 *              type: object
 *              $ref: '#/components/schemas/Bouquet'
 *          role:
 *            type: string
 *            $ref: '#/components/schemas/Roles'
 *            example: Fleuriste
 */
/**
 * Fleuriste Interface
 */
export interface IFleuriste extends IUser {
  listBouquet: Array<IBouquet['_id']>;
  role: Roles;
}

export const fleuristeSchema: Schema = new Schema({
  listBouquet: [
    { type: Schema.Types.ObjectId, ref: 'Bouquet', autopopulate: true }
  ],
  role: { type: String, enum: Roles, default: Roles.FLORIST }
});

interface FleuristeModel extends Model<IFleuriste> {}

export const Fleuriste: FleuristeModel = 
User.discriminator<IFleuriste,FleuristeModel>('Fleuriste', fleuristeSchema);
