module.exports = {
	development: {
		username: "postgres",
		password: "JUAN123",
		database: "prueba_back",
		host: "localhost",
		dialect: "postgres",
		port: "5432"
	},
	test: {
		username: "root",
		password: null,
		database: "database_test",
		host: "localhost",
		dialect: "mysql"
	},
	production: {
		username: "root",
		password: null,
		database: "database_production",
		host: "localhost",
		dialect: "mysql"
	}
}
