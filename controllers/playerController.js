const Player = require('../models/players')
const {NOT_FOUND} = require('http-errors')

async function registerPlayer (req, res, next)  {
    try {
        const player = new Player(req.body)
        const newPlayer = await player.save()
        res.status(201).json({
            success:true, 
            data: newPlayer
        })
    }catch(e){
        next(e)
    }
}

async function getPlayers(req, res, next) {
    try{
        const player = await Player.find()
        res.status(200).json({
            success:true,
            data: player,
            count: player.length
        })
        
    }catch(e){
        next(e)
    }

}

async function getOnePlayer (req, res, next) {
    try{
        const player = await Player.findById(req.params.id)
        if (!player){
            throw new Error('no player with id found')
        }
        res.status(200).json({
            success: true, 
            data: player
        })
    }catch(e){
        next(e)
    }
}

async function updatePlayer(req, res, next) {
    try{
       const existingPlayer = await Player.findById(req.params.id)
       if(!existingPlayer) {
        throw new NotFound('no player with id exist')
       }
       const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
        new: true
       })
       res.status(200).json({
           success:true,
           data: player
       })

    }catch(e){
        next(e)
    }
}

async function deletePlayer(req, res, next) {
    try{
    await Player.findByIdAndDelete(req.params.id)
       res.status(200).json({
           success:true,
           data: {}
       })

    }catch(e){
        next(e)
    }
}




module.exports = {
    registerPlayer,
    getPlayers,
    getOnePlayer,
    updatePlayer,
    deletePlayer
}