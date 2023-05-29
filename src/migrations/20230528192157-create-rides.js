'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Rides', {
			idRide: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			riderId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Riders',
					key: 'idRider'
				},
				onDelete: 'CASCADE'
			},
			driverId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Drivers',
					key: 'idDriver'
				},
				onDelete: 'CASCADE'
			},
			latitude: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			longitude: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			timeRide: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW
			},
			status: {
				type: Sequelize.STRING,
				allowNull: false
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Rides');
	}
};