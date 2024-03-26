const createError = require('http-errors');
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

module.exports = class UserService {

    async get(data) {
        try {
            const { id } = data;
            const user = await UserModelInstance.findOneById(id);
            if (!user) {
                throw createError(404, 'User record not found');
            }
            return user;
        } catch (err) {
            throw createError(500, err);
        }
    };

    async update(data) {
        try {
            const user = await UserModelInstance.update(data);
            return user;
        } catch (err) {
            throw createError(500, err);
        }
    };

    async getUserInfo(data) {
        try {
            const { id } = data;
            const info = await UserModelInstance.allInfo(id);
            return info;
        } catch (err) {
            throw createError(500, err);
        }
    }

    async createAnimal(data) {
        try {
            const animal = await UserModelInstance.newAnimal(data);
            return animal;
        } catch (err) {
            throw createError(500, err);
        }
    }

    async createPhone(data) {
        try {
            const phone = await UserModelInstance.newPhone(data);
            return phone;
        } catch (err) {
            throw createError(500, err);
        }
    }

}