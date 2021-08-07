const dbValidator = require('./db-validators');
const generateJWT = require('./generateJWT');
const googleVerify = require('./google-verify');
const uploadFiles = require('./upload-files');

module.exports = {
	...dbValidator,
	...generateJWT,
	...googleVerify,
	...uploadFiles,
};
