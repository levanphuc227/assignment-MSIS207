const MessageManager = require('../manager/MessageManager.js');
const Rest = require('../utils/Restware');

module.exports = {
    create: (req, res) => {
        let data = req.body || '';
        MessageManager.create(data, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            let resData = {};

            resData.id = result.id;
            return Rest.sendSuccessOne(res, resData, httpCode);
        })
    },

    getOne: (req, res) => {
        let id = req.params.id;

        MessageManager.getOne(id, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            return Rest.sendSuccessOne(res, result, httpCode);
        })
    },
    getAll: (req, res) => {
        //let query = req.params || '';
        let query = req.query || '';
        MessageManager.getAll(query, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            return Rest.sendSuccessMany(res, result, httpCode);
        })
    },
    update: (req, res) => {
        let id = req.params.id;
        let data = req.body || '';
        console.log(req.params,data);
        MessageManager.update(id, data, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            let resData = {};
            resData.id = result;
            return Rest.sendSuccessOne(res, result, httpCode);
        })
    },
    delete: (req, res) => {
        let id = req.params.id;
        MessageManager.delete(id, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            let resData = {};
            resData.id = result;
            return Rest.sendSuccessOne(res, result, httpCode);
        })
    }

}