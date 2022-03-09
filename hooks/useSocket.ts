// Packages imports
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";

// Local Imports 
import env from "../config/env";

// Hooks Props
interface useSocketHookProps {
    message?: string;
    owner_id?: string;
    room_id?: string;
    onMessageArrive?: (message: any) => void;
    onTypeStart?: () => void;
    onTypeEnd?: () => void;
    onUsersCountUpdate?: (count: number) => void;
}

// Socket Hook
export default function useSocket(props: useSocketHookProps) {
    // Destructuring Props
    const { message, owner_id, room_id, onMessageArrive, onTypeStart, onTypeEnd, onUsersCountUpdate } = props;

    // Local Refs
    const socket = useRef(io(env.dev_base_url));

    // Socket Initialization
    useEffect(() => {
        // Join Room
        socket.current.emit("joinRoom", { username: owner_id, room: room_id });

        // Listen for messages
        socket.current.on("message", (message) => {
            if (message.sender_id !== owner_id) {
                if (typeof onMessageArrive === "function") {
                    if (typeof onTypeEnd === "function") onTypeEnd();

                    onMessageArrive(message);
                }
            }
        });

        // Listen for typing start and end
        socket.current.on("type-update-emitter", (message) => {
            if (message.typer !== owner_id) {
                if (message.message === "start") {
                    if (typeof onTypeStart === "function") onTypeStart();
                }
                else {
                    if (typeof onTypeEnd === "function") onTypeEnd();
                }
            }
        });

        // Listen for users count update
        socket.current.on("roomUsers", ({ users }: { users?: Array<{ id?: string, username?: string }> }) => {
            // Make sure that users array has unique usernames
            const unique = [...new Set(users.map(item => item.username))];
            if (typeof onUsersCountUpdate === "function") onUsersCountUpdate(unique.length);
        });

        return () => {
            socket.current.disconnect();
        };
    }, []);

    // Update the other user that I am typing through socket
    useEffect(() => {
        if (message.length) {
            if (socket.current) {
                socket.current.emit("type-update", {
                    message: `start`,
                    typer: owner_id,
                });
            }
        }

        const timeout = setTimeout(() => {
            if (socket.current) {
                socket.current.emit("type-update", {
                    message: `stop`,
                    typer: owner_id,
                });
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [message]);

    // Fucntoin to send a message to the socket to other user
    const SendToSocket = async (data) => {
        try {
            if (socket.current) {
                socket.current.emit("chatMessage", data);
            }
        } catch (error) { }
    };

    return { SendToSocket };
}