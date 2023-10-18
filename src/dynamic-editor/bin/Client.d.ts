import { Player } from "@minecraft/server";

export class Client{
    readonly player: Player;
    readonly name: string;
    readonly id: string;
    readonly isReady: boolean
}