// console.log('client site js ')

const show_wether=(address,callback)=>{
    fetch('/weather?search='+encodeURIComponent(address)).then((response)=>
    {
       response.json().then((data)=>{
           if(!data.error){
               console.log(data)
               callback(data)
           }
        })
    })
}


const weather=document.querySelector('form')
const input =document.querySelector('input')
const error=document.querySelector('#error')

const forecast=document.querySelector('#forecast')
var weather_data

weather.addEventListener('submit', (event)=>{
    error.setAttribute('style', 'white-space: pre;');
    event.preventDefault()
    error.textContent='loading.......'
    forecast.textContent=""
  show_wether(input.value,(data)=>{
   
    weather_data=data
    if(data.icon){
        console.log(data)
        error.textContent='icon:- '+data.icon+"\r,"+data.summary+"\ntimeZone:"+data.timezone,
     forecast.textContent='time:- '+data.time+'\ntemperature: '+data.temperature
    }
  })
})
