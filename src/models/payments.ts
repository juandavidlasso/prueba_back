'use strict';
import { Model } from 'sequelize'

module.exports = (sequelize:any, DataTypes:any) => {
	class Payments extends Model {
		static associate(models:any) {
		// define association here
			models.Payments.belongsTo(models.Riders, { as: 'riderUser', foreignKey: 'riderId', onDelete: 'CASCADE' })
		}
	}
	Payments.init({
		idPayment: {
			type: DataTypes.STRING,
			allowNull: false
		},
		riderId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Riders',
				key: 'idRider'
			},
			onDelete: 'CASCADE'
		},
		typePayment: {
			type: DataTypes.STRING,
			allowNull: false
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		sequelize,
		modelName: 'Payments',
		timestamps: false
	});
	return Payments;
};