const express = require('express');

const router = express.Router();

const {create, signIn} = require('./../../controllers/user-controller');

router.post('/signup', create);
router.post('/signin', signIn);

module.exports = router;