const { stripIndents, oneLine } = require('common-tags');
const Command = require('../base');
const disambiguation = require('../../util').disambiguation;
const Discord = require('discord.js');


module.exports = class HelpCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'yardım',
			group: 'util',
			memberName: 'yardım',
			aliases: ['commands', 'y', 'komutlar', 'help', 'halp', 'h'],
			description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder.',
			details: oneLine`
					Yardım için herhangi bir komut adı belirtebilirsiniz.
					Bir komut belirtilmezse, mevcut tüm kullanılabilir komutlar listelenir.
			`,
			examples: ['yardım hepsi', 'yardım <komut>'],
			
			args: [
				{
					key: 'command',
					prompt: 'Hangi komut hakkında yardım istiyorsun?',
					type: 'string',
					default: ''
				}
			]
		});
	}

	async run(msg, args) {
        let group;
        var groups = this.client.registry.groups.map(g => g.id);
        const emb = new Discord.MessageEmbed()
        .setTitle("Komut Grupları")
        .setDescription(this.client.registry.groups.map(c=> `[${msg.guild.commandPrefix}yardım ${c.id}](https://bit.ly/cayreyis) => ${c.name}`))
        .setColor(0xf4a460)
        .setFooter(`Örnek Kullanım: ${msg.guild.commandPrefix}yardım çay`)
        if (!args.command.toLowerCase()) return msg.embed(emb);

        if (!groups.some(g => args.command.toLowerCase() == g)) return msg.channel.send(`${msg.member.toString()}, lütfen doğru komut grubundan yardım alınız.`, {embed: emb})
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
