export const options = {
    mariaDB: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: '',
        },
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: './src/dataBase/db.sqlite',
        },
        useNullAsDefault: true
    },
};
