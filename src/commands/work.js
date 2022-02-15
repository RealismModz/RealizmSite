const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const config = require('../config');


function format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
module.exports = {
	name: 'work',
	description: 'Work hard!',
	aliases:['wrk'],
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
		let result = await cs.work({
        user: message.author.id,
        guild: message.guild.id,
        maxAmount: 100,
		replies: ['Programmer', 'Builder', 'Waiter', 'Busboy', 'Chief', 'Mechanic'],
		cooldown: 60
      });
      if (result.error) return message.reply(`You have already worked recently Try again in ${result.time}`);
      else message.reply(`You worked as a ${result.workType} and earned $${format(result.amount)}.`)
	}
}