'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize:any, DataTypes:any) => {
	class Drivers extends Model {
		static associate(models:any) {
		// define association here
		}
	}
	Drivers.init({
		idDriver: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		document: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		latitude: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		longitude: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		sequelize,
		modelName: 'Drivers',
		timestamps: false
	});
	return Drivers;
};