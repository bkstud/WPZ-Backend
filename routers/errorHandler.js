'use strict';

function onClientError(res, status_code, message){
    console.log(`Client error ${status_code}: ${message}`);
    res.status(status_code).json({
        "detail": message
    })
}

function onServerError(res, err){
    console.log(err);
    res.status(500).json({
        "stack":err.stack
    });
}

function adminPermisionRequired(res){
    onClientError(res, 403, "Only admin can do this");
}

module.exports = {
    onClientError,
    onServerError,
    adminPermisionRequired
}
