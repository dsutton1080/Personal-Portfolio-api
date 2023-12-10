const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENV}`, debug: true });
const server = process.env.AZURE_SQL_SERVER;
const database = process.env.AZURE_SQL_DATABASE;
const port = process.env.AZURE_SQL_PORT;
const type = process.env.AZURE_SQL_AUTHENTICATIONTYPE;

module.exports = {
    server,
    port,
    database,
    authentication: {
        type
    },
    options: {
        encrypt: true
    }
};
