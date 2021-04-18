module.exports = {
    onGuildCreate: (guildSettings, connection) => {
        client.on('guildCreate', joined => {

        })
    },
    onGuildDelete: (guildSettings, connection) => {
        client.on('guildDelete', deleted => {

        })
    },
    onGuildMemberAdd: (MessageEmbed) => {
        client.on('guildMemberAdd', newMember => {
            const memberRole = newMember.guild.roles.cache.find(role => role.id === '832002922925654058');
            const teamRole = newMember.guild.roles.cache.find(role => role.id === '832123118243545128');
            const userRole = newMember.guild.roles.cache.find(role => role.id === '832123787226382390');
            newMember.roles.add(teamRole);
            newMember.roles.add(userRole);
            newMember.roles.add(memberRole);
        })
    },
    onGuildMemberRemove: (MessageEmbed) => {
        client.on('guildMemberRemove', member => {
            if (member.id === '750430846468620380') return;
            try {
                let embed = new MessageEmbed();
                embed.setTitle("Auf ein baldiges wiedersehen " + member.displayName)
                embed.setAuthor(client.user.username, client.user.avatarURL())
                embed.setColor("#0099FF")
                embed.setThumbnail(member.avatarURL())
                embed.setFooter("Der Bot wird stetig weiterentwickelt auch wenn dem nicht so ist.", client.user.avatarURL())
                embed.setTimestamp()
                embed.addField("**Username:**", member.displayName, true)
                embed.addField("**User-Discriminator:**", member.user.discriminator, true)
                embed.addField("**User-ID:**", member.id, true)
                switch (member.presence.status) {
                    case "online":
                        embed.addField("**Status:**", "Online", true)
                        break;

                    case "offline":
                        embed.addField("**Status:**", "Offline", true)
                        break;
                    case "dnd":
                        embed.addField("**Status:**", "Do not Disturb", true)
                        break;
                    case "idle":
                        embed.addField("**Status:**", "AFK", true)
                        break;
                }
                if (!member.presence.game == undefined || !member.presence.clientStatus) {
                    let game = member.presence.activities.map(entries => entries);
                    if (game.length != 0) {
                        embed.addField(`**Spiel:** `, game, true)
                    }
                }

                let createdAt = member.createdAt;
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
                embed.addField(`**Erstellt am:** `, string, true)

                let channel = member.guild.channels.cache.find(channel => channel.id == "752131300705697823" || channel.name == "bye_bye");
                channel.send(embed);

            } catch (e) {
                logAll(e, 'ERROR');
            }
        })
    },
    onGuildBanAdd: () => {
        client.on('guildBanAdd', (guild, user) => {

        })
    },
    onGuildBanRemove: () => {
        client.on('guildBanRemove', (guild, user) => {

        })
    },
    onGuildMemberUpdate: () => {
        client.on('guildMemberUpdate', (oldMember, newMember) => {

        })
    },
    onGuildUnavailable: () => {
        client.on('guildUnavailable', (guild) => {

        })
    },
    onGuildUpdate: () => {
        client.on('guildUpdate', (oldGuild, newGuild) => {

        })
    },
    onGuildIntegrationsUpdate: () => {
        client.on('guildIntegrationsUpdate', (guild) => {

        })
    },
    onGuildMemberAvailable: () => {
        client.on('guildMemberAvailable', (member) => {

        })
    },
    onGuildMembersChunk: () => {
        client.on('guildMembersChunk', (members, guild, chunk) => {

        })
    },
    onGuildMemberSpeaking: () => {
        client.on('guildMemberSpeaking', (member, speaking) => {

        })
    },
};