var express = require('express');
var router = express.Router();

/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       id:
 *         type: string
 *       ssoid:
 *         type: string
 *       created:
 *         type: string
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       email:
 *         type: string
 *       phone:
 *         type: string
 *       slackusername:
 *         type: string
 *       isactive:
 *         type: boolean
 */

var db = require('./queries');

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/users', db.getAllUsers);

/**
 * @swagger
 * /api/users/add:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/users/add', db.addUser);

module.exports = router;