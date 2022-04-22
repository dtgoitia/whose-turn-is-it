import { Person } from "./domain";
import { useState } from "react";

interface AddTeamMemberProps {
  add: (person: Person) => void;
}
function AddTeamMember({ add }: AddTeamMemberProps) {
  const [name, setName] = useState<string>("");
  function handleNameChange(event: any) {
    setName(event.target.value);
  }
  return (
    <div>
      <div>Add a new member:</div>
      <input
        type="text"
        value={name ? name : undefined}
        placeholder="name"
        onChange={handleNameChange}
      />
      {/* TODO: support ENTER to submit */}
      <button onClick={() => add(name)} type="submit">
        Add
      </button>
    </div>
  );
}

export default AddTeamMember;
