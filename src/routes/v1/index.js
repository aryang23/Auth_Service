const express = require('express');

const router = express.Router();

const {create, signIn, isAuthenticated, isAdmin} = require('./../../controllers/user-controller');

router.post('/signup', create);
router.post('/signin', signIn);

router.get('/isAuthenticated', isAuthenticated);
router.get('/isAdmin', isAdmin);

module.exports = router;