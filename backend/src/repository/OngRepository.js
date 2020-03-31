const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    async insert(ong) {
        const { name, email, whatsapp, city, uf } = ong;

        const id = generateUniqueId();

        try {
            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            });
    
            return { id };
        } catch (err) {
            throw new Error('Erro ao persistir ong')
        }
    }
}