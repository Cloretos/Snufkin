const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pingo')
        .setDescription('Snufkin pinga para você de volta.'),
    async execute(interaction) {
        const apiLatency = Math.round(interaction.client.ws.ping);
        const botLatency = Date.now() - interaction.createdTimestamp;

        await interaction.reply(`Latência_API: ${apiLatency}ms\nLatência_BOT: ${botLatency}ms`);
    }
};


