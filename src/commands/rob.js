const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const config = require('../config');


function format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
module.exports = {
	name: 'rob',
	description: 'Becoming a theif now eh?',
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
		 if (!user) return message.reply('Sorry, you forgot to mention somebody.');
      if (user.bot || user === client.user) return message.reply("This user is a bot.");
     

      let result = await cs.rob({
        user: message.author.id,
        user2: user,
        guild: message.guild.id,
        minAmount: 100,
        successPercentage: 5,
        cooldown: 25, 
        maxRob: 1000
      });
      if (result.error) {
        if (result.type === 'time') return message.reply(`You have already robbed recently Try again in ${result.time}`);
        if (result.type === 'low-money') return message.reply(`You need atleast $${format(result.minAmount)} to rob somebody.`);
        if (result.type === 'low-wallet') return message.reply(`${result.user2.user.username} has less than $${format(result.minAmount)} to rob.`)
        if (result.type === 'caught') return message.reply(`${message.author.username} you robbed ${result.user2.user.username} and got caught and you payed $${format(result.amount)} to ${result.user2.user.username}!`)
      } else {
          if (result.type === 'success') return message.reply(`${message.author.username} you robbed ${result.user2.user.username} and got away with $${format(result.amount)}!`)
      }
	}
}