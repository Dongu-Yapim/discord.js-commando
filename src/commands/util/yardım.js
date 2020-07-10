const { stripIndents, oneLine } = require('common-tags');
const Command = require('../base');
const disambiguation = require('../../util').disambiguation;
const Discord = require('discord.js');

module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'komutlar',
      group: 'util',
      memberName: 'komutlar',
      aliases: ['komutlar', 'yardım', 'help', 'y', 'k', 'tümkomutlar'],
      description: 'Komutlar hakkında ayrıntılı bilgi sunar',
      examples: ['komutlar'],
      guarded: true,
      details: oneLine`
        Komutlar hakkında bilgi verir.
      `,
      args: [
        {
          key: 'Komut',
          prompt: 'Hangi komut hakkında bilgi lazım?',
          type: 'string',
          default: ''
        }
      ]
    })
  }

	async oldrun(msg, args) {
		const groups = this.client.registry.groups;
		const commands = this.client.registry.findCommands(args.command, false, msg);
		const showAll = args.command && args.command.toLowerCase() === 'hepsi';
		if(args.command && !showAll) {
			if(commands.length === 1) {
				let help = stripIndents`
					${oneLine`
						__Command **${commands[0].name}**:__ ${commands[0].description}
						${commands[0].guildOnly ? ' (Sadece sunucularda kullanılabilir)' : ''}
					`}
					**Format:** ${msg.anyUsage(`${commands[0].name}${commands[0].format ? ` ${commands[0].format}` : ''}`)}
				`;
				if(commands[0].aliases.length > 0) help += `\n**Kısaltmalar:** ${commands[0].aliases.join(', ')}`;
				help += `\n${oneLine`
					**Group:** ${commands[0].group.name}
					(\`${commands[0].groupID}:${commands[0].memberName}\`)
				`}`;
				if(commands[0].details) help += `\n**Detaylar:** ${commands[0].details}`;
				if(commands[0].examples) help += `\n**Örnekler:**\n${commands[0].examples.join('\n')}`;

				const messages = [];
				try {
					messages.push(await msg.direct(help));
					if(msg.channel.type !== 'dm') messages.push(await msg.reply('Özel mesajlarını kontrol et. :postbox:'));
				} catch(err) {
					messages.push(await msg.reply('Komutları özel mesaj olarak sana gönderemiyorum. Sanırım özel mesajların kapalı.'));
				}
				return messages;
			} else if(commands.length > 1) {
				return msg.reply(disambiguation(commands, 'commands'));
			} else {
				return msg.reply(
					`Geçersiz komut. ${msg.usage(
						null, msg.channel.type === 'dm' ? null : undefined, msg.channel.type === 'dm' ? null : undefined
					)} komutunu kullanarak komut listesini görebilirsiniz.`
				);
			}
		} else {
			const messages = [];
			try {
				/** messages.push(await msg.direct(stripIndents`
					${oneLine`
						${msg.guild || 'Sunucu ismi bulunamadı!'} sunucusunda komut kullanmak için aşağıdaki örneği inceleyin.
						Örnek: ${Command.usage('komut', msg.guild ? msg.guild.commandPrefix : null, this.client.user)}.
						Örnek: ${Command.usage('prefix', msg.guild ? msg.guild.commandPrefix : null, this.client.user)}.
					`}
					Özel mesajda komut kullanırken, ön-ek (prefix) kullanmanıza gerek yok! Örnek: ${Command.usage('komut', null, null)}
					__**${showAll ? 'Tüm komutlar' : `${msg.guild + ' sunucusunda' || 'bu Özel Mesaj içinde'} kullanılabilir komutlar:`}**__
					${(showAll ? groups : groups.filter(grp => grp.commands.some(cmd => cmd.isUsable(msg))))
						.map(grp => stripIndents`
							__${grp.name}__
							${(showAll ? grp.commands : grp.commands.filter(cmd => cmd.isUsable(msg)))
								.map(cmd => `**${cmd.name}:** ${cmd.description}`).join('\n')
							}
						`).join('\n\n')
					}
				`, { split: true })); */
				
				const helpbed = new Discord.RichEmbed()
				.setColor('RANDOM')
				.setTitle('Komut Listesi')
				.addBlankField()
				.setFooter('© ' + (new Date()).getFullYear() + ' Çay Bot', this.client.user.avatarURL);
				
				groups.forEach(group =>
                    			helpbed.addField(`**${group.name}**`,
                        			group.commands
                            				.map(command => `\`${command.name}\` - ${command.description}`)
                            					.join('\n')));
	
				messages.push(await msg.author.send({embed: helpbed}));
				
				if(msg.channel.type !== 'dm') {
					const dmbed = new Discord.RichEmbed()
					.setColor('RANDOM')
					.setTitle('Özel mesajlarını kontrol et!')
					.setDescription('> Komutları özel mesaj olarak yolladım.');

					messages.push(await msg.channel.send({embed: dmbed}));
				}
			} catch(err) {
				const errbed = new Discord.RichEmbed()
				.setColor('RANDOM')
				.setTitle('Hata!')
				.setDescription('Komutları özel mesaj olarak sana gönderemiyorum. Sanırım özel mesajların kapalı.');

				messages.push(await msg.channel.send({embed: errbed}));
			}
			return messages;
		}
	}

	async run(msg, args) {
		let group;
        var groups = this.client.registry.groups.map(g => g.id);
        const emb = new Discord.MessageEmbed()
        .setTitle("Komut Grupları")
        .setDescription(client.registry.groups.map(c=> `• [${msg.guild.commandPrefix}yardım ${c.id}](https://bit.ly/cayreyis) => ${c.name}`))
        .setColor(0xf4a460)
        .setFooter(`Örnek Kullanım: ${msg.guild.commandPrefix}yardım çay`)
        if (!args.command.toLowerCase()) return msg.embed(emb);

        if (!groups.some(g => args.command.toLowerCase() == g)) return msg.channel.send(`${msg.member.toString()}, lütfen doğru komut grubundan yardım alın.`, {embed: emb})
        if (this.client.registry.groups.has(args.command.toLowerCase())) group = this.client.registry.groups.get(args.command.toLowerCase());


        const helpbed = new Discord.MessageEmbed()
        .setTitle(group.name)
        .setDescription(`
        ${group.commands.map(g => `[${g.name}](https://bit.ly/cayreyis): ${g.description}`).join("\n")}
                `)
        .setColor(0xf4a460)
        msg.embed(helpbed)
	}
};
