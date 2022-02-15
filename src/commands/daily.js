const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const config = require('../config');


function format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
module.exports = {
	name: 'daily',
	description: 'Your daily paycheck',
	aliases:['dly'],
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
		let result = await cs.daily({
        user: message.author.id,
        guild: message.guild.id,
        amount: 500,
      });
      if (result.error) return message.reply(`You have used daily recently Try again in ${result.time}`);
      else return message.reply(`You have earned $${format(result.amount)}. Your streak is now ${format(result.rawData.streak.daily)}`);
	}
}