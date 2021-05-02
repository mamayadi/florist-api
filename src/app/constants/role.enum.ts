/**
 * @swagger
 *  components:
 *    schemas:
 *      Roles:
 *        type: string
 *        enum:
 *          - Client
 *          - Fleuriste
 */
export enum Roles {
  CLIENT = 'Client',
  FLORIST = 'Fleuriste'
}
