const express = require('express');

const router = express.Router();

const {create} = require('./../../controllers/user-controller');

router.post('/signup', create);

module.exports = router;