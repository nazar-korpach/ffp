import {Command, Commands, ICommand} from '../types';
import { CPU } from '../';

export class SETCommand extends Command {
	command = Commands.set

	execute(cpu: CPU, cmd: ICommand): number {
		cpu.memory.writeInt32LE(cmd.additional, cmd.target);
		return 9;
	}
}
