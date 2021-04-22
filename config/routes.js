/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
const  userController=require('../api/controllers/home');
module.exports.routes = {

    "GET /": userController.welcome,
    "GET /allUser":userController.getUser,
    'POST /user/register':userController.registerUser,
    'PUT /update/:userId':userController.updateUser,
    'DELETE /remove/:userId':userController.deleteUser,

};
