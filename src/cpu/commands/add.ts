import {Command, Commands, ICommand} from '../types';
import { CPU } from '../';

export class ADDCommand extends Command {
	command = Commands.add

	execute(cpu: CPU, cmd: ICommand): number {
		const targetValue = cpu.memory.readInt32LE(cmd.target);
		const additionalValue = cpu.memory.readInt32LE(cmd.additional)
		if(additionalValue + targetValue > 2147483647 || targetValue + additionalValue < -2147483647) {
			throw new Error('Integer overflow')
		}

		cpu.memory.writeInt32LE(targetValue + additionalValue, cmd.target);
		return 9;
	}
}
