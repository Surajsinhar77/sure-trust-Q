const express = require('express');
const router = express.Router();

router.route('/addBatch').post();
router.route('/getBatch').get();
router.route('/getBatchById/:id').get();
router.route('/updateBatch/:id').put();
router.route('/deleteBatch/:id').delete();

module.exports = router;
