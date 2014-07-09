function route(handle, pathname, response, request){
  console.log("About to route a request for: '" + pathname + "'.");
  
  if(typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    console.log("This server will not server static content " + pathname);    
  }
}

exports.route = route
