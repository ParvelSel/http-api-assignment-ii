//Var Declarations
const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const dataHandler = require('./dataResponses.js');

const port = process.env.PORT || 3000;

//Im so used to using switch statements but this is so much better after going thru head request
const urlStruct = {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCss,
    '/getUsers': dataHandler.getUsers,
    '/notReal': dataHandler.getNotReal,
    '/addUser': dataHandler.addUser,
    notFound: dataHandler.notFound
};

//Core RoutingFunctionality
const onRequest = (request, response) => {
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
    const query = Object.fromEntries(parsedUrl.searchParams);

    //Url checking and routing
    if (urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response, query);
    } else {
        urlStruct.notFound(request, response, query);
    }
};

//Server Maker
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on port 127.0.0.1:${port}`);
});