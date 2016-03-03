/** Autor : clement
 *
 *   - creer le serveur
 *   - tester les evenements
 *       - module kbd racourcis clavier
 *
 *
 **/

var http = require('http');
var url = require('url');
//var kbd = require('kbd');
var querystring = require('querystring');

var EventEmitter = require('events').EventEmitter;

//_________________________________________________________________________________________________________________
// Déclaration
var server = http.createServer(function(req, reponse ) {

    //var page = url.parse(requete.url).pathname;
    var page = url.parse(req.url).pathname;
    console.log(page);
    reponse.writeHead(200, {"Content-Type": "text/plain"});

    //gestion de la page
    if ( page == '/'){
        reponse.write("Bien le bonjour vous etes sur la page d'accueil \n");
    }else if ( page == '/sous-sol'){
        reponse.write("vosu êtes dans le sous-sol putain\n");
    }else if ( page == '/chambre'){
        reponse.write("vosu êtes dans la chambre putain\n");
    }else{
        reponse.writeHead(404);
        reponse.write("OK tu sais pas ou t'es putain\n");
    }

    //gestion des param
    var params = querystring.parse(url.parse(req.url).query);

    if('prenom' in params && 'nom' in params){
        reponse.write("Tu t'appel Jean-Michel Lacuite ! ... \nNon jdeconne tu t'appel "+params['prenom']+' '+params['nom']+".. enfin c'est toi qui le dit");
    }
    else{ reponse.write("Tu a bien un prenom man ! Entre le dans l'url, tu va délirer");}

    reponse.end();

});
var jeu = new EventEmitter();

//_________________________________________________________________________________________________________________
// Ecoute
server.on('close', function() {
    console.log('Bye bye !');
})
jeu.on('gameover', function(message,entier){
    console.log(message,entier);
});
/*
kbd.on(67, function(){
    server.close();
} )
*/



//_________________________________________________________________________________________________________________
// Emmission
jeu.emit('gameover', 'Vous avez perdu !',2);

server.listen(8080);
