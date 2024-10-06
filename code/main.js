//   == Import Dependencies ==   //
const { Client, GatewayIntentBits } = require('discord.js');
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





//   == Ahri Receives A Message ==   //
Ahri.on('messageCreate', msg => {
    // Prevent Bot Feedback Loop
    if (msg.author.bot) return;

    // Isolate Command Type
    const COMMAND = msg.content.split(' ');

    // Commands Accessable To '@everyone'

    // Commands Accessable To 'Admin'
    if ( utils.ofRole(msg, 'Admin') ) {
        if (COMMAND[0] == '!links') utils.sendAllLinks(msg);
        if (COMMAND[0] == '!clear') utils.clearChat(msg);
    };
});





//   == Link Ahri Code To Bot ==   //
Ahri.login(BOT_TOKEN);