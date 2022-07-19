import History from "./History";
import Team from "./Team";
import TheChosenOne from "./TheChosenOne";
import {
  addPerson,
  getPeopleFromStorage,
  getHistoryFromStorage,
  Person,
  undoLastChoice,
  retryAssignment,
  assign,
} from "./domain";
import storage from "./localStorage";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useState } from "react";

const Page = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;

  margin: 0 auto;
  padding: 0 2rem;
  max-width: 800px;
`;

const StyledButton = styled(Button)`
  margin: 2rem 0;
`;
const SecondaryButton = styled(StyledButton)`
  font-size: 0.8rem;
`;

const Buttons = styled.div`
  display: flex;
  column-gap: 1rem;
`;

function App() {
  const [chosen, setChosenMember] = useState<Person | undefined>();
  const [team, setTeam] = useState(getPeopleFromStorage());
  if (team) storage.people.set(JSON.stringify([...team]));

  const [history, setHistory] = useState(getHistoryFromStorage());
  if (history) storage.history.set(JSON.stringify(history));

  const [showHistory, setShowHistory] = useState(false);

  const handleAddMember = (person: Person): void => {
    console.log(`Adding a new member: ${person}`);
    setTeam(addPerson(team, person));
  };

  function handleAssignRandomMember(): void {
    const [theChosenOne, updatedHistory] = assign(team, history);
    setChosenMember(theChosenOne);
    setHistory(updatedHistory);
  }

  function handleShowHideHistory(): void {
    setShowHistory(!showHistory);
  }

  function handleUndoLastChoice(): void {
    const updatedHistory = undoLastChoice(history);
    setHistory(updatedHistory);
  }

  function handleRetryAssignment(): void {
    const [theChosenOne, updatedHistory] = retryAssignment(team, history);
    setChosenMember(theChosenOne);
    setHistory(updatedHistory);
  }

  return (
    <Page>
      <Team team={team} add={handleAddMember} />

      <h3>The chosen one</h3>
      <TheChosenOne person={chosen} />
      <StyledButton
        variant="contained"
        onSubmit={handleAssignRandomMember}
        onClick={handleAssignRandomMember}
      >
        Show me the chosen one...
      </StyledButton>

      <Buttons>
        <SecondaryButton variant="outlined" onClick={handleShowHideHistory}>
          {showHistory ? "hide" : "show"} history
        </SecondaryButton>
        <SecondaryButton variant="outlined" onClick={handleRetryAssignment}>
          retry assignment
        </SecondaryButton>
        <SecondaryButton variant="outlined" onClick={handleUndoLastChoice}>
          undo last choice
        </SecondaryButton>
      </Buttons>
      {showHistory ? <History history={history} /> : null}
    </Page>
  );
}

export default App;
