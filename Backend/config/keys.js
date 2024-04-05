require('dotenv').config()

const { MONGO_URI, SECRET_KEY } = process.env;

module.exports = {
    mongoURI: MONGO_URI,
    secretOrKey: SECRET_KEY,
}