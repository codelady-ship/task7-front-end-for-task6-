// Same shape as the task6.mongodb Programmer model: { name, age, stack: { name } }
export interface Programmer {
  _id?: string;
  name: string;
  age: number;
  stack?: { name: string };
}

export const sampleProgrammers: Programmer[] = [
  { _id: "1", name: "Aysel", age: 24, stack: { name: "React" } },
  { _id: "2", name: "Murad", age: 28, stack: { name: "Node.js" } },
  { _id: "3", name: "Leyla", age: 22, stack: { name: "Next.js" } },
  { _id: "4", name: "Kamran", age: 31, stack: { name: "MongoDB" } },
];
