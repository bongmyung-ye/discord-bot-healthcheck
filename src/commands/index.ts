import {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder,
} from "discord.js";
import { aboutCommand, handleAboutCommand } from "./about.js";
import { healthCommand, handleHealthCommand } from "./health.js";

type CommandHandler = (
    client: Client,
    interaction: ChatInputCommandInteraction,
) => Promise<void>;

type AppCommand = {
    name: string;
    data: SlashCommandBuilder;
    execute: CommandHandler;
};

const commands: AppCommand[] = [
    {
        name: "health",
        data: healthCommand,
        execute: handleHealthCommand,
    },
    {
        name: "about",
        data: aboutCommand,
        execute: handleAboutCommand,
    },
];

const commandMap = new Map(commands.map((command) => [command.name, command]));

export const commandPayload = commands.map((command) => command.data.toJSON());

export async function runCommand(
    client: Client,
    interaction: ChatInputCommandInteraction,
) {
    const command = commandMap.get(interaction.commandName);

    if (!command) {
        return false;
    }

    await command.execute(client, interaction);
    return true;
}