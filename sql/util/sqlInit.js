//require('mongoose').set('debug', true)
module.exports = {
	sqlInit: () => {
		return new Promise((resolve, reject) => {
			logAll("Initializing MongoDB...", 'DEBUG');
			// Define MongoDB ModelMap.
			global.discordModelMap = new Map();
			let DiscordSchemas = require('../schema/DiscordSchemas');
			discordModelMap.set("guildSchema", connections.get('dcConn').model('guildsettings', DiscordSchemas.guildSchema()));
			discordModelMap.set("economySchema", connections.get('dcConn').model("economyschema", DiscordSchemas.economySchema()));
			discordModelMap.set("shopSchema", connections.get('dcConn').model("shopschema", DiscordSchemas.shopSchema()));
			logAll("Done...", 'DEBUG');
			return resolve();
		})
	},
	setupData: () => {
		return new Promise((resolve, reject) => {
			let guildSettings = discordModelMap.get('guildSchema');
			let guildSize = client.guilds.cache.size;
			connections.get('dcConn').collection('guildsettings').countDocuments().then((documentCount) => {
					if (documentCount === 0) {
						if (guildSize > 0) {
							logAll("Database is empty injecting all Guilds im currently part of...", 'DEBUG');

							let addedGuildNames = [];
							let addedGuilds = 0;
							client.guilds.cache.forEach((guild) => {
								addedGuildNames.push(guild.name);
								addedGuilds++;
								let newGuildDocument = guildSettings({
									guildID: guild.id,
									ownerID: guild.ownerID,
									guildName: guild.name
								});
								newGuildDocument.save().then(
									(result) => {
										guild.guildSettings.guildID =
											guild.id;
										guild.guildSettings.guildName =
											guild.name;
										guild.guildSettings.ownerID =
											guild.ownerID;
										guild.guildSettings.prefix =
											client.commandPrefix;
										guild.guildSettings.cmdChannel = null;
										guild.guildSettings.cmdMusicChannel = null;
										guild.guildSettings.greetingChannelID = null;
										guild.guildSettings.autoRoleID = null;
										guild.guildSettings.leaveChannelID = null;
										guild.guildSettings.ruleRoleID = null;
										guild.guildSettings.ruleChannelID = null;
										guild.guildSettings.statCategoryID = null;
										guild.guildSettings.statChannelID = null;
										guild.guildSettings.twitchUserID = null;
										guild.guildSettings.language = 'EN';
									},
									(error) => {
										logAll(error.message, 'ERROR');
									}
								);
							});
							if (addedGuildNames.length === 0) {
								logAll("Done...", 'DEBUG')
							} else {
								logAll(`Finished injecting of: ${addedGuilds} Guilds...`, 'DEBUG');
								logAll(`Added: ${addedGuildNames}`, 'DEBUG');
								addedGuilds = 0;
								addedGuildNames = [];
							}
						}
						return resolve();
					} else {
						guildSettings.find().then(
							(documents) => {
								let removedGuildNames = [];
								let removedGuilds = 0;
								logAll('Checking for Guilds i am no longer part of...', 'DEBUG');
								logAll('Also passing all Servers on Database to their representive GuildSettings-Property', 'DEBUG');
								documents.forEach((doc, index, arr) => {
									let isPartOfGuild = client.guilds.cache.has(
										doc.guildID
									);
									if (isPartOfGuild === false) {
										removedGuildNames.push(
											doc.guildName
										);
										removedGuilds++;
										guildSettings.deleteOne({
												guildID: doc.guildID
											},
											(err, res) => {
												if (!err) {} else {
													logAll(err.message, 'ERROR');
												}
											}
										);
									} else {
										// Pass guildSettings to variable.
										let guildData = client.guilds.cache.get(
											doc.guildID
										);
										guildData.guildSettings.guildID =
											doc.guildID;
										guildData.guildSettings.guildName =
											doc.guildName;
										guildData.guildSettings.ownerID =
											doc.ownerID;
										guildData.guildSettings.prefix =
											doc.prefix;
										guildData.guildSettings.cmdChannel =
											doc.cmdChannel;
										guildData.guildSettings.cmdMusicChannel =
											doc.cmdMusicChannel;
										guildData.guildSettings.greetingChannelID =
											doc.greetingChannelID;
										guildData.guildSettings.autoRoleID =
											doc.autoRoleID;
										guildData.guildSettings.leaveChannelID =
											doc.leaveChannelID;
										guildData.guildSettings.ruleRoleID =
											doc.ruleRoleID;
										guildData.guildSettings.ruleChannelID =
											doc.ruleChannelID;
										guildData.guildSettings.statCategoryID =
											doc.statCategoryID;
										guildData.guildSettings.statChannelID =
											doc.statChannelID;
										guildData.guildSettings.twitchUserID =
											doc.twitchUserID;
										guildData.guildSettings.language =
											doc.language;
									}
								});
								if (removedGuildNames.length === 0) {
									logAll('Done...', 'DEBUG');
								} else {
									logAll(`Finished deleting of: ${removedGuilds} Guilds...`, 'DEBUG');
									logAll(`Removed: ${removedGuildNames}`, 'DEBUG');
									removedGuilds = 0;
									removedGuildNames = [];
								}

								// Checking for new Guilds that were added when i was offline.
								let addedGuildNames = [];
								let addedGuilds = 0;
								logAll('Checking for new Guilds added while i was offline...', 'DEBUG');
								client.guilds.cache.forEach((guild) => {
									if (
										guild.guildSettings.guildID === null
									) {
										addedGuildNames.push(guild.name);
										addedGuilds++;
									}
									guildSettings
										.findOne({
											guildID: guild.id
										})
										.then((doc, err) => {
											if (!err) {
												if (!doc) {
													let newGuildDocument = guildSettings({
														guildID: guild.id,
														ownerID: guild.ownerID,
														guildName: guild.name
													});
													newGuildDocument
														.save()
														.then(
															(result) => {},
															(error) => {
																logAll(error.message, 'ERROR');
															}
														);
												}
											} else {
												logAll(error.message, 'ERROR');
											}
										});
								});
								if (addedGuildNames.length === 0) {
									logAll('Done...', 'DEBUG');
								} else {
									logAll(`Finished injecting of: ${addedGuilds} Guilds...`, 'DEBUG');
									logAll(`Added: ${addedGuildNames}`, 'DEBUG');
									addedGuilds = 0;
									addedGuildNames = [];
								}
								return resolve('SUCCESS');
							},
							(error) => {
								logAll(error.message, 'ERROR');
								return reject();
							}
						);
					}
				},
				(err) => {
					err.message.red;
				})
		})
	},
	validateData: function validateData(guildSettings, connection) {
		return new Promise((resolve, reject) => {
			logAll(`Validating GuildSetting's:`, 'DEBUG');
			logAll(`Validating: Guild-Name's...`, 'DEBUG');
			client.guilds.cache.forEach((guild) => {
				// Validating Guild-Name.
				if (guild.name != guild.guildSettings.guildName) {
					connection.collection('guildsettings').findOneAndUpdate({
						guildID: guild.id
					}, {
						$set: {
							"guildName": guild.name
						}
					}, {
						new: true
					});
					logAll(`Updated Guild-Name from: ${guild.guildSettings.guildName} to: ${guild.name}`, 'DEBUG');
					guild.guildSettings.guildName = guild.name;
				}
			});
			logAll('Done...', 'DEBUG')

			logAll(`Validating: Owner-ID's...`, 'DEBUG');
			client.guilds.cache.forEach((guild) => {
				// Validating Owner-ID.
				if (guild.ownerID != guild.guildSettings.ownerID) {
					console.log(connection);
					connection.collection('guildsettings').findOneAndUpdate({
						guildID: guild.id
					}, {
						$set: {
							"ownerID": guild.ownerID
						}
					}, {
						new: true
					});
					logAll(`Updated Guild-Owner from: ${guild.name} to: ${guild.ownerID}`, 'DEBUG');
					guild.guildSettings.ownerID = guild.ownerID;
				}
			});
			logAll('Done...', 'DEBUG');

			logAll(`Validating: Command-Channel's...`, 'DEBUG');
			client.guilds.cache.forEach((guild) => {
				// Validating Command-Channel.
				if (
					guild.guildSettings.cmdChannel != null &&
					!guild.channels.cache.has(guild.guildSettings.cmdChannel)
				) {
					connection.collection('guildsettings').findOneAndUpdate({
						guildID: guild.id
					}, {
						$set: {
							"cmdChannel": null
						}
					}, {
						new: true
					});
					logAll(`Reseted Command-Channel from ${guild.name}`, 'DEBUG');
					guild.guildSettings.cmdChannel = null;
				}
			});
			logAll('Done...', 'DEBUG');

			logAll(`Validating: MusicCommmand-Channel's...`, 'DEBUG');
			client.guilds.cache.forEach((guild) => {
				// Validating MusicCommand-Channel.
				if (
					guild.guildSettings.cmdMusicChannel != null &&
					!guild.channels.cache.has(
						guild.guildSettings.cmdMusicChannel
					)
				) {
					connection.collection('guildsettings').findOneAndUpdate({
						guildID: guild.id
					}, {
						$set: {
							"cmdMusicChannel": null
						}
					}, {
						new: true
					});
					logAll(`Reseted MusicCommand-Channel from ${guild.name}`, 'DEBUG');
					guild.guildSettings.cmdMusicChannel = null;
				}
			});
			logAll('Done...', 'DEBUG');

			logAll(`Validating: Greeting-Channel's...`, 'DEBUG');
			client.guilds.cache.forEach((guild) => {
				// Validating Greeting-Channel.
				if (
					guild.guildSettings.greetingChannelID != null &&
					!guild.channels.cache.has(
						guild.guildSettings.greetingChannelID
					)
				) {
					connection.collection('guildsettings').findOneAndUpdate({
						guildID: guild.id
					}, {
						$set: {
							"greetingChannelID": null
						}
					}, {
						new: true
					});
					logAll(`Reseted Greeting-Channel from ${guild.name}`, 'DEBUG');
					guild.guildSettings.cmdChannel = null;
				}
			});
			logAll('Done...', 'DEBUG');

			logAll(`Validating: Leave-Channel's...`, 'DEBUG');
			client.guilds.cache.forEach((guild) => {
				// Validating Leave-Channel.
				if (
					guild.guildSettings.leaveChannelID != null &&
					!guild.channels.cache.has(
						guild.guildSettings.leaveChannelID
					)
				) {
					connection.collection('guildsettings').findOneAndUpdate({
						guildID: guild.id
					}, {
						$set: {
							"leaveChannelID": null
						}
					}, {
						new: true
					});
					logAll(`Reseted Leave-Channel from ${guild.name}`, 'DEBUG');
					guild.guildSettings.leaveChannelID = null;
				}
			});
			logAll('Done...', 'DEBUG');

			logAll(`Validating: Autorole's...`, 'DEBUG');
			client.guilds.cache.forEach((guild) => {
				// Validating Autorole.
				if (
					guild.guildSettings.autoRoleID != null &&
					!guild.roles.cache.has(guild.guildSettings.autoRoleID)
				) {
					connection.collection('guildsettings').findOneAndUpdate({
						guildID: guild.id
					}, {
						$set: {
							"autoRoleID": null
						}
					}, {
						new: true
					});
					logAll(`Reseted Autorole from ${guild.name}`, 'DEBUG');
					guild.guildSettings.autoRoleID = null;
				}
			});
			logAll('Done...', 'DEBUG');

			logAll(`Validating: Rule-Role's...`, 'DEBUG');
			client.guilds.cache.forEach((guild) => {
				// Validating Rule-Role.
				if (
					guild.guildSettings.ruleRoleID != null &&
					!guild.roles.cache.has(guild.guildSettings.ruleRoleID)
				) {
					connection.collection('guildsettings').findOneAndUpdate({
						guildID: guild.id
					}, {
						$set: {
							"ruleRoleID": null
						}
					}, {
						new: true
					});
					logAll(`Reseted Rule-Role from ${guild.name}`, 'DEBUG');
					guild.guildSettings.ruleRoleID = null;
				}
			});
			logAll('Done...', 'DEBUG');

			logAll(`Validating: Rule-Channel's...`, 'DEBUG');
			client.guilds.cache.forEach((guild) => {
				// Validating Rule-Channel.
				if (
					guild.guildSettings.ruleChannelID != null &&
					!guild.channels.cache.has(guild.guildSettings.ruleChannelID)
				) {
					connection.collection('guildsettings').findOneAndUpdate({
						guildID: guild.id
					}, {
						$set: {
							"ruleChannelID": null
						}
					}, {
						new: true
					});
					logAll(`Reseted Rule-Channel from ${guild.name}`, 'DEBUG');
					guild.guildSettings.ruleChannelID = null;
				}
			});
			logAll('Done...', 'DEBUG');

			logAll(`Validating: Stat-Category's...`, 'DEBUG');
			client.guilds.cache.forEach((guild) => {
				// Validating Stat-Category.
				if (
					guild.guildSettings.statCategoryID != null &&
					!guild.channels.cache.has(
						guild.guildSettings.statCategoryID
					)
				) {
					connection.collection('guildsettings').findOneAndUpdate({
						guildID: guild.id
					}, {
						$set: {
							"statCategoryID": null
						}
					}, {
						new: true
					});
					logAll(`Reseted Stat-Category from ${guild.name}`, 'DEBUG');
					guild.guildSettings.statCategoryID = null;
				}
			});
			logAll('Done...', 'DEBUG');

			logAll(`Validating: Stat-Channel's...`, 'DEBUG');
			client.guilds.cache.forEach((guild) => {
				// Validating Stat-Channel.
				if (
					guild.guildSettings.statChannelID != null &&
					!guild.channels.cache.has(guild.guildSettings.statChannelID)
				) {
					connection.collection('guildsettings').findOneAndUpdate({
						guildID: guild.id
					}, {
						$set: {
							"statChannelID": null
						}
					}, {
						new: true
					});
					logAll(`Reseted Stat-Channel from ${guild.name}`, 'DEBUG');
					guild.guildSettings.statChannelID = null;
				}
			});
			logAll('Done...', 'DEBUG');

			return resolve('SUCCESS');
		});
	}
}