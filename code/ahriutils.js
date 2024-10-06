//   == Import Dependencies ==   //
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const fs = require('fs');





//   == Check Role Of Message Author ==   //
function ofRole(_msg, _role) {
    // Receive User Cache
    const CACHE = _msg.member.roles.cache;
    
    // Check For Matching Roles
    const BOOL = CACHE.some(role =>
        role.name === _role
    );

    // Return Boolean Value
    return BOOL;
};





//   == Return Embed Object ==   //
function newLinkEmbed(_title, _description, _icon, _url) {
    // Define Anchor Button
    const ANCHOR = new ButtonBuilder()
        .setLabel('Zur Website')
        .setStyle(ButtonStyle.Link)
        .setURL(_url)
    ;

    // Define Link Embed Object
    const LINK_EMBED = new EmbedBuilder()
        .setTitle(_title)
        .setDescription(_description)
        .setThumbnail(_icon)
    ;

    // Return Embed With Buttons
    return {
        embeds: [LINK_EMBED],
        components: [new ActionRowBuilder().addComponents(ANCHOR)],
    };
};





//   == Parse Links JSON and Return Object ==   //
function formatAllLinks() {
    // Parse Links From Filesystem
    const JSON_LINKS = fs.readFileSync('./data/links.json', 'utf-8');
    const PRE_LINKS = JSON.parse(JSON_LINKS);
    let formattedLinks = [];

    PRE_LINKS.forEach((category) => {
        // Define Title And Links Of Category
        const CATEGORY_TITLE = category.title;
        const LINK_ARRAY = category.links;
        let embeddedLinks = [];

        // Create Embed Of Every Link In Array
        LINK_ARRAY.forEach((link) => {
            // Define All Properties Of Link
            const LINK_TITLE = link.title;
            const LINK_DESCRIPTION = link.description;
            const LINK_ICON = link.icon;
            const LINK_URL = link.url;

            // Create Link Embed
            const LINK_EMBED = newLinkEmbed(
                LINK_TITLE,
                LINK_DESCRIPTION,
                LINK_ICON,
                LINK_URL,
            );

            // Push Object Into Category Array
            embeddedLinks.push(LINK_EMBED);
        });

        // Push Category With Links Into Root Array
        formattedLinks.push({
            title: CATEGORY_TITLE,
            links: embeddedLinks,
        });
    });

    // Return Formatted Links
    return formattedLinks;
}





//   == Send All Links Into Discord Chat ==   //
function sendAllLinks(_msg) {
    // Loop Through All Categories
    const FORMATTED_LINKS = formatAllLinks();
    FORMATTED_LINKS.forEach((category) => {
        // Send Title Of Category
        _msg.channel.send(`# ${category.title}`);

        // Loop Through Every Link
        category.links.forEach((link) => {
            // Send Link Embed into Discord Chat
            _msg.channel.send({
                components: link.components,
                embeds: link.embeds,
            });
        });
    });
};





//   == Clear Discord Chat ==   //
async function clearChat(_msg) {
    // Parse Clear Limit
    let count = Number(_msg.content.split(' ')[1]);

    // If Clear Limit Is 0 => Send Annoyed Message
    if (count == 0) {
        _msg.channel.send('What the heck is the point of that 🤨');
        return;
    };
    
    // If Clear Limit Is Below 0 => Send Even More Annoyed Message
    if (count < 0) {
        _msg.channel.send(`Alright what the heck you want from me, add ${-count} messages? 😑`);
        return;
    };

    // Check If Count... Exists || Is Greater Than Limit || Is a Number
    if (!count || count > 64 || typeof(count) != 'number') count = 64;

    // Clear Messages
    const MESSAGES = await _msg.channel.messages.fetch({ limit: count });
    await _msg.channel.bulkDelete(MESSAGES, true);
};





//   == Export 'ahriutils' Module ==   //
module.exports = {
    clearChat,
    ofRole,
    sendAllLinks,
};