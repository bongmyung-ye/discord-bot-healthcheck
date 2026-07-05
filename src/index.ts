import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
} from "discord.js";
import { aboutCommand, handleAboutCommand } from "./commands/about.js";
import { healthCommand, handleHealthCommand } from "./commands/health.js";
import { loadEnv } from "./utils/env.js";

const env = loadEnv();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const commands = [healthCommand.toJSON(), aboutCommand.toJSON()];

async function registerGuildCommands(): Promise<void> {
  const rest = new REST({ version: "10" }).setToken(env.token);

  await rest.put(Routes.applicationGuildCommands(env.clientId, env.guildId), {
    body: commands,
  });

  console.log("Slash commands registered.");
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user?.tag ?? "Unknown bot"}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    if (interaction.commandName === "health") {
      await handleHealthCommand(client, interaction);
      return;
    }

    if (interaction.commandName === "about") {
      await handleAboutCommand(interaction);
      return;
    }
  } catch (error) {
    console.error(error);

    const message = {
      content: "명령어를 처리하는 중 문제가 발생했습니다.",
      ephemeral: true,
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(message);
    } else {
      await interaction.reply(message);
    }
  }
});

await registerGuildCommands();
await client.login(env.token);
