const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const config = require('../config');


function format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
module.exports = {
	name: 'gamble',
	description: 'Gamble your money away',
	aliases:[],
	botPermissions: [
		"SEND_MESSAGES",
		"VIEW_CHANNEL",
		"READ_MESSAGE_HISTORY"
	],
	permissions: [
		"SEND_MESSAGES",
	],
	cooldown: 0,
	async execute(client, message, args, Discord, cmd) {
		let user = message.mentions.members.first()
		let money = args[0]
      if (isNaN(money)) return message.reply("Amount is not a number.");
      let result = await cs.gamble({
        user: message.author.id,
        guild: message.guild.id,
        amount: money,
        minAmount: 1,
        cooldown: 25 
      });
      if (result.error) {
        if (result.type == 'amount') return message.reply("Please insert an amount first.");
        if (result.type == 'nan') return message.reply("The amount was not a number.");
        if (result.type == 'low-money') return message.reply(`You don't have enough money. You need $${format(result.neededMoney)} more to perform the action. `);
        if (result.type == 'gamble-limit') return message.reply(`You don't have enough money for gambling. The minimum was $${result.minAmount}.`);
        if (result.type == 'time') return message.reply(`Wooo that is too fast. You need to wait **${result.second}** second(s) before you can gamble again.`);
      } else {
        if (result.type == 'lost') return message.reply(`Ahh, no. You lose $${result.amount}. You have $${result.wallet} left. Good luck next time.`);
        if (result.type == 'won') return message.reply(`Woohoo! You won $${result.amount}! You have $${result.wallet}. Good luck, have fun!`);
      }
	}
}