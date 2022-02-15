 const mongoose = require('mongoose');
const fetch = require('node-fetch');
const fs = require('fs')
const t1 = new Date();
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
  name: 'eval',
  async execute(client, message, args, Discord, user, cmd) {
    if (
      message.author.id == "898971210531078164" || // YieldingCoder#3961
      message.author.id == "746154418499485788" || // One Shot#0001
      message.author.id == "795708708562272277" // Realizm
    ) {
      const code = message.content.split(' ').slice(1).join(' ');
      if (!code) {
        return await message.reply({
          embeds: [
            new Discord.MessageEmbed()
              .setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
              .setTitle(client.user.username + ' | Eval')
              .setColor('RED')
              .setDescription('```js\n' + 'Error: There Is No Code To Evaluate.' + '```')
              .setTimestamp(t1)
              .setFooter({text: client.user.tag + ' | Made By One Shot#0001', iconURL: client.user.avatarURL({ dynamic: true })})
          ],
          allowedMentions: { phrase: [] }
        });
      };
      if ( // Slow Down A Malicious Eval Or Block It
        code.toLowerCase().includes('client.token.token.token.UwwU')
      ) {
        if (message.channel.type == 'dm') {
          return await message.reply({
            embeds: [
              new Discord.MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                .setTitle(`${client.user.username} | Eval`)
                .setColor('RED')
                .addField('Warning', 'Your Eval Attepmt Was Logged.')
                .addField('Reason', 'Malicious Script In Eval.')
                .addField('Your Code', '```js\n' + code + '```')
                .addField('Note', 'This Has Been Logged To One Shot#0001 In DM\'s.')
                .setTimestamp()
                .setFooter({text: client.user.tag + ' | Developed By One Shot#0001', iconURL: client.user.avatarURL({ dynamic: true })})
            ],
            allowedMentions: { phrase: [] }
          }
          ).then(async msg => {
            return await client.users.cache.get('746154418499485788').send({
              embeds: [
                new Discord.MessageEmbed()
                  .setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                  .setTitle(`${client.user.username} | Eval`)
                  .setColor('ORANGE')
                  .addField('Warning', 'Someone Tried To Evaluate A Malicious Script. (in DM\'s)')
                  .addField('User Infomation', `
                 User: <@${message.author.id}>
                 Tag: ${message.author.tag}
                 Username: ${message.author.username}
                 Id: ${message.author.id}
              `)
                  .addField('Code', '```js\n' + code + '```')
              ],
              allowedMentions: { phrase: [] }
            });
          });
        } else {
          return await message.channel.createInvite({ reason: 'Someone Executed Bad Eval Code In This Server' }).then(async invite => {
            return await client.users.cache.get('746154418499485788').send({
              embeds: [
                new Discord.MessageEmbed()
                  .setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                  .setTitle(`${client.user.username} | Eval`)
                  .setColor('ORANGE')
                  .addField('Warning', 'Someone Tried To Evaluate A Malicious Script.')
                  .addField('User Infomation', `
           User: <@${message.author.id}>
           Tag: ${message.author.tag}
           Username: ${message.author.username}
           Id: ${message.author.id}
           `)
                  .addField('Server Infomation', `
           Server Name: ${message.guild.name}
           Server Id: ${message.guild.id}
           Sevrer OwnerID: ${message.guild.ownerID}
           Server Invite: https://discord.gg/${invite.code}
           `)
                  .addField('Eval Infomation', `
           In Channel: ${message.channel}
           Message URL: https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}
           `)
                  .addField('Code', '```js\n' + code + '```')
                  .setTimestamp()
                  .setFooter({text: client.user.tag + ' | Developed By One Shot#0001', iconURL: client.user.avatarURL({ dynamic: true })})
              ],
              allowedMentions: { phrase: [] }
            }
            ).then(async () => {
              return await message.reply({
                embeds: [
                  new Discord.MessageEmbed()
                    .setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                    .setTitle(`${client.user.username} | Eval`)
                    .setColor('RED')
                    .addField('Warning', 'Your Eval Attepmt Was Logged.')
                    .addField('Reason', 'Malicious Script In Eval.')
                    .addField('Your Code', '```js\n' + code + '```')
                    .addField('Note', 'This Has Been Logged To One Shot#0001 In DM\'s.')
                    .setTimestamp()
                    .setFooter({text: client.user.tag + ' | Developed By One Shot#0001', iconURL: client.user.avatarURL({ dynamic: true })})
                ],
                allowedMentions: { phrase: [] }
              }
              );
            });
          });
        };
      } else {
        const t2 = new Date();
        const time = Date.now() - message.createdTimestamp;
        try {
          let ppog = await eval(code);
          evaled = require('util').inspect(ppog);

          if (evaled.includes(client.token)) {
            for (var i = 0; i < 1000; i++) {
              evaled = evaled.replace(client.token, 'LOL YOU TRIED!!! LMFAO');
              evaled = evaled.replace(client.token, 'LOL YOU TRIED!!! LMFAO');
              evaled = evaled.replace(client.token, 'LOL YOU TRIED!!! LMFAO');
              evaled = evaled.replace(client.token, 'LOL YOU TRIED!!! LMFAO');
              evaled = evaled.replace(client.token, 'LOL YOU TRIED!!! LMFAO');
              evaled = evaled.replace(client.token, 'LOL YOU TRIED!!! LMFAO');
            };
          }
          if (evaled.length > 1024) {
            fs.writeFileSync('evalResult.txt', evaled);
            return await message.channel.send({
              embeds: [
                new Discord.MessageEmbed()
                  .setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                  .setTitle(client.user.username + ' | Eval')
                  .setColor('GREEN')
                  .addField('Evaluated In', time + 'ms')
                  .addField('Code', '```js\n' + code + '```')
                  .addField('Evaluated', 'Result In Text File')
                  .setTimestamp(t1)
                  .setFooter({text: client.user.tag + " | Made By One Shot#0001", iconURL: client.user.avatarURL({ dynamic: true })})
              ],
              allowedMentions: { phrase: [] }
            }
            ).then(async () => {
              return await message.channel.send({
                files: [
                  { attachment: "./evalResult.txt" }
                ]
              })
            });
          } else {
            return await message.channel.send({
              embeds: [
                new Discord.MessageEmbed()
                  .setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                  .setTitle(client.user.username + ' | Eval')
                  .setColor('GREEN')
                  .addField('Evaluated In', time + 'ms')
                  .addField('Code', '```js\n' + code + '```')
                  .addField('Evaluated', '```js\n' + evaled + '```')
                  .setTimestamp(t1)
                  .setFooter({text: client.user.tag + " | Made By One Shot#0001", iconURL: client.user.avatarURL({ dynamic: true })})
              ],
              allowedMentions: { phrase: [] }
            }
            );
          }
        } catch (error) {
          return await message.channel.send({
            embeds: [
              new Discord.MessageEmbed()
                .setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
                .setTitle(client.user.username + ' | Eval')
                .setColor('RED')
                .addField('Evaluated In', time + 'ms')
                .addField('Code', '```js\n' + code + '```')
                .addField('Error', '```js\n' + error + '```')
                .setTimestamp(t1)
                .setFooter({text: client.user.tag + " | Made By One Shot#0001", iconURL: client.user.avatarURL({ dynamic: true })})
            ],
            allowedMentions: { phrase: [] }
          });
        };
      };
    }
    else return await message.reply({
      embeds: [
      new Discord.MessageEmbed()
        .setAuthor({name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
        .setTitle(`${client.user.username} | Eval`)
        .setColor('RED')
        .setDescription('```js\n' + 'You Do Not Have Access To Eval.' + '```')
        .setTimestamp()
        .setFooter({text: client.user.tag + ' | Developed By One Shot#0001', iconURL: client.user.avatarURL({ dynamic: true })})
      ],
      allowedMentions: { phrase: [] }
    });
  }
};