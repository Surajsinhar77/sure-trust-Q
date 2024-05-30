const express = require('express');
const router = express.Router();

router.route('/addBatch').post();
router.route('/getBatch').get();
router.route('/getBatchById/:id').get();
router.route('/updateBatch').put();
router.route('/deleteBatch').delete();

module.exports = router;
