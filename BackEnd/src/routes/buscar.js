const { Router } = require('express');
const { searchVG} = require('../controllers/buscarC');

const router = Router();

router.get('/:termino', [
], searchVG);


module.exports = router;