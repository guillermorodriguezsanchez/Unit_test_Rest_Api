const { response } = require('express');
const VideoGame = require('../models/videoGame');



const searchVG = async(termino = '', res = response) => {

    

    try{
        
        const videoGames = await VideoGame.find( {name: termino});

        if(!videoGames){
            return res.status(400).json({
                ok: false,
                msg: 'Name of this game no exists'
            });
        }
    
        res.json({
            ok:true,
            results: videoGames
        });

    }catch(error){

        console.log(error);
        return res.json({
            ok: false,
            msg: 'HWe could not find the videoGame',
            
        });
    }
    
    

}

module.exports = { searchVG }