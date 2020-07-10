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
if (!msg.channel.type === "dm") {
const Discord = require("discord.js");
const yardim = new Discord.RichEmbed()
.setTitle("Çay Bot Komut Listesi")
.addField("<:cay:731000115149668383>  +yardım çay", "Çayın temel olan çay iç ve benzeri komutlarını bulunduran komut listesini gösterir.", true)
.addField("<:photoshop:731001860768399420>  +yardım efekt", "Avatarınıza verebileceğiniz harika efektler ve caspleri bulunduran komut listesini gösterir", true)
.addField("<:moderation:731002423967219752>  +yardım yetkili", "Sunucunuzu daha iyi yönetebileceğiniz, admin ve moderatör komut listesini gösterir", true)
.addField("<:eglence:731002417398677585>  +yardım eğlence", "Sunucunuz da hoş vakit geçirebileceğiniz eğlence komut listesini gösterir ", true)
.addField("<:Upvoted:731002774237741116>  +yardım seviye", "Ayrıntılı seviye sisteminin çay içinde komut listesini gösterir", true)
.addField("<:8187_crystal_cluster:731003873858420749>  +yardım genel", "Diğer kategorilerin dışında birbirinden farklı komut listesini gösterir", true)
.setFooter("Çay ve dünyanın en iyi topluluğu " + msg.guild)
.setColor("#f4c2c2")
if (!args.command.toLowerCase()) return msg.say(yardim);  
} else {
const Discord = require("discord.js");
const yardim = new Discord.RichEmbed()
.setTitle("Çay Bot Komut Listesi")
.addField("<:cay:731000115149668383>  +yardım çay", "Çayın temel olan çay iç ve benzeri komutlarını bulunduran komut listesini gösterir.", true)
.addField("<:photoshop:731001860768399420>  +yardım efekt", "Avatarınıza verebileceğiniz harika efektler ve caspleri bulunduran komut listesini gösterir", true)
.addField("<:moderation:731002423967219752>  +yardım yetkili", "Sunucunuzu daha iyi yönetebileceğiniz, admin ve moderatör komut listesini gösterir", true)
.addField("<:eglence:731002417398677585>  +yardım eğlence", "Sunucunuz da hoş vakit geçirebileceğiniz eğlence komut listesini gösterir ", true)
.addField("<:Upvoted:731002774237741116>  +yardım seviye", "Ayrıntılı seviye sisteminin çay içinde komut listesini gösterir", true)
.addField("<:8187_crystal_cluster:731003873858420749>  +yardım genel", "Diğer kategorilerin dışında birbirinden farklı komut listesini gösterir", true)
.setFooter("Çay ve dünyanın en mükemmel insanı " + msg.author.username)
.setColor("#f4c2c2")
if (!args.command.toLowerCase()) return msg.say(yardim);   
}


if (!groups.some(g => args.command.toLowerCase() == g)) return msg.channel.send(`Girdiğiniz komut yanlış, şu şekilde kullanacaksınız: **+yardım efekt**`, {embed: emb})
        if (this.client.registry.groups.has(args.command.toLowerCase())) group = this.client.registry.groups.get(args.command.toLowerCase());


        const helpbed = new Discord.RichEmbed()
        .setAuthor(group.name, this.client.user.avatarURL, 'https://bit.ly/cayreyis')
        .setDescription(`
        ${group.commands.map(g => `[${g.name}](https://bit.ly/cayreyis): ${g.description}`).join("\n")}
                `)
        .setColor(0xf4a460)
        msg.embed(helpbed)


 
	}
};
