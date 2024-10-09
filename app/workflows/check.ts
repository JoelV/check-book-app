import * as R from 'ramda';
// update the check interface to represent display to represent strings for the display
export interface Check {
  id: number;
  number: string;
  date: string;
  amount: number;
  writtenTo: string;
  cleared: boolean;
  userId: string;
}

type CheckCleared =  'true' | null;


export interface CheckEntity {
  id: number;
  number: string;
  date: Date;
  amount: number;
  writtenTo: string;
  cleared: boolean;
  userId: string;  
}

export interface CreateCheck {
  checkNumber: string;
  checkDate: string;
  checkAmount: string;
  checkWrittenTo: string;
  checkCleared: CheckCleared;
  userId: string
}

function createRandomInt() {
  return Math.floor(Math.random() * 10000000);
}

let checks: Check[] = [ // use checkEntity
  {
    id: 1234,
    number: "181",
    date: '10/02/2024',
    amount: 445.5,
    writtenTo: 'PCC',
    cleared: false,
    userId: 'userId'
  },  
] 

export const getChecks = async (): Promise<Check[]> => {
  //map checkEntity to Check
  return checks;
}

export const createCheck = async (createCheckData: CreateCheck): Promise<Check> => {
  const id = createRandomInt() // this will get created by the db eventually
  const newCheck: Check = {  // use checkEntity
    id, 
    number: createCheckData.checkNumber,
    date: createCheckData.checkDate,
    amount: parseFloat(createCheckData.checkAmount),
    writtenTo: createCheckData.checkWrittenTo,
    userId: createCheckData.userId,
    cleared: createCheckData.checkCleared === 'true' 
  }

  const updateChecks = R.append<Check>(newCheck, checks);
  checks = updateChecks;
  return newCheck;
}

export const validateCheckCleared = (v: unknown): v is CheckCleared => {
  if(v === 'true' || v === null ) return true 
  return false;
}