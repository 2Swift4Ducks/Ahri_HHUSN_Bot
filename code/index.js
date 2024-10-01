//   == Import Dependencies ==   //
const { Client, GatewayIntentBits } = require('discord.js');





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
    console.log('   == Ahri Has Awakened ==');
});





//   == Link Ahri Code To Bot ==   //
Ahri.login(BOT_TOKEN);