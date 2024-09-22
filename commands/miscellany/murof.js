const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('murof')
		.setDescription('Todos os links relacionados a Murof.'),
	async execute(interaction) {
		await interaction.reply(`https://murof.org/\nhttps://discord.gg/Z7TtwTYwrg`)
	}
}