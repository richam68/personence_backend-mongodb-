var express = require('express');
var router = express.Router();
var ctrlLastPool = require('../../controllers/socialAdmin/lastpool.controller');

router
    .route('/lastpool')
    .get(ctrlLastPool.getAllLastPool)
    .post(ctrlLastPool.insertLastPool);

// Date Filter Route
router 
    .route("/lastpooldate")
    .get(ctrlLastPool.getLastPoolByDate)




module.exports = router;