// Same shape as the task6.mongodb Programmer model: { name, age, stack: { name } }
export interface Programmer {
  _id?: string;
  name: string;
  age: number;
  stack?: { name: string };
}

/** Shown when PROGRAMMERS_API_URL is not set or the API cannot be reached. Fictional people. */
export const sampleProgrammers: Programmer[] = [
  { _id: "s1", name: "Aysel", age: 24, stack: { name: "React" } },
  { _id: "s2", name: "Murad", age: 28, stack: { name: "Node.js" } },
  { _id: "s3", name: "Leyla", age: 22, stack: { name: "Next.js" } },
  { _id: "s4", name: "Kamran", age: 31, stack: { name: "MongoDB" } },
  { _id: "s5", name: "Nigar", age: 26, stack: { name: "React" } },
  { _id: "s6", name: "Elvin", age: 35, stack: { name: "Node.js" } },
];

export const STACK_SUGGESTIONS = ["React", "Next.js", "Node.js", "MongoDB", "Vue", "Angular", "Python", "Java"];
