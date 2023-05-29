'use strict';
import { Model } from 'sequelize'

module.exports = (sequelize:any, DataTypes:any) => {
	class Rides extends Model {
		static associate(models:any) {
		// define association here
		}
	}
	Rides.init({
		idRide: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		riderId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		driverId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		latitude: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		longitude: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		timeRide: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		sequelize,
		modelName: 'Rides',
		timestamps: false
	});
	return Rides;
};