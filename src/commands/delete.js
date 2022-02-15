module.exports = {
	name:'delete',
	description:'Deletes a given amount of messages',
	aliases: [
		'del',
		'clear',
		'rmv',
		'remove',
		'purge'
	],
	botPermissions: [
		"SEND_MESSAGES",
		"VIEW_CHANNEL",
		"READ_MESSAGE_HISTORY",
		"MANAGE_MESSAGES"
	],
	permissions: ["MANAGE_MESSAGES"],
	cooldown:1,
	 async execute(client, message, args, Discord, cmd) {
		 if(!args[0]) return message.reply("please enter the amount of messages that you want to clear!");
     if(isNaN(args[0])) return message.reply("please enter a real number!");

     if(args[0] > 100) return message.reply("You cannot delete more than 100 messages!");
     if(args[0] < 1) return message.reply("You must delete at least one message");

      message.channel.bulkDelete(args[0])

		message.channel.send({
			embeds: [
				new Discord.MessageEmbed()
				.setTitle("Success!")
				.setDescription(`${args[0]} messages were successfully deleted!`)
			]
		})
		setTimeout(r => {
			message.channel.bulkDelete(1)
		},500);
	 }
}