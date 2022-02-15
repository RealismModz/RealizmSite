const cooldowns = new Map();
const config = require("../../config.json");

module.exports = async (Discord, client, message, member) => {
  let prefix = config.client.prefix;

  if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  let cmd = args.shift().toLowerCase();
  cmd.toLowerCase();

  const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

  if (!command) return;

  const validPermissions = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS_AND_STICKERS",
    "USE_APPLICATION_COMMANDS",
    "REQUEST_TO_SPEAK",
    "MANAGE_EVENTS",
    "MANAGE_THREADS",
    "CREATE_PUBLIC_THREADS",
    "CREATE_PRIVATE_THREADS",
    "USE_EXTERNAL_STICKERS",
    "SEND_MESSAGES_IN_THREADS",
    "START_EMBEDDED_ACTIVITIES",
    "MODERATE_MEMBERS"
  ]
   try {
    if (command.permissions.length) {
      let invalidPerms = []
      for (const perm of command.permissions) {
        if (!validPermissions.includes(perm)) {
          return console.log(`Invalid Permissions ${perm}`);
        }
        if (!message.member.permissions.toArray().find(p => p == perm)) {
          invalidPerms.push(perm);
        }
      }
      if (invalidPerms.length) {
        return message.reply({
          embeds: [
          new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
            .setTitle(client.user.username + " | Permissions")
            .setColor('RED')
            .setDescription(`<@${message.author.id}> You Are Missing The Permissions \`${invalidPerms}\` To Execute This Command`)
            .setTimestamp()
            .setFooter(client.user.tag + " | Made By One Shot#0001", client.user.avatarURL({ dynamic: true }))
          ],
          allowedMentions: { phrase: [] }
        });
      }
    }
} catch (e) { }
  try {
    if (command.botPermissions.length) {
      let invalidPerms = []
      for (const perm of command.botPermissions) {
        if (!validPermissions.includes(perm)) {
          return console.log(`Invalid Permissions ${perms}`);
        }
        if (!message.guild.members.cache.get(client.user.id).permissions.toArray().find(p => p == perm)) {
          invalidPerms.push(perm);
        }
      }
      if (invalidPerms.length) {
        return message.reply({
          embeds: [
          new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
            .setTitle(client.user.username + " | Permissions")
            .setColor('RED')
            .setDescription(`<@${message.author.id}> I'm Missing The Permissions \`${invalidPerms}\` To Execute This Command`)
            .setTimestamp()
            .setFooter(bot.user.tag + " | Made By One Shot#0001", client.user.avatarURL({ dynamic: true }))
        ],
          allowedMentions: { phrase: [] }
        });
      }
    }
  } catch (err) {

  }


  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const current_time = Date.now();
  const time_stamps = cooldowns.get(command.name);
  const cooldown_amount = (command.cooldown) * 1000;


  if (time_stamps.has(message.author.id)) {
    const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

    if (current_time < expiration_time) {
      const time_left = (expiration_time - current_time) / 1000;

      return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ${command.name}`);
    }
  }

  time_stamps.set(message.author.id, current_time);
  setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
  try {
    if (command) command.execute(client, message, args, Discord, cmd);
  } catch (err) { }
};