//const { blockCommand } = require('../handlers/commandoHandlers');
const {
    onGuildCreate,
    onGuildDelete,
    onGuildMemberAdd,
    onGuildMemberRemove
} = require('./guildHandlers');
const {
    Structures,
    MessageEmbed,
    MessageAttachment,
    Message
} = require('discord.js');
const guildHandlers = require('./guildHandlers');
module.exports = {
    onReady: () => {
        client.on('ready', () => {
            client.user.setStatus('online');
            client.user.setActivity('AltV: GTAV');
            logAll(`Logged in as: ${client.user.username}#${client.user.discriminator}`);
            require('./trelloHandler');
        });

        onGuildMemberAdd();
    },
    onVoiceStateUpdate: () => {
        client.on('voiceStateUpdate', async (___, newState) => {
            if (
                newState.member.user.bot &&
                !newState.channelID &&
                newState.guild.musicData.songDispatcher &&
                newState.member.user.id == client.user.id
            ) {
                newState.guild.musicData.queue.length = 0;
                newState.guild.musicData.songDispatcher.end();
                return;
            }
            if (
                newState.member.user.bot &&
                newState.channelID &&
                newState.member.user.id == client.user.id &&
                !newState.selfDeaf
            ) {
                newState.setSelfDeaf(true);
            }
        });
    },
    onPresenceUpdate: () => {
        client.on('presenceUpdate', (oldPresence, newPresence) => {});
    },
    onRateLimit: () => {
        client.on('rateLimit', (rateLimitInfo) => {});
    },
    onTypingStart: () => {
        client.on('typingStart', (channel, user) => {});
    },
    onInvalidated: () => {
        client.on('invalidated', () => {});
    },
    onUserUpdate: () => {
        client.on('userUpdate', (oldUser, newUser) => {});
    },
    onWebhookUpdate: () => {
        client.on('webhookUpdate', (channel) => {});
    }
};