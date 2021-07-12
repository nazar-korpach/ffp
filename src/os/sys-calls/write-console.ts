import {SysCall, SysCallsIndexes} from '../typing';
import { CPU } from '../../cpu';
import { OS } from '../'
import {ICommand} from '../../cpu/types'

export class WriteConsoleCall extends SysCall {
	callIndex = SysCallsIndexes.writeConsole

	execute(os: OS, cpu: CPU, cmd: ICommand) {
		const inputLength = cpu.memory.readInt32LE(cmd.target + 4);
		const inputPointer = cpu.memory.readInt32LE(cmd.target + 8);

		console.log(cpu.memory.slice(inputPointer, inputPointer + inputLength).toString());
	}
}