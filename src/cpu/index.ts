import {Command, Commands, ICommand, commandIndexes} from './types';
import {loadCommandTable} from './utils';
import {EventEmitter} from 'events';

const RAM_SIZE = 1024 * 1024; // 1 MB

export class CPU extends EventEmitter{
	public memory: Buffer;

	public IPPointer: number;
	public finished: boolean;

	private CommandTable: { [cmd in Commands]?: Command};

	constructor() {
		super()

		this.memory = Buffer.alloc(RAM_SIZE);
		this.finished = false;
		this.IPPointer = 0;
		this.CommandTable = loadCommandTable();	
	}

	public startExecution(): void {
		console.log('source', this.memory.slice(0, 65).toString('hex'));

		while(!this.finished) {
			const cmd = this.readCommand(this.IPPointer);
			this.IPPointer += this.executeCommand(cmd);
		}

		console.log('result', this.memory.readInt32LE(50));
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