/* Generic Crud Controller */
const logger = require("../logger/logger.js");
const crud = require("./crud.js");

// ========================================================
// Create one
const create = (model) => async (req, res, next) => {
    try {
        const doc = await crud.create(model, req.body);
        return res.status(201).json(doc);
    } catch (err) {
        next(err);
    }
};

// ========================================================
// Select all
const findAll = (model) => async (req, res, next) => {
    try {
        let doc = await crud.findAll(model);
        return res.status(200).json(doc);
    } catch (err) {
        next(err);
    }
};

// ========================================================
// Select one by id
const findOne = (model) => async (req, res, next) => {
    try {
        const doc = await crud.findOne(model, req.params.id);
        return res.status(200).json(doc);
    } catch (err) {
        next(err);
    }
};

// ========================================================
// Update one by id
const update = (model) => async (req, res, next) => {
    try {
        const doc = await crud.update(model, {
            id: req.params.id,
            body: req.body,
        });
        return res.status(200).json(doc);
    } catch (err) {
        next(err);
    }
};

// ========================================================
// Delete one by id
const destroy = (model) => async (req, res, next) => {
    try {
        const doc = await crud.destroy(model, req.params.id);
        return res.status(200).json(doc);
    } catch (err) {
        next(err);
    }
};

// ========================================================

module.exports = crudController = (model) => ({
    create: create(model),
    findAll: findAll(model),
    findOne: findOne(model),
    update: update(model),
    delete: destroy(model),
});
