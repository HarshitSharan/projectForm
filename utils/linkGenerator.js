const { v4: uuidv4 } = require('uuid');
const Link = require('../models/Link');

const futureDateByDays = (days) => {
    return Math.floor((Date.now() + (days * 86400000))/1000);
};

const currrentTime = () => {
    return Math.floor((Date.now())/1000);
}

module.exports = {
    async linkGenerator() {
        const link = new Link(
            linkId,
            expiryDate
        );
        const linkId = uuidv4();
        link.linkId = linkId;
        link.expiryDate = futureDateByDays(10);
        const result = await link.save()
        console.log(result);
        return result;
    }
}