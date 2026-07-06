import { REST, Routes } from "discord.js";
import { commandPayload } from "../commands/index.js";
import type { AppEnv } from "../utils/env.js";
import { logger } from "../utils/logger.js";

export async function registerCommands(env: AppEnv) {
    const rest = new REST({ version: "10" }).setToken(env.token);

    await rest.put(Routes.applicationGuildCommands(env.clientId, env.guildId), {
        body: commandPayload,
    });

    logger.info(`Registered ${commandPayload.length} slash commands`);
}