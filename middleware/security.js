const setCors = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allows reqs from all origins
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //used in response to a pre-flight req, to indicate which HTTP headers can be used when making the actual req - any req with the following headers is fine  
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE'); // specifies the methods allowed when accessing the resource, any req with the following request methods are fine
}


module.exports = setCors;