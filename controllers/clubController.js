const Club = require('../models/clubs')
const {NOT_FOUND} = require('http-errors')

async function registerClub (req, res, next)  {
    try {
        const club = new Club(req.body)
        const newClub = await club.save()
        res.status(201).json({
            success:true, 
            data: newClub
        })
    }catch(e){
        next(e)
    }
}


async function getClubs(req, res, next) {
    try{
        const club = await Club.find()
        res.status(200).json({
            success:true,
            data: club,
            count: club.length
        })
        
    }catch(e){
        next(e)
    }

}

async function getOneClub (req, res, next) {
    try{
        const club = await Club.findById(req.params.id)
        if (!club){
            throw new Error('no club with id found')
        }
        res.status(200).json({
            success: true, 
            data: club
        })
    }catch(e){
        next(e)
    }
}

async function updateClub(req, res, next) {
    try{
       const existingClub = await Club.findById(req.params.id)
       if(!existingClub) {
        throw new NotFound('no club with id exist')
       }
       const club = await Club.findByIdAndUpdate(req.params.id, req.body, {
        new: true
       })
       res.status(200).json({
           success:true,
           data: club
       })

    }catch(e){
        next(e)
    }
}

async function deleteClub(req, res, next) {
    try{
    await Club.findByIdAndDelete(req.params.id)
       res.status(200).json({
           success:true,
           data: {}
       })

    }catch(e){
        next(e)
    }
}




module.exports = {
    registerClub,
    getClubs,
    getOneClub,
    updateClub,
    deleteClub
}