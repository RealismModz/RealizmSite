// Simple youtube downloader
const { SlashCommandBuilder } = require('@discordjs/builders');
const YoutubeDlWrap = require("youtube-dl-wrap");
// const child = require('child_process')
const fs = require('fs')
// let isFirstRun = true
const rgx = /https:\/\/(m\.)?(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9\-]{10,15}/
return [
	new SlashCommandBuilder().setName('ytdl').setDescription('Downloads a video from youtube').addStringOption(o=>o.setName('url').setDescription('Video\'s URL').setRequired(true)),
	async interaction=>{
		await interaction.reply('**<a:loading:934622322751590480> Preparing...**')
		// broken, u need to have ytdl and update it manually for now
		// if (isFirstRun) {
		// 	isFirstRun=false;

		// 	await interaction.editReply('**<a:loading:934622322751590480> Downloading Ytdl**\nThis can take up to 30 seconds...')
		// 	await YoutubeDlWrap.downloadFromGithub("ytdl");
		// 	child.spawnSync('chmod +x ytdl')
		// }
		const youtubeDlWrap = new YoutubeDlWrap("./ytdl");
		let url = interaction.options.getString('url');
		if (!rgx.test(url)) return interaction.editReply('<:error:934769188814331974> Invalid Youtube URL!')
		if (!url) return interaction.editReply('**<:error:934769188814331974> No URL provided.**')
		const ID = url.split('?v=').pop();
		let dest = 'downloads/'+ID+'.mp4'
		fs.readdirSync('downloads/').forEach(v=>{
			if (v.startsWith(ID) && !v.endsWith('.part')) dest = 'downloads/'+v;
		})
		// interaction.editReply('**<a:loading:934622322751590480> Getting Video Information**')
		// const data = await youtubeDlWrap.getVideoInfo(url)
		if (!fs.existsSync(dest)) {
			interaction.editReply('**<a:loading:934622322751590480> Downloading... This can take some time...**')
			try {
				await youtubeDlWrap.execPromise([url,
	    "-f", 'bestvideo+bestaudio/best', '--merge-output-format','mp4', "-o", dest]);
			} catch (e) {
				console.error(e)
				return interaction.editReply('**<:error:934769188814331974> An error ocurred while downloading!**\n>>> ```yml\n'+e+'```')
			}
		}
		fs.readdirSync('downloads/').forEach(v=>{
			if (v.startsWith(ID)) dest = 'downloads/'+v;
		})
		if (fs.statSync(dest).size > 7500000) { // 7.5mb
			await interaction.editReply(`**<a:check:934622589169577985> Done Converting!**
Encountered 1 Warning:
> File too big to upload!
> Video will only be available from server.
Video: https://Realizm-But-Chine.oneshotkillhd.repl.co/${dest.split('/').pop()}`)
			return;
		}
		await interaction.editReply('**<a:loading:934622322751590480> Sending File to Discord...**')
		await interaction.followUp({
			content: `**<a:check:934622589169577985> Done Converting!**
Video: https://Realizm-But-Chine.oneshotkillhd.repl.co/${dest.split('/').pop()}
Video is also attached:`,
	    files: [{
				attachment: dest,
				name: dest.split('/').pop()
	    }],
		})
		await interaction.editReply('**<a:check:934622589169577985> Done Converting!**\nThe bot has sent another message including the URL and attachement of the video.')
	}
];
