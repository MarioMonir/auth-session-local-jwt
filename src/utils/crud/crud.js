/* Generic Sequelize Crud  */
const logger = require("../logger/logger.js");

// Create one
const create = async (model, body) => {
    try {
        return await model.create(body);
    } catch (err) {
        err.errorFrom = "database";
        throw err;
    }
};

// Select all
const findAll = async (model) => {
    try {
        return await model.findAll();
    } catch (err) {
        err.errorFrom = "database";
        throw err;
    }
};

// Select one by id
const findOne = async (model, body) => {
    try {
        return await model.findOne({ ...body });
    } catch (err) {
        err.errorFrom = "database";
        throw err;
    }
};

// Update one by id
const update = async (model, { body, id }) => {
    try {
        return await model.update(body, { where: { id } });
    } catch (err) {
        err.errorFrom = "database";
        throw err;
    }
};

// Delete one by id
const destroy = async (model, id) => {
    try {
        return await model.destroy({ where: { id } });
    } catch (err) {
        err.errorFrom = "database";
        throw err;
    }
};

module.exports = { create, findAll, findOne, update, destroy };
