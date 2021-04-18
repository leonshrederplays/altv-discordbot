module.exports = {
	createStructure: (Structures) => {
		Structures.extend('Guild', function (Guild) {
			class GuildSettings extends Guild {
				constructor(client, data) {
					super(client, data);
					this.guildSettings = {
						guildID: null,
						guildName: null,
						ownerID: null,
						prefix: "!",
						cmdChannel: null,
						cmdMusicChannel: null,
						greetingChannelID: null,
						autoRoleID: null,
						leaveChannelID: null,
						ruleRoleID: null,
						ruleChannelID: null,
						statCategoryID: null,
						statChannelID: null,
						volume: 1,
						twitchUserID: null,
						language: "en"
					};
					this.musicData = {
						queue: [],
						isPlaying: false,
						nowPlaying: null,
						songDispatcher: null,
						skipTimer: false, // only skip if user used leave command
						loopSong: false,
						loopQueue: false
					};
					this.triviaData = {
						isTriviaRunning: false,
						wasTriviaEndCalled: false,
						triviaQueue: [],
						triviaScore: new Map()
					};
				}
			}
			return GuildSettings;
		});
	}
}