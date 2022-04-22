import { getCountPerPerson, Person } from "./domain";

interface Props {
  history: Person[];
}
export default function History({ history }: Props) {
  const countPerPerson = getCountPerPerson(history);

  return (
    <div>
      <h3>History</h3>
      <p>Per person</p>
      <ul>
        {countPerPerson.map(([person, count]) => (
          <li>
            {person}: {count}
          </li>
        ))}
      </ul>
      <p>{history ? history.join(", ") : "no history yet..."}</p>
    </div>
  );
}
