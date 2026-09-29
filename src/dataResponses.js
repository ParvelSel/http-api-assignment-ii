// main replier updated for workflow submission
const users = {};

const respond = (request, response, status, object) => {
    const content = JSON.stringify(object);
    
    response.writeHead(status, { 'Content-Type': 'application/json' }); 
    
    if(request.method !== 'HEAD'){
        response.write(content);
    }
    
    response.end();
}

//Success Case
const getUsers = (request, response) => {
    const responseJSON = {
        users,
    }
    respond(request, response, 200, responseJSON);
};

const updateUser = (request, response) => {
    const newUser = {
        created_at: Date.now(),
    }

    users[newUser.created_at] = newUser;

    return respond(request, response, 201, newUser);
}

//Not Found Case
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respond(request, response, 404, responseJSON);
};


const getNotReal = (request, response) => {
    let responseJSON = {};
    if(request.method !== 'HEAD'){
        responseJSON = {
            message: 'The page you are looking for was not found.',
            id: 'notFound'
        }
    }else{
        responseJSON = {
            message: ''
        }
    }
    
    respond(request, response, 404, responseJSON);
};



module.exports = {
    getUsers,
    getNotReal,
    notFound
};