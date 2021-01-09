const express = require('express');
const router = express.Router();


const comsCtrl = require('../controllers/Coms');

router.get('coms/:id', comsCtrl.createCom);
router.post('coms/:id', comsCtrl.getAllComs)

module.exports = router;