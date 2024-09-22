const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Informações sobre a pessoa.'),
	async execute(interaction) {
		await interaction.reply(`Esse comando foi executado por ${interaction.user.username}, que se juntou a ${interaction.member.joinedAt}.`);
	},
};