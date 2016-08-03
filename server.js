var express = require('express');
var sess =  require('cookie-session');
var bodyParser =  require('body-parser');


var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

app.use(sess({secret: 'todotopsecret' , 
				name: 'session'
  				})) ; 

/*
server = http.createServer(function(req , res){
	res.writeHead(200) ; 
	res.end("salut tout le monde!! ") ; 
}); 
server.on("close" ,function(){
	console.log('Baye!'); 
}) ; */

// ... Tout le code de gestion des routes (app.get) se trouve au-dessus



app.listen(8080);
app.get('/todo', function (req, res) {
	//res.setHeader('Content-Type', 'text/cache-manifest');
	if(req.session.list==undefined)
	{	
		req.session.list=[] ; 
	}
	

	//	html =app.render('./base.ejs' , {list:req.session.list});
		
		 res.render('base.ejs', {list: req.session.list});
		
	
});
app.post('/todo/ajouter', urlencodedParser,function(req, res) {
	if(req.body.add!= undefined && req.body.add!=''){
		req.session.list.push(req.body.add); 
	}
	res.redirect('/todo');
});
app.get('/todo/suprimer/:id', function(req, res) {
	if(req.session.list!=undefined)
		req.session.list.splice(req.params.id , 1); 
	res.redirect('/todo');	
});
app.on('close' , function(){
	req.session = null ;
})

/* On redirige vers la todolist si la page demandée n'est pas trouvée */
app.use(function(req, res, next){
    res.redirect('/todo');
});
process.on('SIGTERM', function () {
 req.session = null ;
  app.close();
});

app.listen(80); 
