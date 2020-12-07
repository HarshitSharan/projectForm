const { v4: uuidv4 } = require('uuid');
const Link = require('../models/Link');

const expiringByDays = (expiryDate) => {
    return Math.ceil((expiryDate - (Date.now()/1000))/86400);
};

const futureDateByDays = (days) => {
    return Math.floor((Date.now() + (days * 86400000))/1000);
};

const currrentTime = () => {
    return Math.floor((Date.now())/1000);
}

module.exports = {
    generateLink: async () => {
        const link = new Link();
        const linkId = uuidv4();
    }
}