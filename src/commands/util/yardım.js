const { stripIndents, oneLine } = require('common-tags')
const { Command } = require('discord.js-commando')

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

  async run(msg, args) {
    const groups = this.client.registry.groups
    const commands = this.client.registry.findCommands(args.comando, false, msg)
    const showAll = args.comando && args.comando.toLowerCase() === 'all'

    if (args.comando && !showAll) {
      let messages = []
      let help = stripIndents`
      ${oneLine`
        **\`${msg.guild.commandPrefix}${commands[0].name}\`** __**\`${(commands[0].description.length <= 0 )? 'Açıklama girilmemiş': commands[0].description}\`**__
        ${commands[0].guildOnly ? '(Sadece sunucuda kullanılır)': ''}
      `}\n
      **Modo de uso:** ${msg.anyUsage(`${commands[0].name}${commands[0].format ? ` ${commands[0].format}` : ''}`)}
      `
      if (commands[0].aliases.length > 0) help += `\n**Kısaltmalar:** ${commands[0].aliases.join(', ')}`
      if (commands[0].details) help += `\n\n${commands[0].details}`
      if (commands[0].examples) help += `\n\n**Örnek:**\n${commands[0].examples.join('\n')}`
      await msg.channel.send(help)
    } else {
      const messages = []
      try {
        messages.push(await msg.channel.send(stripIndents`
          __**${showAll ? 'Tüm komutlar' : `kullanılabilir komutlar ${msg.guild || ''}`}**__
          ${(showAll ? groups : groups.filter(grp => grp.commands.some(cmd => cmd.isUsable(msg))))
            .map(grp => stripIndents`
              __${grp.name}__
              ${(showAll ? grp.commands : grp.commands.filter(cmd => cmd.isUsable(msg)))
                .map(cmd => `**${cmd.name}:** ${cmd.description}`).join('\n')
              }
            `).join('\n\n')
          }
        `, { split: true }))
      } catch(err) {
        return
      }
      return messages
    }
  }
}
