import * as fs from 'fs';
import * as path from 'path';
import {CPU} from '../cpu';
import {ICommand} from '../cpu/types';
import {SysCall, SysCallsIndexes} from './typing';
import {loadSysCallTable} from './utils';

export class OS {
	sysCallTable: { [call in SysCallsIndexes]?: SysCall };

	constructor(private cpu: CPU) {
		this.sysCallTable = loadSysCallTable();
	}

	loadMainProgram(): void {
		const code = fs.readFileSync(path.join(__dirname, '/../../code/main.uce'));

		for(let i = 0; i < code.length; i++) {
			this.cpu.memory[i] = code[i];
		}
	}

	sysCall(cmd: ICommand): void {

		const callIndex = this.cpu.memory.readUInt32LE(cmd.target);

		if(!this.sysCallTable[callIndex]){
			throw new Error('invalid call');
		}

		this.sysCallTable[callIndex].execute(this, this.cpu, cmd);
	}

}