'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Riders', [
			{
				name: 'Juan David',
				document: '123456',
				email: 'juan@gmail.com',
				phone: '3105305169'
			},
			{
				name: 'Paola Andrea',
				document: '981736',
				email: 'paola@gmail.com',
				phone: '3117364029'
			},
			{
				name: 'Fabian Andres',
				document: '491835',
				email: 'fabian@gmail.com',
				phone: '3117392746'
			},
			{
				name: 'Geraldine Lopez',
				document: '827461',
				email: 'geraldine@gmail.com',
				phone: '3109283756'
			},
			{
				name: 'Luisa Lopez',
				document: '817364',
				email: 'luisa@gmail.com',
				phone: '3108274016'
			}
		], {});
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Riders', null, {});
	}
};
