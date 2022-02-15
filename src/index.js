const Discord = require("discord.js");
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_WEBHOOKS, Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Discord.Intents.FLAGS.GUILD_SCHEDULED_EVENTS
  ], 
  partials: [
    "CHANNEL"
    ]
});

const config = require("./config.json");

	/*/ Database /*/

    cs.setMongoURL(config.mongoose.url);
	cs.setDefaultBankAmount('100');
	cs.searchForNewUpdate(true);
	cs.setMaxBankAmount('1000')

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.snipes = new Discord.Collection();

["command_handler", "event_handler", "slash_handler"].forEach(async handler => {
  require(`./handlers/${handler}`)(client, Discord);
});
 process.on("unhandledRejection", _ => console.error(_.stack + '\n' + '='.repeat(20)));
client.login(config.client.token);