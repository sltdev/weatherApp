const request = require('request');
const key = 'db346405809472ef9a55367ef6ac8a7c';

const forecast = (long, lat, destination , cb)=>{

    const url = `https://api.darksky.net/forecast/${key}/${long},${lat}`
    
    request({url: url, json: true}, (err, res)=>{
        if(err){
            cb("Unable to connect to the internet" + err);
        }else if(res.body.error){
            cb('Unable to find location');
        }else{
            const response = res.body;
            const temp = response.currently.temperature;
            const dailySummary = response.daily.summary;
            
            cb(undefined, {
                destination, 
                temp, 
                dailySummary});
        }
        
    });
};


module.exports = forecast;