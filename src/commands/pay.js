const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const config = require('../config');


function format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
module.exports = {
	name: 'pay',
	description: 'Pay other users',
	aliases:[],
	botPermissions: [
		"SEND_MESSAGES",
		"VIEW_CHANNEL",
		"READ_MESSAGE_HISTORY"
	],
	permissions: [
		"SEND_MESSAGES",
	],
	cooldown: 2,
	async execute(client, message, args, Discord, cmd) {
		let user = message.mentions.members.first()
		let money = args[1]

		if(!message.mentions.members.first())return message.reply("Please message a member!")

		if(isNaN(money))return message.reply('Please enter an actual number!');
		if (money.includes("-")) return message.reply("You can't send negitive money.")
      if (user.id === 'userID'.id) return message.channel.send(`You can't transfer money to yourself!`);
      
	
       let result = await cs.transferMoney({
       user: message.author.id,
        user2: user,
        guild: message.guild.id,
        amount: money
       });
       if (result.error) return message.reply(`You don't have enough money in your wallet.`);
       else message.reply(`**${message.author.username}**, Successfully transfered **$${format(result.money)}** to **${result.user2.user.username}**`)

	}
}