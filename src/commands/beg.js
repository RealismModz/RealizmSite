const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const config = require('../config');


function format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
module.exports = {
	name: 'beg',
	description: 'So poor',
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
		let result = await cs.beg({
       user: message.author.id,
       guild: message.guild.id,
       minAmount: 100,
       maxAmount: 400
      });
      if (result.error) return message.reply(`You have begged recently Try again in ${result.time}`);
      else message.reply(`You have earned $${format(result.amount)}.`)
	}
}