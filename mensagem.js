const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Para caso você queira enviar alguma mensagem usando ele, basta informar o ID do canal e a mensagem.
// Você também vai precisar carregar esse comando a parte.

client.once('ready', () => {
    console.log(`Enviando mensagem pelo ${client.user.tag}`);

    const channel = client.channels.cache.get('ID DO CANAL');
    
    if (channel) {
        channel.send('MENSAGEM')
            .then(() => console.log('Snufkin enviou a mensagem com sucesso!'))
            .catch(console.error);
    } else {
        console.error('Snufkin defeito :C');
    }
});

// <@user_id>

client.login(token);
