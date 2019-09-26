export class Salary {
    constructor(
        public id: string,
        public payRollRN: string, // payroll Refference Number
        public basicSalary: string,
        public allowances: string,
        public deductions: string,
        public ETF: string,
        public EPF: string,
        public PAYE: string
        ) {

    }
}