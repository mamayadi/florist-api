import express from 'express';
import { UserController } from '../controllers/user.controller';
const userRoutes = express.Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */
userRoutes
  /**
   * @swagger
   * /users/register:
   *   post:
   *     description: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: A new user created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   */
  .post('/register', userController.registerUser)
  /**
   * @swagger
   * /users/login:
   *   post:
   *     description: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 example: foulen.benfoulen
   *               password:
   *                 type: string
   *                 example: 123
   *     responses:
   *       200:
   *         description: Return login
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   */
  .post('/login', userController.authenticateUser);

export default userRoutes;
