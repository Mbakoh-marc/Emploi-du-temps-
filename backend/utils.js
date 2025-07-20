const fs = require('fs-extra');
const path = require('path');

function getData(file) {
    return fs.readJson(path.join(__dirname, 'data', file));
}

function saveData(file, data) {
    return fs.writeJson(path.join(__dirname, 'data', file), data, { spaces: 2 });
}

module.exports = { getData, saveData };
