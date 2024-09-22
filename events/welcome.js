const { ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const channel = member.guild.channels.cache.get('ID DO CANAL');
        if (!channel) return;

        const welcomeMessage = `MENSAGEM`; // aqui você coloca a mensagem de boas vindas.
        const murof_org = new ButtonBuilder()
            .setLabel('murof.org')
            .setURL('https://murof.org/')
            .setStyle(ButtonStyle.Link);
        
        try {
            await channel.send({
                content: welcomeMessage,
                components: [{ type: 1, components: [murof_org, drive] }]
            });
        } catch (error) {
            console.error('Snufkin erro [welcome]', error);
        }
    },
};
