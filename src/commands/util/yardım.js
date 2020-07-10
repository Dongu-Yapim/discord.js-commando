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
			examples: ['yardım hepsi', 'yardım <komut>']
		});
	}

	async run(msg, args) {

		



const Discord = require("discord.js");
const yardim = new Discord.RichEmbed()
.setTitle("Çay Bot Tüm Komutlar Listesi")
.addField("<:cay:731000115149668383>  +anakomutlar", "Çayın temel olan çay iç ve benzeri komutlarını bulunduran komut listesini gösterir.", true)
.addField("<:photoshop:731001860768399420>  +efekt", "Avatarınıza verebileceğiniz harika efektler, komikli meme(caps)leri bulunduran komut listesini gösterir", true)
.addField("<:moderation:731002423967219752>  +admin", "Sunucunuzu daha iyi yönetebileceğiniz, admin ve moderatör komut listesini gösterir", true)
.addField("<:eglence:731002417398677585>  +eğlence", "Sunucunuz da hoş vakit geçirebileceğiniz eğlence komut listesini gösterir ", true)
.addField("<:Upvoted:731002774237741116>  +seviye", "Ayrıntılı seviye sisteminin çay içinde komut listesini gösterir", true)
.addField("<:8187_crystal_cluster:731003873858420749>  +genel", "Diğer kategorilerin dışında birbirinden farklı komut listesini gösterir", true)
.setFooter("Çay Bot | Davet linki: https://bit.ly/cayreyis", this.client.user.avatarURL)
.setColor("#f4c2c2")
return msg.say(yardim);   


 
	}
};
