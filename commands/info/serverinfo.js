const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');


// Only if invite is in config.json and set to true

module.exports = class ServerInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            group: 'info',
            memberName: 'serverinfo',
            description: 'Informationenn über den Server.',
            cooldown: 5,
            aliases: ['server'],
            guildOnly: true,
        });
    }
    execute(client, message, Discord, args, guildConfig, connection, commands, serverQueue, ytdl, queue) {
        let embed = new Discord.MessageEmbed();
        embed.setTitle("Informationen über den Server: " + message.guild.name)
        embed.setAuthor(message.guild.name, message.guild.iconURL)
        embed.setColor("#0099FF")
        embed.setThumbnail(client.user.avatarURL)
        embed.setFooter("Der Bot wird stetig weiterentwickelt auch wenn dem nicht so ist.", client.user.avatarURL)
        embed.setTimestamp()
        embed.addField("**Server-Owner:**", message.guild.owner, true)
        embed.addField("**Mitglieder-Anzahl:**", message.guild.memberCount, true)
        embed.addField("**Rollen-Anzahl:**", message.guild.roles.cache.size)
        embed.addField("**Channel-Anzahl:**", message.guild.channels.cache.size, true)
        embed.addField("**Emoji-Anzahl:**", message.guild.emojis.cache.size, true)
        let partnered = message.guild.partnered.toString().replace("false", "Nein").replace("true", "Ja");
        embed.addField("**Discord-Partner:**", partnered, true)
        embed.addField("**Discord-Boost:**", message.guild.premiumTier, true)

        let createdAt = message.guild.createdAt.toString();
        let dayString = createdAt.substring(0, 3)
            .replace("Mon", "Montag")
            .replace("Tue", "Dienstag")
            .replace("Wed", "Mittwoch")
            .replace("Thur", "Donnerstag")
            .replace("Sat", "Samstag")
            .replace("Sun", "Sonntag")

        let monthString = createdAt.substring(4, 7)
            .replace("Jan", "01")
            .replace("Feb", "02")
            .replace("Mar", "03")
            .replace("Apr", "04")
            .replace("May", "05")
            .replace("June", "06")
            .replace("July", "07")
            .replace("Aug", "08")
            .replace("Sep", "09")
            .replace("Oct", "10")
            .replace("Nov", "11")
            .replace("Dec", "12");

        let dayNumber = createdAt.substring(8, 10)

        let yearNumber = createdAt.substring(11, 15)

        let hrs = createdAt.substring(16, 18)

        let min = createdAt.substring(19, 21);

        let sec = createdAt.substring(22, 24);

        let string = `${dayNumber}.${monthString}.${yearNumber} um ${hrs}:${min}:${sec}`;
        embed.addField("**Erstellt am:**", string, true)
        message.channel.send(embed).then(msg => msg.delete({
            timeout: 10000
        })).catch(e => console.log(e));;
    }
};