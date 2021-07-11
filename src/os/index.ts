import * as fs from 'fs';
import * as path from 'path';
import {CPU} from '../cpu';

export class OS {
	constructor(
		private cpu: CPU
	){}

	loadMainProgram() {
		const code = fs.readFileSync(path.join(__dirname, '/../../code/main.uce'));
		
		for(let i = 0; i < code.length; i++) {
			this.cpu.memory[i] = code[i];
		}
	}

}