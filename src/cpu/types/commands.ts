import {CPU} from '..'

export enum Commands {
	mov = 1,
	add = 2,
	sub = 3,
	mul = 4,
	div = 5,
	jmp = 6,
	end = 7,
	cpm = 8,
	set = 9,
	adr = 10,
	get = 11,
	sys = 12
}

export const commandIndexes = {
	1: 'mov',
	2: 'add',
	3: 'sub',
	4: 'mul',
	5: 'div',
	6: 'jmp',
	7: 'end',
	8: 'cpm',
	9: 'set',
	10: 'adr',
	11: 'get',
	12: 'sys'
}

export interface ICommand {
	commandIndex: Commands;
	// TODO rename
	target: number;
	additional: number;
}

export abstract class Command {
	abstract command: Commands;

	abstract execute(cpu: CPU, cmd: ICommand): number
}