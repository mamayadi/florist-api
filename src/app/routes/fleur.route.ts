import * as express from 'express';
import { FleurController } from '../controllers/fleur.controller';

const fleurRoutes = express.Router();
const fleurController = new FleurController();

/**
 * @swagger
 * tags:
 *   name: Fleurs
 *   description: Fleur management
 */
fleurRoutes
  /**
   * @swagger
   * /fleurs:
   *   get:
   *     description: Get the list of all fleurs
   *     tags: [Fleurs]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: List of fleurs
   *         content:
   *           application/json:
   *             schema:
   *               type: "array"
   *               items:
   *                 $ref: '#/components/schemas/Fleur'
   *       default:
   *         description: Unspecified error.
   */
  .get('/', fleurController.getFleurs)
  /**
   * @swagger
   * /fleurs/{id}:
   *   get:
   *     description: Get a fleur by id
   *     tags: [Fleurs]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Id of the fleur
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: An fleur object
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/components/schemas/Fleur'
   *       404:
   *         description: Le fleur est introuvable.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Fleur not found!
   *       default:
   *         description: Unspecified error.
   */
  .get('/:id', fleurController.getFleurById)
  /**
   * @swagger
   * /fleurs:
   *   post:
   *     description: Create a new fleur
   *     tags: [Fleurs]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#/components/schemas/Fleur'
   *     responses:
   *       201:
   *         description: A new fleur created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/components/schemas/Fleur'
   */
  .post('/', fleurController.createFleur)
  /**
   * @swagger
   * /fleurs/{id}:
   *   put:
   *     description: Update a fleur
   *     tags: [Fleurs]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Id of the fleur
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#/components/schemas/Fleur'
   *     responses:
   *       200:
   *         description: The fleur updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/components/schemas/Fleur'
   *       404:
   *         description: Fleur not found!
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Fleur not found!
   *       default:
   *         description: Unspecified error.
   */
  .put('/:id', fleurController.updateFleur)
  /**
   * @swagger
   * /fleurs/{id}:
   *   delete:
   *     description: Delete a fleur
   *     tags: [Fleurs]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Id of the fleur
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: The fleur deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Successfully deleted fleur!
   *       404:
   *         description: Fleur not found!
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Fleur not found!
   *       default:
   *         description: Unspecified error.
   */
  .delete('/:id', fleurController.deleteFleur);

export default fleurRoutes;
