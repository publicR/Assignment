const excelToJson = require('convert-excel-to-json');
const DIR = './Public/Images'

module.exports = {
    excelToJson: (file) => {
        return new Promise((resolve, reject) => {
            const excelData = excelToJson({
                sourceFile: DIR + '/' + file.filename,
                sheets: [{
                    name: 'users',
                    header: {
                        rows: 1
                    },
                    columnToKey: {
                        A: 'firstName',
                        B: 'lastName',
                        C: 'mobile',
                        D: 'password',
                        E: 'userName',
                    }
                }]
            });
           
            return resolve(excelData)
            }).catch(error => {
                return reject(error)
            })
    }
}