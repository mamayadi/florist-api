import { Document, Schema, Model, model, Error } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import { Roles } from '../constants/role.enum';

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
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
 *          role:
 *            type: string
 *            $ref: '#/components/schemas/Roles'
 *            example: Client
 */
/**
 * User initeface
 */
export interface IUser extends Document {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  create: Date;
  role: Roles;
  comparePassword(password: string): boolean;
}

export const userSchema: Schema = new Schema(
  {
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    create: { type: Date, default: Date.now },
    role: { type: String, enum: Roles }
  },
  { discriminatorKey: 'kind' }
);

interface UserModel extends Model<IUser> {}

userSchema.pre<IUser>('save', function save(next) {
  bcrypt.genSalt(10, (err: globalThis.Error, salt: string) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, salt, null, (error: Error, hash) => {
      if (error) {
        return next(error);
      }
      this.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.get('password'));
};

// userSchema.methods.comparePassword = function (
//   userPassword: string,
//   callback: any
// ) {
//   console.log(this.get('password'));
//   bcrypt.compare(
//     userPassword,
//     this.get('password'),
//     (err: Error, isMatch: boolean) => {
//       callback(err, isMatch);
//     }
//   );
// };

export const User: UserModel = model<IUser, UserModel>('User', userSchema);
