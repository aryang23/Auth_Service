const UserService = require('./../services/user-service');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: response,
            err: {}
        })
    } catch (error) {
        console.log("Something went wrong in controller layer");
        return res.status(500).json({
            message: "Something went wrong in controllers",
            success: false,
            data: {},
            err: error
        })
    }
}

const signIn = async (req, res) => {
    try {
        console.log(req.body);
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(201).json({
            success: true,
            message: "User signed in",
            data: response,
            err: {}
        })
    } catch (error) {
        console.log("Something went wrong in controller layer");
        return res.status(500).json({
            message: "Something went wrong in controllers",
            success: false,
            data: {},
            err: error
        })
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            data: response,
            message: "User is authenticated and token is valid",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong in controllers",
            data: {},
            success: false,
            err: error
        })
    }
}

const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            err: {},
            success: true,
            message: "Successfully checked whether a user is admin or not"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong in controllers",
            data: {},
            success: false,
            err: error
        })
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}