const service = require('../../../src/service/OngService');
const repository = require('../../../src/repository/OngRepository');
const generateUniqueId = require('../../../src/utils/generateUniqueId');

const testOng = {
    name: 'ONG para Teste',
    email: 'contato@ongparateste.com.br',
    whatsapp: '119988881111',
    city: 'Sao Paulo',
    uf: 'SP'
}

describe('OngService', () => {
    it('should be able to create a new ong', async () => {
        const mock = jest.spyOn(repository, 'insert');

        mock.mockImplementation(() => ({ id: generateUniqueId() }));

        const { id } = await service.create(testOng);
        
        expect(id).toHaveLength(8);
        expect(repository.insert).toHaveBeenCalled();

        mock.mockRestore();
    }),
    it('should throw error if an error occurr with database connection', async () => {
        const mock = jest.spyOn(repository, 'insert');

        mock.mockImplementation(() => new Error('Erro ao persistir ong.'));

        const { id } = await service.create(testOng);
        
        expect(id).toBeUndefined();
    })
});