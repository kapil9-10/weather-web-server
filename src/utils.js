const request=require('request')

const geocode = (address, callback) => {
    const geolocurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2FwaWw5OSIsImEiOiJjazRmbGtxd3IwbnRqM2VvN3VlZ2dqbXN6In0.CnjBVJaJ_g1tk3u35pp4-g&limit=1'
    request({ url: geolocurl, json: true }, (error, response) => {
        if (error) {
            // console.log('cannot connect to server')
            callback({error:'server is not connect '}, undefined)
        } else {
            const val = response.body
            if (response.statusCode == 200 && val.features.length > 0) {
                // console.log('lat:- ' + data.features[0].center[0])
                // console.log('lng:- ' + data.features[0].center[1])
                //console.log(val.features.length >=0)
                //console.log(val.features.length)
                const data = {
                    name: val.features[0].place_name,
                    lat: val.features[0].center[0],
                    lng: val.features[0].center[1]
                }
                callback(undefined, data)
            } else {
                callback({error:'unable to find place'}, undefined)
            }
        }
    })
}

const weatherinfo = (lat, lng,callback) => {
    const url = 'https://api.darksky.net/forecast/eb1b6e98077114ab3a0c52958af9e16f/'+encodeURIComponent(lng)+','+encodeURIComponent(lat)
    console.log(url)
    request({ url: url, json: true }, (error, response) => {
        // const data=JSON.parse(response.body)
        if (error) {
            callback({error:'unable to connect internet'},undefined)
        } else {

            const data = response.body
            //console.log(data)
            const statucode = response.statusCode
            //console.log(statucode)

            if (statucode == 200) {
                // console.log(data.currently.icon)
                // console.log("time:- " + data.currently.time)
                // console.log('temperature:- ' + data.currently.temperature)
                const val={
                    icon:data.currently.icon,
                    time:data.currently.time,
                    temperature:data.currently.temperature
                }
                callback(undefined,val)
            } else {
                callback({error:'unable to predict weather'},undefined)
            }
        }

    })
}
module.exports={
    geocode:geocode,
    weatherinfo:weatherinfo
}