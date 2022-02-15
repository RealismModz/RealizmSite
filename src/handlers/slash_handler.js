const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9');
const fs = require('fs'), path = require('path');
const config = JSON.parse(fs.readFileSync(path.resolve(__filename, '..', '..', 'config.json'), 'utf-8')); // propper way to read json
let commands = []
let commandBindings = {}
const rest = new REST({ version: '9' }).setToken(config.client.token);
let client
module.exports = async (_client, Discord) => {/* likely will stay unused in favour of keeping everything in this file */ };
module.exports.init = (_client) => {
	client = _client;
	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return;
		const binding = commandBindings[interaction.commandName] || {
			Callback: i=>i.reply('**<:failCloud:934627400761872455> Cannot find interaction!**\nContact YieldingCoder#3961 for assistance!')
		}
		try {
			await binding.Callback(interaction,client);
		} catch(e) {
			try {
				await interaction.reply('```yml\n/ --- \\\n| ERR |\n\\ --- /\n```')
			} catch (e) {}
			await interaction.editReply(`**\`\`\`yml
/ ---------------- \\
| An error ocurred |
\\ ---------------- /
\`\`\`**

Error Details:
>>> **\`\`\`yml
CMD: ${binding.Name}
ERR: ${e}
\`\`\`**`)
			console.error(e)
		}
	})
	return module.exports.UpdateCommands();
}
const slsDir = path.resolve(__filename, '..', '..', 'slscommands');
module.exports.UpdateCommands = async () => {
	commands = [];
	commandBindings = {};
	fs.readdirSync(slsDir).forEach(v => {
		let x = (new Function('require',`try {
	${fs.readFileSync(path.resolve(slsDir, v),'utf-8')}
} catch(e) {
	console.warn('Error occurred in ${v}')
	console.error(e)
}
`))(require);
		if (!x[0]) throw new Error('invalid command ' + v + ' (!x[0])')
		x[1] = x[1] ? x[1] : inter => inter.reply('Not implemented')
		x[2] = x[2] ? x[2] : {}
		commands.push(x)
		commandBindings[x[0].name || v.toLowerCase()] = {
			SlashCommand: x[0],
			Name: x[0].name,
			Description: x[0].description,
			Callback: x[1],
			Options: x[2]
		}
	});
	const APICMDS = commands.map(v=>v[0].toJSON())

	// Update Guilds
	const guilds = client.guilds.cache.map(guild => guild.id);
	guilds.forEach(async guildId => {
		await rest.put(Routes.applicationGuildCommands(client.user.id, guildId), { body: APICMDS })
	})
	console.log('<HANDLER> Successfully registered application commands.');
}