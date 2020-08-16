const fs = require('fs');
const { publicPath } = require('../config/storage');
const path = require('path');
const multer = require('multer');
const storage = (filePath) => {
    return path.join(publicPath, filePath);
};
module.exports = {
    storage,
    async create(filePath) {
        return new Promise((resolve, reject) => {
            fs.open(storage(filePath), 'w', (err, number) => {
                if (err) {
                    return reject(err);
                }
                resolve(number);
            })
        });
    },
    async truncate(dir) {
        return new Promise((resolve, reject) => {
            let directory = storage(dir);
            fs.readdir(directory, (err, files) => {
                if (err) {
                    return reject(err);
                }
                for (const file of files) {
                    fs.unlink(path.join(directory, file), err => {
                        if (err) {
                            return reject(err);
                        }
                    });
                }
                resolve(true);
            });
        });
    },
    async delete(filePath) {
        return new Promise((resolve, reject) => {
            fs.unlink(storage(filePath), (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            })
        });
    },
    async has(filePath) {
        return new Promise((resolve, reject) => {
            fs.access(storage(filePath), fs.F_OK, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            })
        });
    },
    multer(destination, options = null) {
        const storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, path.join(publicPath, destination))
            },
            filename: function (req, file, callback) {
                let name = file.originalname.split('.');
                let extension = '.' + name.pop();
                const newName = name.join('') + '$_' + Date.now() + extension;
                callback(null, newName)
            }
        });
        return multer({ storage, ...options })
    }
}