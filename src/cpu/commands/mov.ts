import {Command, Commands, ICommand} from '../types';
import { CPU } from '../';

export class MOVCommand extends Command {
	command = Commands.mov

	execute(cpu: CPU, cmd: ICommand): number {
		const additionalValue = cpu.memory.readUInt32LE(cmd.additional);
		cpu.memory.writeInt32LE(additionalValue, cmd.target) 
		return 9;
	}
}