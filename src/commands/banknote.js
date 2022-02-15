const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const config = require('../config');
const randomHex = require('random-hex');


function format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
module.exports = {
	name: 'banknote',
	description: 'Use a banknote to increase your bank!',
	aliases:['bn'],
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
		const user = message.guild.members.cache.get(message.author.id);

		const arr = await cs.getUserItems({
        user: user,
        guild: message.guild.id
    });
    if (!arr.inventory.length) return message.reply("You don't have any banknotes!");
    for (i in arr.inventory) {
        if (arr.inventory[i].name.toLowerCase().includes('banknote')) {
            i++
            const removeItem = await cs.removeUserItem({
                user: user,
                item: i,
                guild: message.guild.id
            });
            if (removeItem.error) {
                console.log('Bot tried to remove item number ' + i)
                return message.reply("Unknown error occured see console.")
            };
            const ToincreasedAmount = 5000 + removeItem.rawData.bankSpace;
            const result = await cs.setBankSpace(user.user.id, message.guild.id, ToincreasedAmount);
            if (!result.error) return message.reply(`Successfully set Bank Limit to $${format(result.amount)}`);
            else return message.reply(`Error: occured: ${result.error}`);

        } else return message.reply("Please buy the item first!")
	}
	}
}