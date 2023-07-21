const { JWT_KEY } = require('../config/serverConfig');
const UserRepository = require('./../repository/user-repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw {error};
        }
    }

    async destory(userId) {
        try {
            const user = await this.userRepository.destroy(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw {error};
        }
    }

    createToken(user) {
        console.log("IN UI");
        console.log(user);
        console.log("JW",JWT_KEY);
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw {error};
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error; 
        }
    }

    checkPassword(userInputPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try {
            console.log(email, plainPassword);
            //S1 Fetch user using email from DB
            const user = await this.userRepository.getByEmail(email);
            //S2 Compare Incoming plain password with stored encrypted passwords
            const passwordsMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordsMatch) {
                console.log("Password mismatch");
                throw {error: "Incorrect Pswd"};
            }

            //S3
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in sign in process");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error: 'Invalid token'};
            }

            const user = this.userRepository.getById(response.id);
            if(!user) {
                throw {error:"No user with corresponding token exists"};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in authenticating");
            throw error;
        }
    }
}

module.exports = UserService;