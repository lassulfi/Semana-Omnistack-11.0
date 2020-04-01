const connection = require('../../../src/database/connection');
const repository = require('../../../src/repository/OngRepository')

describe('OngRepository', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to save a new ONG', async () => {
        const ong = {
            name: 'ONG para Teste',
            email: 'contato@ongparateste.com.br',
            whatsapp: '119988881111',
            city: 'Sao Paulo',
            uf: 'SP'
        }
        
        const { id } = await repository.insert(ong);
        
        expect(id).toHaveLength(8);
    }),

    it('should be able to list all ongs', async () => {
        const ongs = await repository.findAll();

        expect(ongs).toBeDefined();
    })
})