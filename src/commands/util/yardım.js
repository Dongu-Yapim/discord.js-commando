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
.setThumbnail(this.client.user.avatarURL)
.addField(":cay~1:  +anakomutlar", "Çayın temel olan çay iç ve benzeri komutlarını bulunduran komut listesini gösterir.", true)
.addField(":photoshop:  +efekt", "Avatarınıza verebileceğiniz harika efektler, komikli meme(caps)leri bulunduran komut listesini gösterir", true)
.addField(":moderation:  +admin", "Sunucunuzu daha iyi yönetebileceğiniz, admin ve moderatör komut listesini gösterir", true)
.addField(":eglence:  +eğlence", "Sunucunuz da hoş vakit geçirebileceğiniz eğlence komut listesini gösterir ", true)
.addField(":Upvoted:  +seviye", "Profil, maaş ve marketi içinde barındıran ayrıntılı seviye sistemi komut listesini gösterir", true)
.addField(":8187_crystal_cluster:  +genel", "Diğer kategorilerin dışında birbirinden farklı komut listesini gösterir", true)
.setFooter("Çay Bot | Davet linki: https://bit.ly/cayreyis", this.client.user.avatarURL)
.setColor("#f4c2c2")
msg.say(yardim);    
	}
};
