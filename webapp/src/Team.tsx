import { Person } from "./domain";
import styled from "@emotion/styled";
import { Box, TextField } from "@mui/material";
import { useState } from "react";

const Count = styled.div`
  font-size: 0.8rem;
`;

const Names = styled.div`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

interface Props {
  team: Set<Person>;
  add: (person: Person) => void;
}
export default function Team({ team, add }: Props) {
  const count = [...team].length;
  const names = [...team].sort().join(", ");

  const [name, setName] = useState<string | null>(null);
  function handleNameChange(event: any) {
    setName(event.target.value);
  }
  function handleSubmit(event: any) {
    event.preventDefault(); // Do not refresh page
    if (!name) return;

    add(name);
    setName("");
  }

  // const value = name === "" ? undefined : name;
  const value = name;
  console.dir(value);

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <h2>Team</h2>
      <Count>({count}) members</Count>
      <Names>{names}</Names>
      <div>
        <TextField
          label="Add a new member"
          value={value}
          onChange={handleNameChange}
        />
      </div>
    </Box>
  );
}
