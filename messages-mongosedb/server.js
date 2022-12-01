const Express = require('express');
const BodyParser = require('body-parser');
const MethodOverride =require('method-override');
const bodyParser = require('body-parser');
const Mongosedb=require('mongoose');
const Ngrok=require('ngrok')
const Database =require('./app/config/Database')


let app = Express();

Mongosedb.Promise=global.Promise;
Mongosedb.connect(Database.MONGODB_URL);

app.use(BodyParser.json({
    limit:'5mb'
}))

app.use(bodyParser.json({
    type:'application/vnd.api+json'
}))

app.use(bodyParser.urlencoded({
limit:'5mb',
extended:true
}))

app.use(MethodOverride('X-HTTP-Method-Override'));

app.all('/*',[require('./app/middlewares/AllowCossDomain')]);

app.use(Express.static(__dirname+'/public'));

require('./app/routes')(app);
app.listen(3000,()=>{
    console.log('Server app running on port 3000!');
})
