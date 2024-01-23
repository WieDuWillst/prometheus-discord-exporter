const {Client, IntentsBitField} = require('discord.js');
const dotEnv = require('dotenv');
dotEnv.config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildMessageTyping,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildModeration,
        IntentsBitField.Flags.MessageContent
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.login(process.env.BOT_TOKEN);

function getChannelCount() {
    const guild = client.guilds.cache.get(process.env.GUILD_ID)
    return guild.channels.cache.size;
}

function getMemberCount() {
    const guild = client.guilds.cache.get(process.env.GUILD_ID)
    return guild.memberCount;
}

function getRoleCount() {
    const guild = client.guilds.cache.get(process.env.GUILD_ID)
    return guild.roles.cache.size;
}

function getBannedCount() {
    const guild = client.guilds.cache.get(process.env.GUILD_ID)
    const bans = guild.bans.cache.size;

    return bans;
}

function getBotCount() {
    const guild = client.guilds.cache.get(process.env.GUILD_ID)
    const bots = guild.members.cache.filter(member => member.user.bot).size;

    return bots;
}



module.exports = {
    getChannelCount,
    getMemberCount,
    getRoleCount,
    getBannedCount,
    getBotCount,
    client,
};