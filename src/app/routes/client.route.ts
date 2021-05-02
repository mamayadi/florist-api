import * as express from 'express';
import { ClientController } from '../controllers/client.controller';

const clientRoutes = express.Router();
const clientController = new ClientController();

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management
 */
clientRoutes
  /**
   * @swagger
   * /clients:
   *   get:
   *     description: Get the list of all clients
   *     tags: [Clients]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: List of clients
   *         content:
   *           application/json:
   *             schema:
   *               type: "array"
   *               items:
   *                 $ref: '#/components/schemas/Client'
   *       default:
   *         description: Unspecified error.
   */
  .get('/', clientController.getClients)
  /**
   * @swagger
   * /clients/{id}:
   *   get:
   *     description: Get a client by id
   *     tags: [Clients]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Id of the client
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: An client object
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/components/schemas/Client'
   *       404:
   *         description: Le client est introuvable.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Client not found!
   *       default:
   *         description: Unspecified error.
   */
  .get('/:id', clientController.getClientById)
  /**
   * @swagger
   * /clients:
   *   post:
   *     description: Create a new client
   *     tags: [Clients]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#/components/schemas/Client'
   *     responses:
   *       201:
   *         description: A new client created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/components/schemas/Client'
   */
  .post('/', clientController.createClient)
  /**
   * @swagger
   * /clients/{id}:
   *   put:
   *     description: Update a client
   *     tags: [Clients]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Id of the client
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#/components/schemas/Client'
   *     responses:
   *       200:
   *         description: The client updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/components/schemas/Client'
   *       404:
   *         description: Client not found!
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Client not found!
   *       default:
   *         description: Unspecified error.
   */
  .put('/:id', clientController.updateClient)
  /**
   * @swagger
   * /clients/{id}:
   *   delete:
   *     description: Delete a client
   *     tags: [Clients]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Id of the client
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: The client deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Successfully deleted client!
   *       404:
   *         description: Client not found!
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                  type: string
   *                  example: Client not found!
   *       default:
   *         description: Unspecified error.
   */
  .delete('/:id', clientController.deleteClient);

export default clientRoutes;
