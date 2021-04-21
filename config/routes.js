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
    'POST /user/register':userController.registerUser,
    'POST /update/:userId':userController.updateUser,
    'POST remove/:userId':userController.deleteUser,

};
