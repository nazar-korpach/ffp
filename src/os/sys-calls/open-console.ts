import {SysCall, SysCallsIndexes} from '../typing';
import { CPU } from '../../cpu';
import { OS } from '../'
import {ICommand} from '../../cpu/types'

export class OpenConsoleCall extends SysCall {
	callIndex = SysCallsIndexes.openConsole

	execute(os: OS, cpu: CPU, cmd: ICommand) {
		
	}
}