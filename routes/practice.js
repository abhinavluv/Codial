const express = require('express');
const router = express.Router();
const practiceController = require('../controllers/practice');

router.get('/', practiceController.practiceHome);
router.get('/practice', practiceController.practice);
module.exports = router;