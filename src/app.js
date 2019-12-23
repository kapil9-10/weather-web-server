const express =require('express')
const path=require('path')
const hbs =require('hbs')
const utils=require('./utils')

// console.log(__dirname)
// console.log(path.join(__dirname,'../Public'))
const app=express()
const port=process.env.PORT || 3000
// define path for expres config
const publicDirPath=path.join(__dirname,'../Public')
const viewPath=path.join(__dirname,'../template/views')
const partials=path.join(__dirname,'../template/partials')
//app.com
//app.com/help
//app.com/about
//set up express static location
app.use(express.static(publicDirPath))

// app.get('',(req,res)=>{
//     res.send('<h1>hello express!!</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send('You r Help page')
// })
// app.get('/about',(req,res)=>{
//     res.send({
//         name:'kapil',
//         age:22
//     })
// })
// read express es6 api for learn express 
//set handlebars views engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partials)

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'kapil verma'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'weather app About',
        name:'kapil verma'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'weather app help ',
        message:'raise a ticket if you find any problem we will love to help',
        name:'kapil verma'
    })
})

 
app.get('/weather',(req,res)=>{
    if(req.query.search){
            utils.geocode(req.query.search, (error, response) => {
                if(response){
                    utils.weatherinfo(response.lat,response.lng,(error,response)=>{
                        if(response)
                        {
                            return res.send(response)
                        }
                        if(error){
                            return res.send(error)
                        }
                    })
                }
                else{
                    return res.send(error)
                }
             })
        // res.send({
        //     temperature:'35.C',
        //     location:req.query.search,
        //     heredity:'30%',
        //     rain_forecast:"0%",
        //     forecast:'it will rain today after 3 pm'
        // })
    }else
    {
        res.send({
            error:'You entre the wrong name'
        })
    }
})

app.get('/help/*',(req,res)=>{
    res.render('404-error',{
        title:'Sorry Help article not found '
    })
})

app.get('*',(req,res)=>{
    res.render('404-error',{
        title:'you r on wrong route'
    })
})

app.listen(port, ()=>{console.log('server is up and running!!! Post:- '+port)})