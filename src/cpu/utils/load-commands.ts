import {Command, Commands} from '../types';
import * as CommandList from '../commands';

export function loadCommandTable(): { [command in Commands]?: Command} {
	const cmds = <Command[]> Object.values(CommandList).map(cmd => new cmd()); 
	const indexToCmdTable: { [command in Commands]?: Command} = {};

	cmds.forEach((cmd) => {
		indexToCmdTable[ cmd.command ] = cmd;
	})
	
	return indexToCmdTable;
}