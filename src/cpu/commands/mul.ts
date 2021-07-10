import {Command, Commands, ICommand} from '../types';
import { CPU } from '../';

export class MULCommand extends Command {
	command = Commands.mul

	execute(cpu: CPU, cmd: ICommand): number {
		const targetValue = cpu.memory.readInt32LE(cmd.target);
		const additionalValue = cpu.memory.readInt32LE(cmd.additional);
		const result = targetValue * additionalValue;

		if( result > 2147483647 || result < -2147483647) {
			throw new Error('Integer overflow')
		}

		cpu.memory.writeInt32LE(result, cmd.target);
		return 9;
	}
}
