/*
 * A room ID specifies a Matrix room uniquely.
 * A server domain and a channel specifies an IRC room uniquely.
 * A "Room" is a combination of a unique Matrix room and a unique IRC room.
 * A Matrix room can have many Rooms (bridged to many irc channels).
 * An IRC channel can have many Rooms (bridged to many Matrix rooms).
 * Some of these bridges can be hard-coded by the launch configuration.
 * Some of these bridges are dynamically generated if:
 *  - A Matrix user invites a Virtual IRC User to a room (PM)
 *  - A Matrix user tries to join a room alias which maps to an IRC channel.
 */
"use strict";
var RemoteRoom = require("matrix-appservice-bridge").RemoteRoom;

/**
 * Construct a new IRC room.
 * @constructor
 * @param {IrcServer} server : The IRC server which contains this room.
 * @param {String} channel : The channel this room represents.
 */
class IrcRoom extends RemoteRoom {
    constructor(server, channel) {
        if (!server || !channel) {
            throw new Error("Server and channel are required.");
        }
        super(server.domain + "__" + channel, {
            domain: server.domain,
            channel: channel
        });
        this.server = server;
        this.channel = channel;
    }
}

module.exports = IrcRoom;