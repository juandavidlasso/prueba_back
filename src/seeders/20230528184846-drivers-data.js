'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Drivers', [
			{
				firstName: 'Juan',
				lastName: 'Lasso',
				document: '394817',
				email: 'juan@hotmail.com',
				latitude: 1,
				longitude: 1
			},
			{
				firstName: 'Pedro',
				lastName: 'Perez',
				document: '928473',
				email: 'pedro@hotmail.com',
				latitude: 2,
				longitude: 2
			},
			{
				firstName: 'Julian',
				lastName: 'Moreno',
				document: '928164',
				email: 'julian@hotmail.com',
				latitude: 3,
				longitude: 3
			},
			{
				firstName: 'Sebastian',
				lastName: 'Sanchez',
				document: '482746',
				email: 'sebastian@hotmail.com',
				latitude: 4,
				longitude: 4
			},
			{
				firstName: 'Andres',
				lastName: 'Salazar',
				document: '284750',
				email: 'andres@hotmail.com',
				latitude: 5,
				longitude: 5
			}
		], {});
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Drivers', null, {});
	}
};
