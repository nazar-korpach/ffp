import {Command, Commands, ICommand} from '../types';
import { CPU } from '../';

export class DIVCommand extends Command {
	command = Commands.div

	execute(cpu: CPU, cmd: ICommand): number {
		const targetValue = cpu.memory.readInt32LE(cmd.target);
		const additionalValue = cpu.memory.readInt32LE(cmd.additional);
		const result = Math.floor(targetValue / additionalValue);

		if( result > 2147483647 || result < -2147483647) {
			throw new Error('Integer overflow')
		}

		cpu.memory.writeInt32LE(result, cmd.target);
		return 9;
	}
}
