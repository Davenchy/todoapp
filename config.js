module.exports = {
    db_uri: process.env.DB_URI || 'mongodb://localhost:27017/todoapp',
    secret: process.env.SECRET || 'emvJo17Srb6MhjhX25TDQEZccHzJj99Qs1usHbolBflZKlLwvqK86cnc3WhHjOI',
    port: process.env.PORT || 3000
}
