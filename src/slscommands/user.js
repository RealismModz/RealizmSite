const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const {
	MessageEmbed
} = require('discord.js')
const config = require('../config');
return [
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info').addMentionableOption(option => option.setName('user').setDescription('User to provide information for')),
	async interaction => {
		const member = interaction.options.getMentionable('user') || interaction.member;
		const memberTag = interaction.member.user.tag
		if (!member.user) return interaction.reply('<a:X_:934633201920536597> **Not a User**\nArgument is not a user!')
		const avatar = member.displayAvatarURL({
			size: 4096,
			dynamic: true
		}) + '&quality=lossless'
		interaction.reply({
			embeds: [
				new MessageEmbed().setColor("GREEN").setTitle(`**👤 User Information**`).setDescription(`<:doge:934628695665147934> Basic Info
> Nickname: \`${(member.user.nickname || 'No Nickname').replace(/\`/g, '<BACKTICK>')}\`
> Username: \`${member.user.username.replace(/\`/g, '<BACKTICK>')}\`
> Discriminator: \`#${member.user.discriminator}\`
> Avatar URL: ${avatar}
> ID: \`${member.user.id}\`
`).setThumbnail(avatar)
					.addField('🔨 Moderation', `
> ${member.manageable ? '<a:check2:934633619278942238> Bot can manage user' : '<a:X_:934633201920536597> Bot cannot manage user (User is likely above bot in role hierarchy, or is owner)'}
> ${member.moderatable ? '<a:check2:934633619278942238> Bot can moderate user' : '<a:X_:934633201920536597> Bot cannot moderate user'}
> ${member.kickable ? '<a:check2:934633619278942238> Bot can kick user' : '<a:X_:934633201920536597> Bot cannot kick user'}
> ${member.bannable ? '<a:check2:934633619278942238> Bot can ban user' : '<a:X_:934633201920536597> Bot cannot ban user'}
`, true)
					.addField('📆 Time & Date', `
> Joined Discord \`\`\`
> ${(new Date(member.user.createdAt)).toUTCString().split(' (').shift().trim()}
> \`\`\`Joined this server \`\`\`
> ${(new Date(member.joinedAt)).toUTCString().split(' (').shift().trim()}
> \`\`\`
`, true)
					.setFooter({
						text: 'Realizm Bot || Command Ran By '+memberTag,
						iconURL: config.image
					})
			]
		})
	}
];