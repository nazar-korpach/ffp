import {Command, Commands, ICommand} from '../types';
import { CPU } from '../';

export class CPMCommand extends Command {
	command = Commands.cpm

	execute(cpu: CPU, cmd: ICommand): number {
		const target = cpu.memory.readUInt32LE(cmd.target);
		const targetValue = cpu.memory.readInt32LE(cmd.target);
		const additionalValue = cpu.memory.readInt32LE(cmd.additional);

		cpu.memory.writeInt32LE(Number(targetValue > additionalValue), cmd.target);

		return 9;
	}
}