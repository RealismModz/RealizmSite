const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const config = require('../config');
const randomHex = require('random-hex');


function format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
module.exports = {
	name: 'balance',
	description: 'Gives money to a user',
	aliases:['bal'],
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
		const user = message.mentions.members.first() || message.guild.members.cache.get(message.author.id);
        let result = await cs.balance({
            user: user,
            guild: message.guild.id
        });

const random = randomHex.generate();
		return message.reply({
			embeds:[
				new Discord.MessageEmbed()

				.setTitle(`${user.user.username}'s Balance'`)
				.addField('**Wallet:**',`$${format((result.wallet).toLocaleString())}`)
				.addField('**Bank:**',`$${format((result.bank).toLocaleString())}/$${format(result.rawData.bankSpace.toLocaleString())}`)
				.setFooter({text:'Realizm Bot',iconURL:config.image})
				.setColor(random)
			]
		})
	}
}