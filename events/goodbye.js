module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const channel = member.guild.channels.cache.get('ID DO CANAL');
        if (!channel) return;

        const farewellMessage = `MENSAGEM`; // aqui você coloca a mensagem de saida.

        try {
            await channel.send(farewellMessage);
        } catch (error) {
            console.error('Snufkin erro [mensagem de saída]', error);
        }
    },
};
