const { HfInference } = require('@huggingface/inference');

module.exports = (client, hfToken) => {
    const hf = new HfInference(hfToken);

    client.on('messageCreate', async message => {
        if (message.author.bot) return;

        const messageCreate = message.content.toLowerCase();
        if (messageCreate.includes('snufkin')) {
            const prompt = `[Aqui você coloca o Script para o Snufkin]`; // Importante
            const input = message.content;
            console.log(`Prompt enviado ao modelo: ${prompt} "${input}"`);

            try {
                const resposta = await hf.textGeneration({
                    model: 'SNUFKIN', // O padrão e o "gpt2"
                    inputs: `${prompt} "${input}"`,
                    parameters: {
                        max_new_tokens: 70,
                        temperature: 0.7,
                        top_p: 0.9,
                        top_k: 100, 
                        repetition_penalty: 1.2, 
                    }
                });

                let respostaGerada = resposta.generated_text;
                respostaGerada = respostaGerada.replace(prompt, "").trim();
                console.log(`Resposta gerada: ${respostaGerada}`);
                await message.reply(respostaGerada);
            } catch (error) {
                console.error('Erro ao gerar resposta:', error);
                await message.reply('Snufkin defeito :(');
            }
        }
    });
};
