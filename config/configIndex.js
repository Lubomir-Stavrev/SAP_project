const config = {
    development: {
        PORT: 5000,
        DB_CONNECTION: 'mongodb://localhost/sap',
    }
}

module.exports = config.development;