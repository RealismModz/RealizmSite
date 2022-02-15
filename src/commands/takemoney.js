const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

function format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

module.exports = {
	name: 'takemoney',
	description: 'Takes money from a user',
	aliases:["tm","removemoney","rm","rmvm"],
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
	let user = message.mentions.members.first() || message.guild.members.cache.get(message.author.id)
    let wheretoPutMoney = 'wallet'
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

	if(money > result.wallet) return message.reply("That user doesn't have that much")

    let result2 = await cs.removeMoney({
        user: user,
        guild: message.guild,
        amount: money,
        wheretoPutMoney: wheretoPutMoney
    });
	message.reply(`Successfully removed $${format(money)} from ${user.user.username}`)
	}
}