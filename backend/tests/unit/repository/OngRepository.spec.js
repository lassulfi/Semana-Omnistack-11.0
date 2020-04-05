const connection = require('../../../src/database/connection');
const repository = require('../../../src/repository/OngRepository')

let ong = {};
let ongs = null;
let id = null;

describe('OngRepository', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to save a new ONG', async () => {
        givenWheHaveAValidOng();
        await whenCallRepositoryInsertMethod();
        thenWeExpectToHaveAValidId();
        thenWeExpectIdToHaveLengthEqualsEight();        
    }),

    it('should be able to list all ongs', async () => {
        givenWheHaveAValidOng();
        await givenWeHaveOngsInTheDatabase();
        await whenWeCallRepositoryFindAllMethod();
        thenWeExpectToHaveAValidList();
        thenWeExpectAListWithSizeEqualsOne();
    })
})

/**
 * Given Methods
 */
function givenWheHaveAValidOng() {
    ong = {
        name: 'ONG para Teste',
        email: 'contato@ongparateste.com.br',
        whatsapp: '119988881111',
        city: 'Sao Paulo',
        uf: 'SP'
    }
}

async function givenWeHaveOngsInTheDatabase(){
    await repository.insert(ong);
}

 /**
  * When methods
  */

  async function whenCallRepositoryInsertMethod() {
      result = await repository.insert(ong);
      id = result.id;
  }

  async function whenWeCallRepositoryFindAllMethod() {
      ongs = await repository.findAll();
  }

  /**
   * Then methods
   */

function thenWeExpectToHaveAValidId() {
    expect(id).toBeDefined();
}

function thenWeExpectIdToHaveLengthEqualsEight() {
    expect(id).toHaveLength(8);
}

function thenWeExpectToHaveAValidList(){
    expect(ongs).toBeDefined();
}

function thenWeExpectAListWithSizeEqualsOne() {
    expect(ongs).toHaveLength(1);
}