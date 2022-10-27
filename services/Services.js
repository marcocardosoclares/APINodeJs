const database = require("../models")

class Services {
    constructor(model) {
        this.model = model;
    }

    async index(where = {}) {
        return database[this.model].findAll({ where });
    }

    async find(column) {
        return database[this.model].findOne({ where: column });
    }

    async store(newRecord) {
        return database[this.model].create(newRecord);
    }

    async update(UpdatedData, id, transaction = {}) {
        return database[this.model].update(
            UpdatedData,
            { where: { id } },
            transaction
        );
    }

    async updateMany(UpdatedData, where, transaction = {}) {
        return database[this.model].update(
            UpdatedData,
            { where: { ...where } },
            transaction
        );
    }

    async delete(id) {
        return database[this.model].destroy({ where: { id } });
    }
}

module.exports = Services;
