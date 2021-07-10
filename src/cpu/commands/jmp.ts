import {Command, Commands, ICommand} from '../types';
import { CPU } from '../';

export class JMPCommand extends Command {
	command = Commands.jmp

	execute(cpu: CPU, cmd: ICommand): number {
		const target = cpu.memory.readUInt32LE(cmd.target);
		const additionalValue = cpu.memory.readInt32LE(cmd.additional);
		if(additionalValue) {
			return cmd.target - cpu.IPPointer;
		}
		return 9;
	}
}