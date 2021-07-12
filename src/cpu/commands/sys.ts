import {Command, Commands, ICommand} from '../types';
import { CPU } from '../';

export class SYSCommand extends Command {
	command = Commands.sys

	execute(cpu: CPU, cmd: ICommand): number {
		cpu.os.sysCall(cmd);
		return 9;
	}
}