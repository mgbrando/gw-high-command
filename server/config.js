module.exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       'mongodb://mgbrando:aidynmb9@ds149030.mlab.com:49030/gwhighcommand';
                       //'mongodb://localhost/gwhighcommand';
module.exports.PORT = process.env.PORT || 3001;