module.exports = async (Discord, client, member) => {
	var role = member.guild.roles.cache.find(role => role.name == "Member")
    member.roles.add(role);
	var welcome = member.guild.channels.cache.find(channel => channel.name == "welcome")
	welcome.send(`<@${member.user.id}> has joined the server!`)
};

