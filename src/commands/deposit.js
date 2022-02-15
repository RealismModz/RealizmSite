const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const config = require('../config');


function format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
module.exports = {
	name: 'deposit',
	description: 'Transfers money from your wallet to your bank',
	aliases:['dep','dp'],
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
		let user = message.mentions.members.first() || message.guild.members.cache.get(message.author.id);
		let money;

		if(!message.mentions.members.first()){
			money = args[0];
		}else{
			money = args[1];
		};
		if(isNaN(money))return message.reply('Please enter an actual number!');
        let result = await cs.deposite({
            user: user,
            guild: message.guild.id,
			amount: money
        });
		if (result.error) {
        if (result.type === 'money') return message.reply("Specify an amount to deposite");
        if (result.type === 'negative-money') return message.reply("You can't deposite negative money");
        if (result.type === 'low-money') return message.reply("You don't have that much money in wallet.");
        if (result.type === 'no-money') return message.reply("You don't have any money to deposite");
        if (result.type === 'bank-full') return message.reply("Your bank is full. It has reached it's limit.");
      } else {
        if (result.type === 'all-success') return message.reply("You have deposited all your money to your bank" + `\nNow you have $${format(result.rawData.wallet)} In your wallet and $${format(result.rawData.bank)} in your bank.`);
        if (result.type === 'success') return message.reply(`You have deposited $${format(result.amount)} money to your bank.\nNow you've $${format(result.rawData.wallet)} In your wallet and $${format(result.rawData.bank)} in your bank.`);
      };
	}
}