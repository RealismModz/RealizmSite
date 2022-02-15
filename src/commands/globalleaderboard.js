const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const randomHex = require('random-hex');

function format(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


module.exports = {
	name: 'globalleaderboard',
	description: 'Whos in the top 10?',
	aliases:['gl','globalleader','leaderglobal'],
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
		const random = randomHex.generate();
	let data = await cs.globalLeaderboard();
      if (data.length < 1) return message.reply("Nobody's in Global leaderboard yet.");
      const msg = new Discord.MessageEmbed();
      let pos = 0;
      data.slice(0, 10).map(e => {
        if (!client.users.cache.get(e.userID)) return;
        pos++
        msg.addField(`${pos} - **${client.users.cache.get(e.userID).username}**`, `Wallet: **$${format(e.wallet)}** - Bank: **$${format(e.bank)}**`, true);
		msg.setColor(random)
      });
  
      message.reply({
        embeds: [msg]
      }).catch(); 
	}
}