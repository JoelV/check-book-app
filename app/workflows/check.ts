export interface Check {
  id: number;
  number: string;
  date: string;
  amount: number;
  writtenTo: string;
  cleared: boolean;
}

const checks: Check[] = [
  {
    id: 1234,
    number: "181",
    date: '10/02/2024',
    amount: 445.5,
    writtenTo: 'PCC',
    cleared: false,
  },  
] 

export const getChecks = async (): Promise<Check[]> => {
  return checks;
}