const repository = require('../repository/OngRepository');

module.exports = {
    async create(ong) {
        return await repository.insert(ong);
    },
    async findAll() {
        return await repository.findAll();
    }
}