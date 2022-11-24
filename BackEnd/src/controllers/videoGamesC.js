const { response } = require('express');
const VideoGame = require('../models/videoGame');
const {v4 : uuidv4} = require('uuid');

const addVideoGame = async(req, res = response) => {

    const {name, category, ageToPlay, amount} = req.body;

    try {
        
        // Save the name of the event
        const _id = uuidv4();

        const existNameVideoGame = await VideoGame.findOne({ name: name });
        // Checking if the name of the event is already in the database
        if (existNameVideoGame) {
            return res.status(400).json({
                ok: false,
                msg: 'Name of this game exists'
            });
        }

        if (amount > 20){

            return res.status(400).json({
                ok: false,
                msg: 'We do not have enough space'
            });
        }
        console.log(category);
        if( category == 'adventure'){
            return res.status(400).json({
                ok:false,
                msg: 'The category does not exist'
            })
        }

        if(ageToPlay != "+18" ){
            if(category == "War" ||category == "Combat"){
                return res.status(400).json({
                    ok: false,
                    msg: 'The age to play should be +18 if its a war category'
                });
            }
        }
        
        // If the event is not exists yet.
        // A new event is created 
        const videoGame = new VideoGame({ _id, name, category, ageToPlay, amount});

        // Save it to the database
        await videoGame.save();

        // Return a json with the id of the event
        res.json({
            ok: true,
            msg: 'addGame',
            videogame: videoGame.name
            
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error trying to add a videogame.'
        });
    }
}

const deleteVG = async(req, res = response) => {

    const { _id } = req.body;
    const url = require('url');
    const queryObject = url.parse(req.url, true).query;
    const name = queryObject.name;

    try {

        const videoGame = await VideoGame.findOneAndRemove( {name: name} );

        console.log(videoGame);

        if(videoGame){
            
            return res.json({
                ok: true,
                msg: 'This videoGame has been eliminated'
                
            });
        }else{

            return res.json({
                ok: false,
                msg: 'The id of the videoGame does not exist',
                
            });


        }
            

        
    } catch (error) {
        console.log(error);

        return res.json({
            ok: false,
            msg: 'Has been a problem with the method delete',
            
        });
    }
    


}

const getVG = async(req,res = response ) => {
 
    try {
        const [ videoGames ] = await Promise.all([
            VideoGame.find()
        ]);
    
        if(videoGames.length > 0){
            return res.json({
                ok:true,
                msg: 'All videoGames',
                videogame: videoGames
            });
        }else{
            return res.json({
                ok:false,
                msg: ' There are not videogames yet'
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            ok:false,
            msg: 'There is an error with the method GET'
        })
    }


    
}

const getVGbyId = async(req,res = response ) => {

    const url = require('url');
    const queryObject = url.parse(req.url, true).query;
    const name = queryObject.name;

    try {
        const videoGames  = await VideoGame.findOne({name: name});

        console.log(videoGames);

        if(videoGames){
            return res.json({
                ok:true,
                msg: 'One videogame',
                videogame: videoGames.name
                
            });
        }else{
            return res.status(400).json({
                ok: false,
                msg: 'There is no videogame with this id'
            });
        }
        
    } catch (error) {
        console.log(error);
        return res.json({
            ok:false,
            msg: 'There is an error with the method GET by id'
        })
    }


    
}


module.exports = { addVideoGame, deleteVG, getVG  ,getVGbyId}