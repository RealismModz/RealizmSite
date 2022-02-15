const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;



function format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

module.exports = {
	name: 'addmoney',
	description: 'Gives money to a user',
	aliases:['am','gm','givemoney','givem','moneygive','mg'],
	botPermissions: [
		"SEND_MESSAGES",
		"VIEW_CHANNEL",
		"READ_MESSAGE_HISTORY"
	],
	permissions: [
		"ADMINISTRATOR",
	],
	cooldown: 10,
	async execute(client, message, args, Discord, cmd) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(message.author.id);
        let wheretoPutMoney = 'wallet';
        let money;
		
        
		if(!message.mentions.members.first()){
			money = args[0];
		}else{
			money = args[1];
		};

		if(isNaN(money)) return message.reply("Please enter an actual Number!");
        let result = await cs.balance({
            user: user,
            guild: message.guild.id
        });

		
		if(money <= 0) return message.reply("Enter a positive number!");
		if(money > result.rawData.bankSpace) return message.reply("Sorry! Their bank isn't big enough for that much!");

		let result2 = await cs.addMoney({
            user: user,
            guild: message.guild,
            amount: money,
            wheretoPutMoney: wheretoPutMoney
        });

		if (result.error) return message.reply("You cant add negitive money");
      else message.reply(`Successfully added $${format(money)} to ${user.user.username}`);
	}
        
}