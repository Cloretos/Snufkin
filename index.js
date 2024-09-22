const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, REST, Routes } = require('discord.js');
const { clientId, token, hfToken } = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Carrega o GPT do Snufkin, agora em outro local.
require('./events/snufkin.js')(client, hfToken);

client.commands = new Collection();
const commands = [];

const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'));

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands', folder)).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(path.join(__dirname, 'commands', folder, file));
        if (command.data && command.execute) {
            commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command);
        } else {
            console.warn(`[WARNING] O comando em ${file} está faltando a propriedade "data" ou "execute".`);
        }
    }
}

const rest = new REST({ version: '10' }).setToken(token);

// Carregar somente quando der algum problema grave nos comandos Slash!!
/*async function clearGlobalCommands() {
    try {
        console.log('Limpando comandos globais antigos...');
        await rest.put(Routes.applicationCommands(clientId), { body: [] });
        console.log('Comandos globais antigos removidos com sucesso.');
    } catch (error) {
        console.error('Erro ao limpar comandos globais antigos:', error);
    }
}*/

async function registerCommands() {
    try {
        console.log(`Iniciando a atualização de ${commands.length} comandos de aplicação (/)...`);
        const data = await rest.put(
            Routes.applicationCommands(clientId), 
            { body: commands }
        );
        console.log(`Comandos recarregados com sucesso: ${data.length}.`);
    } catch (error) {
        console.error('Erro ao recarregar comandos de aplicação:', error);
    }
}

(async () => {
    await registerCommands();
})();

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`Nenhum comando correspondente a ${interaction.commandName} foi encontrado.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error('Erro ao executar o comando:', error);
        const response = { content: 'Snufkin encontrou um erro!', ephemeral: true };
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(response);
        } else {
            await interaction.reply(response);
        }
    }
});

const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(path.join(__dirname, 'events', file));
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token);
