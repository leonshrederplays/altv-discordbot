const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = {
	guildSchema: () => {
		return new Schema({
			guildID: {
				type: String,
				index: {
					unique: true
				},
				minLength: 18,
				maxLength: 18,
				required: true,
				trim: true
			},
			ownerID: {
				type: String,
				minLength: 18,
				maxLength: 18,
				required: true,
				trim: true
			},
			guildName: {
				type: String,
				minLength: 2,
				maxLength: 100,
				required: true,
				trim: true
			},
			prefix: {
				type: String,
				default: client.commandPrefix,
				required: false,
				trim: true
			},
			cmdChannel: {
				type: String,
				default: null,
				minLength: 18,
				maxLength: 18,
				required: false,
				trim: true
			},
			cmdMusicChannel: {
				type: String,
				default: null,
				minLength: 18,
				maxLength: 18,
				required: false,
				trim: true
			},
			greetingChannelID: {
				type: String,
				default: null,
				minLength: 18,
				maxLength: 18,
				required: false,
				trim: true
			},
			leaveChannelID: {
				type: String,
				default: null,
				minLength: 18,
				maxLength: 18,
				required: false,
				trim: true
			},
			statCategoryID: {
				type: String,
				default: null,
				minLength: 18,
				maxLength: 18,
				required: false,
				trim: true
			},
			statChannelID: {
				type: String,
				default: null,
				minLength: 18,
				maxLength: 18,
				required: false,
				trim: true
			},
			ruleChannelID: {
				type: String,
				default: null,
				minLength: 18,
				maxLength: 18,
				required: false,
				trim: true
			},
			ruleRoleID: {
				type: String,
				default: null,
				minLength: 18,
				maxLength: 18,
				required: false,
				trim: true
			},
			autoRoleID: {
				type: String,
				default: null,
				minLength: 18,
				maxLength: 18,
				required: false,
				trim: true
			},
			volume: {
				type: Number,
				default: 1,
				required: false
			},
			twitchUserID: {
				type: String,
				default: null,
				minLength: 18,
				maxLength: 18,
				required: false,
				trim: true
			},
			language: {
				type: String,
				default: 'EN',
				uppercase: true,
				required: false,
				trim: true
			}
		}, {
			timestamps: true
		})
	},
	economySchema: () => {
		return new Schema({
			userID: {
				type: String,
				minLength: 18,
				maxLength: 18,
				required: true,
				trim: true
			},
			guildID: {
				type: String,
				minLength: 18,
				maxLength: 18,
				required: true,
				trim: true
			},
			balance: {
				type: Number,
				get: v => Math.round(v),
				set: v => Math.round(v),
				default: 0,
				required: true,
				min: 0,
				max: 2147483647,
			},
			daily: {
				type: Date,
				required: true,
			},
		}, {
			timestamps: true
		})
	},
	shopSchema: () => {
		return new Schema({
			guildID: {
				type: String,
				minLength: 18,
				maxLength: 18,
				unique: true,
				required: true,
				trim: true
			},
			roleIDS: {
				type: [
					new Schema({
						roleID: {
							type: String,
							minLength: 18,
							maxLength: 18,
							required: true,
							trim: true
						},
						price: {
							type: Number,
							min: 1,
							max: 2147483647,
							required: true,
						},
					})
				],
				required: true,
			},
		}, {
			timestamps: true
		})
	},
}