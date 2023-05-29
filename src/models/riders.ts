'use strict';
import { Model } from 'sequelize'

module.exports = (sequelize:any, DataTypes:any) => {
	class Riders extends Model {
		static associate(models:any) {
		// define association here
		models.Payments.hasMany(models.Riders, { as:'listPayments', foreignKey:'riderId', onDelete: 'CASCADE' } )
		}
	}
	Riders.init({
		idRider: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		name: {
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
		phone: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		sequelize,
		modelName: 'Riders',
		timestamps: false
	});
	return Riders;
};
