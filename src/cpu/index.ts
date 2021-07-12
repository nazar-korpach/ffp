import {OS} from '../os';
import {Command, Commands, ICommand, commandIndexes} from './types';
import {loadCommandTable} from './utils';

const RAM_SIZE = 1024 * 1024; // 1 MB

export class CPU{
	public memory: Buffer;

	public IPPointer: number;
	public finished: boolean;

	public os: OS; // TODO: make private

	private CommandTable: { [cmd in Commands]?: Command};

	constructor() {
		this.memory = Buffer.alloc(RAM_SIZE);
		this.finished = false;
		this.IPPointer = 0;
		this.CommandTable = loadCommandTable();
	}

	setOS(os: OS): void {
		this.os = os;
	}

	public startExecution(): void {
		if(!this.os) { // TODO: remove
			throw new Error('Set OS pls');
		}

		console.log('source', this.memory.slice(0, 34).toString('hex'));

		while(!this.finished) {
			const cmd = this.readCommand(this.IPPointer);
			this.IPPointer += this.executeCommand(cmd);
		}

	}

	private readCommand(pointer: number): ICommand { // TODO add validation
		const command = this.memory[pointer];
		if( !commandIndexes[command] ) {
			throw new Error('Invalid command');
		}
		const target = this.memory.readInt32LE(pointer + 1);
		const additional = this.memory.readInt32LE(pointer + 4 + 1);

		return {
			commandIndex: command,
			target,
			additional
		};
	}

	private executeCommand(cmd: ICommand): number {
		const commandExecutor = this.CommandTable[cmd.commandIndex];
		return commandExecutor.execute(this, cmd);
	}
}