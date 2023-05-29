'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Payments', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			idPayment: {
				type: Sequelize.STRING,
				allowNull: false
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
			typePayment: {
				type: Sequelize.STRING,
				allowNull: false
			},
			status: {
				type: Sequelize.STRING,
				allowNull: false
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Payments');
	}
};