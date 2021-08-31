const { OK, BAD_REQUEST, UNAUTHORIZED } = require('../config/messages');

exports.success = (res, message, data = []) => {
    return res.status(OK).json({ message, data, type:'Success' });
}

exports.failure = (res, message, data = []) => {
    return res.status(BAD_REQUEST).json({ message, data, type:"Failure" });
}
