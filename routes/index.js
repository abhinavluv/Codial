const express = require('express');
const router = express.Router();
const homeComtroller = require('../controllers/home_controller');
const practiceController = require('../controllers/practice');
console.log("Router loaded...");

router.get('/', homeComtroller.home);
router.get('/practice', practiceController.practice);
module.exports = router;