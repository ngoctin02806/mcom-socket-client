const io = require('socket.io-client');

const state = {
    io: io,
    socket: null,
};

const connect = ({ host = "http://localhost", port = 80 }, token, channels) => {
    try {
        const socket = io.connect(`${host}:${port}`, {
            query: {
                token,
                rooms: JSON.stringify(channels)
            }
        });

        state.socket = socket;
    } catch (error) {
        throw error;
    }
}

const publish = (payload, channel) => {
    try {
        state.socket.emit("action", {
            room_id: channel, 
            payload
        });
    } catch (error) {
        throw error;
    }
};

const subscribe = (channel, callback) => {
    try {
        state.socket.once(channel, msg => {
            callback(msg);
        })
    } catch (error) {
        throw error;
    }
}

const ioClient = () => state.io;

const socket = () => state.socket;

module.exports = {
    connect,
    publish,
    subscribe,
    ioClient,
    socket
}