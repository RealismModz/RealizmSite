const { SlashCommandBuilder } = require('@discordjs/builders');

return [
	new SlashCommandBuilder().setName('oneshot').setDescription('Replies with `Oneshot is cute`'),
	async interaction=>{
		interaction.reply('OneShot Is Cute')
	}
];