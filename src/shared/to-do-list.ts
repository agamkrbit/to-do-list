export class ToDo {
    id: number;
    message: string;
    timestamp: string;
    priorty: string;
    status: string;
}

export const Priorities = ['High', 'Medium', 'Low'];
export const PrioritiesColor = {
    'High' : 'warn',
    'Medium': 'primary',
    'Low': ''
};

export const status = ['Done', 'Un-Done']; 