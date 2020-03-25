const request = require('request');
const keys = 'pk.eyJ1Ijoic2FtdGF5MzIiLCJhIjoiY2s3bnhjbWd1MDMyazNobno2dm1vbW54YSJ9.jMk17YM-izGrjr9Z_c8-FQ';


const geoCode = (location, cb)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${keys}`;

    request({url: url, json: true }, (err, res)=>{
        if(err){
            cb("Unable to connect to the internet", undefined);
        }else if(res.body.features.length === 0){
            cb('Invalid Coordinates', undefined)
        }else{
            const data = res.body.features[0];
            const place = data.place_name;
            const coords = data.center;
            const lastIndex = place.lastIndexOf(',');
            const placeName = place.slice(0, lastIndex);
            
            cb(undefined, {
                long: coords[1], 
                lat: coords[0], 
                destination: placeName});
        }
    });
};


module.exports = geoCode;

