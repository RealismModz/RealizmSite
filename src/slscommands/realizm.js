const { SlashCommandBuilder } = require('@discordjs/builders');

return [
	new SlashCommandBuilder().setName('realizm').setDescription('Replies with a special message'),
	async interaction=>{
		interaction.reply('@everyone OneShot is not gay for Realizm')
	}
];