import {Command, Commands, ICommand, commandIndexes} from './types';
import {loadCommandTable} from './utils';

const RAM_SIZE = 1024 * 1024 * 1024; // 1 MB

export class CPU {
	public memory: Buffer;

	public IPPointer: number;
	public finished: boolean;

	private CommandTable: { [cmd in Commands]?: Command};

	constructor() {
		this.memory = Buffer.alloc(RAM_SIZE);
		this.finished = false;
		this.IPPointer = 0;
		this.CommandTable = loadCommandTable();
		// load code
		this.memory[0] = 1; // mov tmp a
		this.memory.writeInt32LE(54, 1);
		this.memory.writeInt32LE(58, 5);
		this.memory[9] = 2; // add a b
		this.memory.writeInt32LE(58, 10);
		this.memory.writeInt32LE(62, 14);
		this.memory[18] = 1; // mov b tmp
		this.memory.writeInt32LE(62, 19);
		this.memory.writeInt32LE(54, 23);
		this.memory[27] = 3; // sub i one
		this.memory.writeInt32LE(50, 28);
		this.memory.writeInt32LE(46, 32);
		this.memory[36] = 6; // jmp 0 i
		this.memory.writeInt32LE(0, 37);
		this.memory.writeInt32LE(50, 41);
		this.memory[45] = 7; // end
		this.memory.writeInt32LE(1, 46);  // one
		this.memory.writeInt32LE(20, 50); // i
		this.memory.writeInt32LE(0, 54);  // tmp
		this.memory.writeInt32LE(1, 58);  // a
		this.memory.writeInt32LE(1, 62);  // b
	}

	public startExecution(): void {
		console.log('source', this.memory.slice(0, 66).toString('hex'));
		while (!this.finished) {
			const cmd = this.readCommand(this.IPPointer);
			this.IPPointer += this.executeCommand(cmd);;
		}
		console.log('result', this.memory.readInt32LE(58));
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