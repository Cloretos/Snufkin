const { Events } = require('discord.js');
const { ActivityType, PresenceUpdateStatus } = require('discord.js');

// Para você colocar status aleatorios nele, vai trocando a cada 1 hora, você também pode mudar isso se quiser!
const status = [
    ":(failure(: - Lil Yachty",
    "IVE OFFICIALLY LOST ViSiON!!!! - Lil Yachty",
];

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        function updateStatus() {
            const statusAleatorio = status[Math.floor(Math.random() * status.length)];
            client.user.setPresence({
                activities: [
                    {
                        name: statusAleatorio,
                        type: ActivityType.Listening, 
                    }
                ],
                status: PresenceUpdateStatus.Online, 
            });
        }
        updateStatus();

        setInterval(updateStatus, 600000); // time para a troca de status

        console.log(`Pronto! Conectado como ${client.user.tag}`);
    },
};
