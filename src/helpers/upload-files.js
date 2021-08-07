const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFiles = ({ files, extensions = ['jpg', 'png'], folder = '' }) => {
	return new Promise((resolve, reject) => {
		const { uploadFile } = files;
		const nameCutOff = uploadFile.name.split('.');
		const extension = nameCutOff[nameCutOff.length - 1];

		if (!extensions.includes(extension)) {
			return reject(
				`The extension: '${extension}' it is not allowed, the extesion allowed are:'${extensions}'`
			);
		}

		const uniqueName = uuidv4() + '.' + extension;

		const uploadPath = path.join(__dirname, '/../uploads/', folder, uniqueName);

		// Use the mv() method to place the file somewhere on your server
		uploadFile.mv(uploadPath, (err) => {
			if (err) {
				reject(err);
			}

			resolve(uploadPath);
		});
	});
};

module.exports = {
	uploadFiles,
};
