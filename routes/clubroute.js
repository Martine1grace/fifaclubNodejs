const express = require('express')
const{registerClub,getClubs,getOneClub,updateClub,deleteClub}=require('../controllers/clubController')
const router = express.Router()

router.route('/:id').get(getOneClub).patch(updateClub).delete(deleteClub)
router.route('/').get(getClubs).post(registerClub)



module.exports = router