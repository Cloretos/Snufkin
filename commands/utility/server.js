const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		await interaction.reply(`Esse servidor se chama ${interaction.guild.name} e tem ${interaction.guild.memberCount} membros.`);
	},
};