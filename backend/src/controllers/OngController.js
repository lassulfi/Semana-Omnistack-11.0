const generateUniqueId = require('../utils/generateUniqueId')
const service = require('../service/OngService');

module.exports = {
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        const id = generateUniqueId();

        await service.create({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
        
        return response.json( { id });
    },
    async index(request, response) {
        const ongs = await service.findAll();

        return response.json(ongs);
    }
};