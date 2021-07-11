import {CPU} from './cpu';
import {OS} from './os'

const cpu = new CPU();
const os = new OS(cpu);

os.loadMainProgram()
cpu.startExecution()