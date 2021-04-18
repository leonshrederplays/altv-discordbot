module.exports = {
	setupCommando() {
		// Define Groups and register them.
		const path = require('path');
		client.registry
			// Registers your custom command groups
			.registerGroups([
				['fun', 'Fun commands'],
				['music', 'Music commands'],
				['info', 'Information commands'],
				['mod', 'Moderation commands'],
				['config', 'Configuration commands'],
				['other', 'Other commands'],
				['gifs', 'Gif commands'],
				['memes', 'Meme commands'],
				['dev', 'Developer commands']
			])

			// Registers all built-in groups, commands, and argument types
			.registerDefaultGroups()
			.registerDefaultTypes()
			.registerDefaultCommands({
				unknownCommand: false
			})
			// Registers all of your commands in the ./commands/ directory
			.registerCommandsIn(path.join(__dirname, '../commands'));
	}
};