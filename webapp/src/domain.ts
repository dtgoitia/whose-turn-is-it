import storage from "./localStorage";

export type Person = string;
export function getPeopleFromStorage(): Set<Person> {
  if (!storage.people.exists()) return new Set();

  const jsonString = storage.people.read();
  if (!jsonString) return new Set();

  const peopleList = JSON.parse(jsonString);
  if (!peopleList) return new Set();

  const people = new Set<Person>(peopleList);
  return people;
}

export function getHistoryFromStorage(): Person[] {
  if (!storage.history.exists()) {
    return [];
  }

  const jsonString = storage.history.read();
  if (!jsonString) {
    return [];
  }

  return JSON.parse(jsonString);
}

export function addPerson(team: Set<Person>, person: Person): Set<Person> {
  return new Set([...team, person]);
}

type PersonCount = [Person, number];
export function getCountPerPerson(history: Person[]): PersonCount[] {
  const countPerPerson: { [p: Person]: number } = {};
  history.forEach((person) => {
    if (!countPerPerson[person]) countPerPerson[person] = 0;
    countPerPerson[person]++;
  });

  const result: PersonCount[] = [];
  for (const person in countPerPerson) {
    const count = countPerPerson[person];
    result.push([person, count]);
  }

  return result;
}

function getRandomMember(team: Set<Person>): Person {
  const memberList = [...team];
  const maxInt = memberList.length;
  const randomInt = Math.floor(Math.random() * maxInt);
  return memberList[randomInt];
}

function getMemberWhoWasLessChosen(
  team: Set<Person>,
  history: Person[]
): Person {
  const countPerPerson: { [p: Person]: number } = {};
  team.forEach((person) => (countPerPerson[person] = 0));
  history.forEach((person) => countPerPerson[person]++);

  const personPerCount: { [n: number]: Set<Person> } = {};
  for (const person of team) {
    const count = countPerPerson[person];
    if (!personPerCount[count]) personPerCount[count] = new Set();
    personPerCount[count].add(person);
  }

  const counts = Object.keys(personPerCount).map((key) => parseInt(key));
  const smallestCount = Math.min(...counts);

  const leastChosenPeople = personPerCount[smallestCount];

  return getRandomMember(leastChosenPeople);
}

export function addMemberToHistory(
  history: Person[],
  member: Person
): Person[] {
  return [...history, member];
}

export function undoLastChoice(history: Person[]): Person[] {
  return history.slice(0, -1);
}

export function assign(
  team: Set<Person>,
  history: Person[]
): [Person, Person[]] {
  const chosenOne = getMemberWhoWasLessChosen(team, history);
  const updatedHistory = addMemberToHistory(history, chosenOne);
  return [chosenOne, updatedHistory];
}

export function retryAssignment(
  team: Set<Person>,
  history: Person[]
): [Person, Person[]] {
  const previousHistory = undoLastChoice(history);
  return assign(team, previousHistory);
}
