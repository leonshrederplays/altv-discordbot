module.exports = {
	addInhibitor() {
		client.dispatcher.addInhibitor((message) => {
			if (message.command === null) return false;
			let guildSettings = message.guild.guildSettings;
			if (guildSettings.cmdChannel != null) {
				if (
					guildSettings.cmdMusicChannel != null &&
					message.command.group.id === 'music' &&
					message.channel.id === guildSettings.cmdMusicChannel
				)
					return false;

				if (message.channel.id != guildSettings.cmdChannel) {
					message.delete();
					return message
						.reply(
							`Normale Befehle können nur in: <#${guildSettings.cmdChannel}> benutzt werden.`
						)
						.then((msg) => msg.delete({
							timeout: 5000
						}))
						.catch((e) => console.log(e));
				} else {
					if (
						guildSettings.cmdMusicChannel != null &&
						message.command.group.id === 'music' &&
						message.channel.id === guildSettings.cmdChannel
					) {
						message.delete();
						return message
							.reply(
								`Musik Befehle können nur in: <#${guildSettings.cmdMusicChannel}> benutzt werden.`
							)
							.then((msg) => msg.delete({
								timeout: 5000
							}))
							.catch((e) => console.log(e));
					}
				}
			}
		});
	}
};