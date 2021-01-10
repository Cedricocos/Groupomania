const express = require('express');
const router = express.Router();


const comsCtrl = require('../controllers/Coms');

router.post('/', comsCtrl.createCom);

module.exports = router;