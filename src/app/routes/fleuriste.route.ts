import * as express from 'express';
import { Roles } from '../constants/role.enum';
import { FleuristeController } from '../controllers/fleuriste.controller';
import verifyToken from '../middleware/verifyToken.middleware';

const fleuristeRoutes = express.Router();
const fleuristeController = new FleuristeController();

/**
 * @swagger
 * tags:
 *   name: Fleuristes
 *   description: Fleuriste management
 */
fleuristeRoutes
  /**
   * @swagger
   * /fleuristes:
   *   get:
   *     description: Get the list of all fleuristes
   *     tags: [Fleuristes]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: List of fleuristes
   *         content:
   *           application/json:
   *             schema:
   *               type: "array"
   *               items:
   *                 $ref: '#/components/schemas/Fleuriste'
   *       default:
   *         description: Unspecified error.
   */
  .get(
    '/',
    verifyToken([Roles.FLORIST, Roles.CLIENT]),
    fleuristeController.getFleuristes
  )
  /**
   * @swagger
   * /fleuristes/{id}:
   *   get:
   *     description: Get a fleuriste by id
   *     tags: [Fleuristes]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Id of the fleuriste
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: An fleuriste object
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/components/schemas/Fleuriste'
   *       404:
   *         description: Le fleuriste est introuvable.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Fleuriste not found!
   *       default:
   *         description: Unspecified error.
   */
  .get(
    '/:id',
    verifyToken([Roles.FLORIST, Roles.CLIENT]),
    fleuristeController.getFleuristeById
  )
  /**
   * @swagger
   * /fleuristes:
   *   post:
   *     description: Create a new fleuriste
   *     tags: [Fleuristes]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#/components/schemas/Fleuriste'
   *     responses:
   *       201:
   *         description: A new fleuriste created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/components/schemas/Fleuriste'
   */
  .post('/', verifyToken([Roles.FLORIST]), fleuristeController.createFleuriste)
  /**
   * @swagger
   * /fleuristes/{id}:
   *   put:
   *     description: Update a fleuriste
   *     tags: [Fleuristes]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Id of the fleuriste
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#/components/schemas/Fleuriste'
   *     responses:
   *       200:
   *         description: The fleuriste updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/components/schemas/Fleuriste'
   *       404:
   *         description: Fleuriste not found!
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Fleuriste not found!
   *       default:
   *         description: Unspecified error.
   */
  .put(
    '/:id',
    verifyToken([Roles.FLORIST]),
    fleuristeController.updateFleuriste
  )
  /**
   * @swagger
   * /fleuristes/{id}:
   *   delete:
   *     description: Delete a fleuriste
   *     tags: [Fleuristes]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Id of the fleuriste
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: The fleuriste deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Successfully deleted fleuriste!
   *       404:
   *         description: Fleuriste not found!
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Fleuriste not found!
   *       default:
   *         description: Unspecified error.
   */
  .delete(
    '/:id',
    verifyToken([Roles.FLORIST, Roles.CLIENT]),
    fleuristeController.deleteFleuriste
  );

export default fleuristeRoutes;
