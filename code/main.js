//   == Import Dependencies ==   //
const { Client, GatewayIntentBits, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const utils = require('./ahriutils.js');





//   == Pull Discord Bot Token ==   //
require('dotenv').config();
const BOT_TOKEN = process.env.DISCORD_TOKEN;





//   == Initialize Ahri Bot With Permissions ==   //
const Ahri = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
    ],
});





//   == Ahri Is Ready Event ==   //
Ahri.on('ready', () => {
    console.clear();
    console.log('   == Ahri Has Awakened ==');
});





//   == Temporary: Button ==   //
const BTN = new ButtonBuilder()
    .setCustomId('testbtn')
    .setLabel("Free Ahri Pics")
    .setStyle(ButtonStyle.Success)
;





//   == Ahri Receives A Message ==   //
Ahri.on('messageCreate', msg => {
    // Prevent Bot Feedback Loop
    if (msg.author.bot) return;

    // Tempory: Only Admin Usable
    if ( utils.ofRole(msg, 'Admin') ) {
        if (msg.content == '!links') utils.sendAllLinks(msg);
    };
});





//   == Link Ahri Code To Bot ==   //
Ahri.login(BOT_TOKEN);