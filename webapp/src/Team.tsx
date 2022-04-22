import AddTeamMember from "./AddMember";
import { Person } from "./domain";
import styled from "styled-components";

const Count = styled.div`
  font-size: 0.8rem;
`;

const Names = styled.div`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

interface Props {
  team: Set<Person>;
  add: (person: Person) => void;
}
export default function Team({ team, add }: Props) {
  const count = [...team].length;
  const names = [...team].sort().join(", ");

  return (
    <div>
      <h2>Team</h2>
      <Count>({count}) members</Count>
      <Names>{names}</Names>
      <AddTeamMember add={add} />
    </div>
  );
}
