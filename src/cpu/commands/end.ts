import {Command, Commands, ICommand} from '../types';
import { CPU } from '../';

export class ENDCommand extends Command {
	command = Commands.end

	execute(cpu: CPU, cmd: ICommand): number {
		cpu.finished = true;
		return 1;
	}
}