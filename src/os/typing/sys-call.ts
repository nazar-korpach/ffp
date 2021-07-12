import { CPU } from "../../cpu";
import {OS} from "../"
import { ICommand } from "../../cpu/types";

export enum SysCallsIndexes {
	openConsole = 0,
	writeConsole = 1,
	closeConsole = 2
}

export abstract class SysCall {
	abstract callIndex: SysCallsIndexes

	abstract execute(os: OS, cpu: CPU, cmd: ICommand): void;
} 