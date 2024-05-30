const express = require('express');
const router = express.Router();
const { addBatch, getBatch,getBatchById, updateBatch,deleteBatch } = require('../controller/batch.controller');

router.route('/addBatch').post(addBatch);
router.route('/getBatch').get(getBatch);
router.route('/getBatchById/:id').get(getBatchById);
router.route('/updateBatch/:id').put(updateBatch);
router.route('/deleteBatch/:id').delete(deleteBatch);

module.exports = router;
