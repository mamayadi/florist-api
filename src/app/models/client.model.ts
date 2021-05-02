import { Model, Schema } from 'mongoose';
import { Roles } from '../constants/role.enum';
import { ICommande } from './commande.model';
import { IUser, User } from './user.model';

/**
 * @swagger
 *  components:
 *    schemas:
 *      Client:
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
 *          listCommande:
 *            type: array
 *            items:
 *              type: object
 *              $ref: '#/components/schemas/Commande'
 *          role:
 *            type: string
 *            $ref: '#/components/schemas/Roles'
 */
/**
 * Client Interface
 */
export interface IClient extends IUser {
  listCommande: Array<ICommande['_id']>;
  role: Roles;
}

export const clientSchema: Schema = new Schema({
  listCommande: [
    { type: Schema.Types.ObjectId, ref: 'Commande', autopopulate: true }
  ],
  role: { type: String, enum: Roles, default: Roles.CLIENT }
});

interface ClientModel extends Model<IClient> {}

export const Client: ClientModel = User.discriminator<IClient, ClientModel>(
  'Client',
  clientSchema
);
