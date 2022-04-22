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

export function getRandomMember(team: Set<Person>): Person {
  const memberList = [...team];
  const maxInt = memberList.length;
  const randomInt = Math.floor(Math.random() * maxInt);
  return memberList[randomInt];
}

export function getMemberWhoWasLessChosen(
  team: Set<Person>,
  history: Person[]
): Person {
  const historyIsEmpty = !history || history.length === 0;
  if (historyIsEmpty) return getRandomMember(team);

  const countPerPerson: { [p: Person]: number } = {};
  history.forEach((person) => {
    if (!countPerPerson[person]) countPerPerson[person] = 0;
    countPerPerson[person]++;
  });

  const personPerCount: { [n: number]: Set<Person> } = {};
  for (const person of team) {
    const count = countPerPerson[person];
    if (!personPerCount[count]) personPerCount[count] = new Set();
    personPerCount[count].add(person);
  }

  const smallestCount = Object.keys(personPerCount)
    .map((key) => parseInt(key))
    .sort()[0];

  const leastChosenPeople = personPerCount[smallestCount];

  return getRandomMember(leastChosenPeople);
}
