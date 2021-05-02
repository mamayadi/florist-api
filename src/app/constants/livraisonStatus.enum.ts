/**
 * @swagger
 *  components:
 *    schemas:
 *      LivraisonStatus:
 *        type: string
 *        enum:
 *          - Livrée
 *          - En attente
 *          - Annulée
 */
export enum LivraisonStatus {
  DELIVERED = 'Livrée',
  PENDING = 'En attente',
  CANCELED = 'Annulée'
}
