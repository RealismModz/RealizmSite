const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const config = require('../config');


function format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
module.exports = {
	name: 'withdraw',
	description: 'withdraws money from your bank to your wallet',
	aliases:['wd','withd','wdraw'],
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
		let user = message.guild.members.cache.get(message.author.id);
		let money = args[0]
		if(isNaN(money))return message.reply("Please enter a valid number!");
        if (!money) return message.reply("Enter the amount you want to withdraw.");

        let result = await cs.withdraw({
            user: message.author,
            guild: message.guild,
            amount: money
        });
        if (result.error) {
            if (result.type === 'money') return message.reply("Specify an amount to withdraw")
            if (result.type === 'negative-money') return message.reply("You can't withdraw negative money, please use deposit command")
            if (result.type === 'low-money') return message.reply("You don't have that much money in your bank.")
            if (result.type === 'no-money') return message.reply("You don't have any money to withdraw")
        } else {
            if (result.type === 'all-success') return message.reply("You have withdrawn all your money from your bank" + `\nNow you have $${format(result.rawData.wallet)} In your wallet and $${format(result.rawData.bank)} in your bank.`)
            if (result.type === 'success') return message.reply(`You have withdrawn $${format(result.amount)} money from your bank.\nNow you have $${result.rawData.wallet} In your wallet and $${format(result.rawData.bank)} in your bank.`)

        }
	}
}