import { ChatInputCommandInteraction } from "discord.js";

const errorMessage = {
    content: "명령어를 처리하는 중 문제가 발생했습니다.",
    ephemeral: true,
};

export async function sendCommandError(interaction: ChatInputCommandInteraction) {
    try {
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(errorMessage);
            return true;
        }

        await interaction.reply(errorMessage);
        return true;
    } catch {
        return false;
    }
}