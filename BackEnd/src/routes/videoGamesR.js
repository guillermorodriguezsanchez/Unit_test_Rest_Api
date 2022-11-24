const { Router } = require('express');
const { addVideoGame, deleteVG, getVG, getVGbyId } = require('../controllers/videoGamesC');

const router = Router();

// Method GET to create the event and show the id of the event
router.post('/', addVideoGame);

router.delete('/', [
], deleteVG);

router.get('/', [
], getVG);

router.get('/one', [
], getVGbyId);

module.exports = router;