const routes = require('express').Router();
const requireDir = require('require-dir');
const authMiddleware = require('./middlewares/auth');

const controllers = requireDir('./controllers');

/**
 * Auth
 */
routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

/**
 * Auth Routes
 */
routes.use(authMiddleware);

/**
 * Users
 */
routes.put('/users', controllers.userController.update);

/**
 * Tweets
 */

routes.post('/tweets', controllers.tweetController.create);
routes.delete('/tweets/:id', controllers.tweetController.destroy);

module.exports = routes;
