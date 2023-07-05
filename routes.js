const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');
const {getUser} = require('./controllers/getUserController');
const validators = require('./validators');
const userController = require('./controllers/userController');

//api for siginup and login user
router.post('/register', [
    body('name',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
], register);


router.post('/login',[
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],login);

router.get('/getuser',getUser);


 //api for userInformation crud operation
// Inserting User
router.post(
    '/insert-user',
    validators.userInfo,
    validators.result,
    userController.insert
    );

// Fetching all users
router.get(
    '/get-all-users',
    userController.getAllUsers
    );

// Fetching Single User By ID
router.get(
    '/get-user/:id',
    validators.userID,
    validators.result,
    userController.getUserByID
    );

// Updating User
router.patch(
    '/update-user/:id',
    [...validators.userID, ...validators.userInfo],
    validators.result,
    userController.updateUser
    );
    
// Deleting User
router.delete(
    '/delete-user/:id',
    validators.userID,
    validators.result,
    userController.deleteUser
    );

module.exports = router;