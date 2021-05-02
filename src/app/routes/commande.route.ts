import * as express from 'express';
import { Roles } from '../constants/role.enum';
import { CommandeController } from '../controllers/commande.controller';
import verifyToken from '../middleware/verifyToken.middleware';

const commandeRoutes = express.Router();
const commandeController = new CommandeController();

/**
 * @swagger
 * tags:
 *   name: Commandes
 *   description: Commande management
 */
commandeRoutes
  /**
   * @swagger
   * /commandes:
   *   get:
   *     description: Get the list of all commandes
   *     tags: [Commandes]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: List of commandes
   *         content:
   *           application/json:
   *             schema:
   *               type: "array"
   *               items:
   *                 $ref: '#/components/schemas/Commande'
   *       default:
   *         description: Unspecified error.
   */
  .get(
    '/',
    verifyToken([Roles.FLORIST, Roles.CLIENT]),
    commandeController.getCommandes
  )
  /**
   * @swagger
   * /commandes/{id}:
   *   get:
   *     description: Get a commande by id
   *     tags: [Commandes]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Id of the commande
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: An commande object
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/components/schemas/Commande'
   *       404:
   *         description: Le commande est introuvable.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Commande not found!
   *       default:
   *         description: Unspecified error.
   */
  .get(
    '/:id',
    verifyToken([Roles.FLORIST, Roles.CLIENT]),
    commandeController.getCommandeById
  )
  /**
   * @swagger
   * /commandes:
   *   post:
   *     description: Create a new commande
   *     tags: [Commandes]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#/components/schemas/Commande'
   *     responses:
   *       201:
   *         description: A new commande created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/components/schemas/Commande'
   */
  .post('/', verifyToken([Roles.CLIENT]), commandeController.createCommande)
  /**
   * @swagger
   * /commandes/{id}:
   *   put:
   *     description: Update a commande
   *     tags: [Commandes]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Id of the commande
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#/components/schemas/Commande'
   *     responses:
   *       200:
   *         description: The commande updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/components/schemas/Commande'
   *       404:
   *         description: Commande not found!
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Commande not found!
   *       default:
   *         description: Unspecified error.
   */
  .put(
    '/:id',
    verifyToken([Roles.FLORIST, Roles.CLIENT]),
    commandeController.updateCommande
  );
// /**
//  * @swagger
//  * /commandes/{id}:
//  *   delete:
//  *     description: Delete a commande
//  *     tags: [Commandes]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: Id of the commande
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: The commande deleted
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                  type: string
//  *                  example: Successfully deleted commande!
//  *       404:
//  *         description: Commande not found!
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                  type: string
//  *                  example: Commande not found!
//  *       default:
//  *         description: Unspecified error.
//  */
// .delete('/:id', verifyToken([ Roles.CLIENT]),commandeController.deleteCommande);

export default commandeRoutes;
