const express = require('express')
const {registerPlayer, getPlayers, getOnePlayer, updatePlayer, deletePlayer} = require('../controllers/playerController')


const router = express.Router()


router.route('/:id').get(getOnePlayer).patch(updatePlayer).delete(deletePlayer)
router.route('/').get(getPlayers).post(registerPlayer)



module.exports = router