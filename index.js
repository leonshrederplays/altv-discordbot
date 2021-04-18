// Define Logger.
const loggerMap = require('./util/logger').logger();
// Setup Global Functions.
require('./util/globalFunctions').globalFunctions(loggerMap);
// Require .env file.
require('./util/findEnv').envFinder();
// Define Commando-Client.
const {
    CommandoClient
} = require('discord.js-commando');
// Define discord.js methods.
const Discord = require('discord.js');

function testLog() {
    logAll("This is a INFO");
    logAll("This is a ERROR", 'ERROR');
    logAll("This is a FATAL", 'FATAL');
    logAll("This is a TRACE", 'TRACE');
    logAll("This is a WARN", 'WARN');
    logAll("This is a DEBUG", 'DEBUG');
}

// Define Commando-Client.
logAll("Defining Client...", 'DEBUG');
global.client = new CommandoClient({
    commandPrefix: '?', // Standard Prefix of Bot.
    owner: '324938553937100815', // Owner-ID of Bot in this case: Leon|ShrederPlays#2076.
    unknownCommandResponse: false, // Wether to response to wrong Commands or not.
    invite: 'https://discord.gg/br2at6E' // Invite to Bot's Support-Server.
});

// Setup Client-Logger's
logAll("Activating Client Logging...", 'DEBUG')
require('./handlers/debugHandlers').debugAll(loggerMap);

// Setup Discord.js-Commando.
logAll("Setting up Discord-Commando...", 'DEBUG')
require('./util/setupCommando').setupCommando();

// ---------------------------------------------------------------------------------------------------------------------
// Preparing to start bot. 

// Function to start the actual bot.
function startBot() {

    // Start Client's on Ready-Event...
    require('./handlers/otherHandlers').onReady();

    // Add a inhibitor...
    require('./util/inhibittor').addInhibitor();

    // Login to Discord...
    client.login(process.env.TOKEN);
}
startBot();