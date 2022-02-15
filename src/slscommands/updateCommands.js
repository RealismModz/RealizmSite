const { SlashCommandBuilder } = require('@discordjs/builders');
const slhn = require('../handlers/slash_handler.js')
const clearModule = require('clear-module')
return [
	new SlashCommandBuilder().setName('updatecommands').setDescription('Updates Bot Slash Commands'),
	async (interaction)=>{
		await interaction.reply('<a:loading:934622322751590480> **Updating Commands**')
		try {
			await slhn.UpdateCommands();
		} catch(e) {
			interaction.editReply(`**<:failCloud:934627400761872455> An error ocurred while updating commands!**

*Error Information:*
>>> ${e}`)
			return;
		}
		interaction.editReply('<a:check:934622589169577985> **Updated Slash Commands!**')
	}
];