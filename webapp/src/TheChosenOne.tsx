import { Person } from "./domain";
import styled from "@emotion/styled";

const Name = styled.div`
  font-size: 200px;
`;

interface Props {
  person?: Person;
}
export default function TheChosenOne({ person }: Props) {
  if (!person) {
    return null;
  }

  return <Name>{person}</Name>;
}
