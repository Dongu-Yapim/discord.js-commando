const oneLine = require('common-tags').oneLine;
const Command = require('../base');
const Discord = require('discord.js');

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'util',
			memberName: 'ping',
			description: 'Botun pingini gösterir.',
			throttling: {
				usages: 5,
				duration: 10
			}
		});
	}

	async run(msg) {
		if(!msg.editable) {
			const pingMsg = await msg.reply('Hesaplanıyor...');
			const embed = new Discord.RichEmbed()
			.setColor('RANDOM')
			.setDescription(oneLine`
				${msg.channel.type !== 'dm' ? `${msg.author},` : ''}
				:ping_pong: Mesaj gecikmesi: ${pingMsg.createdTimestamp - msg.createdTimestamp - 100}ms.
				${this.client.ping ? `Normal gecikme: ${Math.round(this.client.ping - 100)}ms.` : ''}
			`);
			return pingMsg.edit({ embed });
		} else {
			await msg.edit('Hesaplanıyor...');
			const embed = new Discord.RichEmbed()
			.setColor('RANDOM')
			.setDescription(oneLine`
				:ping_pong: Mesaj gecikmesi: ${msg.editedTimestamp - msg.createdTimestamp - 100}ms.
				${this.client.ping ? `Normal gecikme: ${Math.round(this.client.ping - 100)}ms.` : ''}
			`);
			return msg.edit({ embed });
		}
	}
};
