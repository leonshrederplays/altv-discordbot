const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');


// Only if invite is in config.json and set to true

module.exports = class InviteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'invite',
      group: 'info',
      memberName: 'invite',
      description: 'Replies with a link to invite the bot.'
    });
  }

  async run(message) {
    //provides the link with admin permissions
    const inviteURL = `https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&scope=bot`;

    const guildCacheMap = this.client.guilds.cache;
    const guildCacheArray = Array.from(guildCacheMap, ([name, value]) => ({
      name,
      value
    }));
    let memberCount = 0;
    for (let i = 0; i < guildCacheArray.length; i++) {
      memberCount = memberCount + guildCacheArray[i].value.memberCount -1;
    }

    const embed = new MessageEmbed()
      .setTitle(this.client.user.username + ': Invite Link')
      .setColor('RANDOM')
      .setURL(inviteURL)
      .setThumbnail(this.client.user.displayAvatarURL())
      .setDescription(
        `**Currently**
        On ${this.client.guilds.cache.size} servers, with a total of ${memberCount} users.`
      )
      .setFooter(
        'Operated by ' + this.client.owners[0].username + ' since',
        this.client.owners[0].displayAvatarURL()
      )
      .setTimestamp(this.client.user.createdAt);

    message.say(embed);
  }
};
