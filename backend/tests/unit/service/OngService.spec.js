const service = require('../../../src/service/OngService');
const repository = require('../../../src/repository/OngRepository');
const generateUniqueId = require('../../../src/utils/generateUniqueId');

let mock = null;

let ong = null;

let id = null;

let ongs = null;

describe('OngService', () => {
    beforeEach(() => {
        mock = null;
        id = null;
        ong = null;
        ongs = null;
    });

    it('should be able to create a new ong', async () => {

        givenWeHaveAValidOng();
        givenWeWantToSaveAWithSuccesOng();
        givenWeHaveAValidId();
        await whenWeCallServiceInsertMethod()
        thenWeExpectRepositoryInsertMethodToBeCalled();
        thenWheExpectToHaveAValidId();
        thenWeExpectIdToHaveLenghtEqualsEight();
        thenWeExpectMockToBeRestored();
    }),

    it('should throw error when inserting if an error occurr with database connection', async () => {
        givenWeHaveAValidOng();
        givenWeWantToSaveAWithSuccesOng();
        givenRepositoryThrowsAnError();
        whenWeCallServiceInsertMethod();
        thenWeExpectRepositoryInsertMethodToBeCalled();  
        thenWeExpectAnInvalidId();
        thenWeExpectMockToBeRestored();
    }),

    it('should be able to return a list of ongs', async () => {
        givenWeHaveAValidOngList();
        givenWeWantToRetrieveAnOngsList();
        givenRepositoryRetunsAListOfOng();
        whenWeCallServiceFindAllMethod();
        thenWeExpectRepositoryFindAllMethodToBeCalled();
        thenWeExpectToHaveAValidOngList();
        thenWeExpectTheOngListToHaveLengthValueOfTwo();
    }),

    it('should throw an error when retrieving the list of ongs if an error occurr with the connection', async () => {
        givenWeWantToRetrieveAnOngsList();
        givenRepositoryThrowsAnError();
        whenWeCallServiceFindAllMethod();
        thenWeExpectRepositoryFindAllMethodToBeCalled();
        thenWeExpectToHaveAnInvalidList();
    })
});

/**
 * Given Methods
 */

function givenWeHaveAValidOng() {
    ong = {
        name: 'ONG para Teste',
        email: 'contato@ongparateste.com.br',
        whatsapp: '119988881111',
        city: 'Sao Paulo',
        uf: 'SP'
    }
}

function givenWeHaveAValidId() {
    mock.mockImplementation(() => ({ id: generateUniqueId() }));
}

function givenWeWantToSaveAWithSuccesOng(){
    mock = jest.spyOn(repository, 'insert');
}

function givenRepositoryThrowsAnError() {
    mock.mockImplementation(() => {throw new Error('Erro ao persistir ong.')});
}

function givenWeHaveAValidOngList(){
    ongs = [
        {
            name: 'ONG para Teste 1',
            email: 'contato@ongparateste1.com.br',
            whatsapp: '119988881111',
            city: 'Sao Paulo',
            uf: 'SP'
        },
        {
            name: 'ONG para Teste 2',
            email: 'contato@ongparateste2.com.br',
            whatsapp: '119988881111',
            city: 'Sao Paulo',
            uf: 'SP'
        }
    ]
}

function givenWeWantToRetrieveAnOngsList() {
    mock = jest.spyOn(repository, 'findAll');
}

function givenRepositoryRetunsAListOfOng(){
    mock.mockImplementation(() => (ongs));
}

/**
 * When Methods
 */

async function whenWeCallServiceInsertMethod() {
    const result = await service.create(ong);
    id = result.id;
}

async function whenWeCallServiceFindAllMethod() {
    ongs = await service.findAll();
}

 /**
  * Then Methods
  */

  function thenWheExpectToHaveAValidId() {
      expect(id).toBeDefined();
  }

  function thenWeExpectIdToHaveLenghtEqualsEight(){
      expect(id).toHaveLength(8);
  }

  function thenWeExpectRepositoryInsertMethodToBeCalled(){
    expect(repository.insert).toHaveBeenCalled();
  }

  function thenWeExpectAnInvalidId(){
    expect(id).toBeNull();
  }

  function thenWeExpectRepositoryFindAllMethodToBeCalled() {
      expect(repository.findAll).toHaveBeenCalled();
  }

  function thenWeExpectToHaveAValidOngList() {
      expect(ongs).toBeDefined();
  }

  function thenWeExpectTheOngListToHaveLengthValueOfTwo() {
      expect(ongs).toHaveLength(2);
  }

  function thenWeExpectToHaveAnInvalidList(){
      expect(ongs).toBeNull();
  }

  function thenWeExpectMockToBeRestored() {
      if(mock) mock.mockRestore();
  }