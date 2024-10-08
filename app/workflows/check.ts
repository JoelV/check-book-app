import * as R from 'ramda';
export interface Check {
  id: number;
  number: string;
  date: string;
  amount: number;
  writtenTo: string;
  cleared: boolean;
}

function createRandomInt() {
  return Math.floor(Math.random() * 10000000);
}

let checks: Check[] = [
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

export const createCheck = async (createCheckData: Omit<Check, 'id'>): Promise<Check> => {
  const id = createRandomInt()
  const newCheck: Check = R.assoc('id', id, createCheckData);
  const updateChecks = R.append(newCheck, checks);
  checks = updateChecks;
  return newCheck;
}