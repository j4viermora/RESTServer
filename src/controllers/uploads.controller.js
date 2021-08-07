const { response, request } = require('express');
const { uploadFiles } = require('../helpers/upload-files');

const uploadFile = async (req = request, res = response) => {
	const validateFileFromRequest =
		!req.files || Object.keys(req.files).length === 0 || !req.files.uploadFile;

	if (validateFileFromRequest) {
		return res.status(400).json({ msg: 'No files were uploaded.' });
	}

	const pathFile = await uploadFiles({ files: req.files, folder: 'users' });

	res.json({
		msg: 'File saved',
		url: pathFile,
	});
};

module.exports = {
	uploadFile,
};
