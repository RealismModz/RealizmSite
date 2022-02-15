const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const config = require('../config');


function format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
module.exports = {
	name: 'monthly',
	description: 'Your monthly paycheck',
	aliases:['mthly'],
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
		let result = await cs.monthly({
        user: message.author.id,
        guild: message.guild.id,
        amount: 5000,
      });
      if (result.error) return message.reply(`You have used monthly recently Try again in ${result.time}`);
      else return message.reply(`You have earned $${format(result.amount)}. Your streak is now ${format(result.rawData.streak.monthly)}`);
	}
}