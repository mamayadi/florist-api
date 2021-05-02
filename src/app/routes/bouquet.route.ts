import * as express from 'express';
import { Roles } from '../constants/role.enum';
import { BouquetController } from '../controllers/bouquet.controller';
import verifyToken from '../middleware/verifyToken.middleware';

const bouquetRoutes = express.Router();
const bouquetController = new BouquetController();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 */
/**
 * @swagger
 * tags:
 *   name: Bouquets
 *   description: Bouquet management
 */
bouquetRoutes
  /**
   * @swagger
   * /bouquets:
   *   get:
   *     description: Get the list of all bouquets
   *     tags: [Bouquets]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: List of bouquets
   *         content:
   *           application/json:
   *             schema:
   *               type: "array"
   *               items:
   *                 $ref: '#/components/schemas/Bouquet'
   *       default:
   *         description: Unspecified error.
   */
  .get(
    '/',
    verifyToken([Roles.FLORIST, Roles.CLIENT]),
    bouquetController.getBouquets
  )
  /**
   * @swagger
   * /bouquets/{id}:
   *   get:
   *     description: Get a bouquet by id
   *     tags: [Bouquets]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Id of the bouquet
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: An bouquet object
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/components/schemas/Bouquet'
   *       404:
   *         description: Le bouquet est introuvable.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Bouquet not found!
   *       default:
   *         description: Unspecified error.
   */
  .get(
    '/:id',
    verifyToken([Roles.FLORIST, Roles.CLIENT]),
    bouquetController.getBouquetById
  )
  /**
   * @swagger
   * /bouquets:
   *   post:
   *     description: Create a new bouquet
   *     tags: [Bouquets]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#/components/schemas/Bouquet'
   *     responses:
   *       201:
   *         description: A new bouquet created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/components/schemas/Bouquet'
   */
  .post('/', verifyToken([Roles.FLORIST]), bouquetController.createBouquet)
  /**
   * @swagger
   * /bouquets/{id}:
   *   put:
   *     description: Update a bouquet
   *     tags: [Bouquets]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Id of the bouquet
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#/components/schemas/Bouquet'
   *     responses:
   *       200:
   *         description: The bouquet updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/components/schemas/Bouquet'
   *       404:
   *         description: Bouquet not found!
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Bouquet not found!
   *       default:
   *         description: Unspecified error.
   */
  .put('/:id', verifyToken([Roles.FLORIST]), bouquetController.updateBouquet)
  /**
   * @swagger
   * /bouquets/{id}:
   *   delete:
   *     description: Delete a bouquet
   *     tags: [Bouquets]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Id of the bouquet
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: The bouquet deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Successfully deleted bouquet!
   *       404:
   *         description: Bouquet not found!
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Bouquet not found!
   *       default:
   *         description: Unspecified error.
   */
  .delete(
    '/:id',
    verifyToken([Roles.FLORIST]),
    bouquetController.deleteBouquet
  );

export default bouquetRoutes;
