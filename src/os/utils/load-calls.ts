import {SysCall, SysCallsIndexes} from '../typing';
import * as SysCalls from '../sys-calls';

export function loadSysCallTable(): { [call in SysCallsIndexes]?: SysCall } {
	const calls = <SysCall[]> Object.values(SysCalls).map(call => new call() );
	const indexToCallTable: { [call in SysCallsIndexes]?: SysCall } = {}
	
	calls.forEach(call => {
		indexToCallTable[call.callIndex] = call;
	})
	return indexToCallTable
}