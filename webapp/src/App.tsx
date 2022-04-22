import History from "./History";
import Team from "./Team";
import TheChosenOne from "./TheChosenOne";
import {
  addPerson,
  getPeopleFromStorage,
  getHistoryFromStorage,
  Person,
  getMemberWhoWasLessChosen,
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

const ShowChosenOne = styled(Button)`
  margin: 2rem 0;
`;
const ShowHistory = styled(Button)`
  font-size: 0.8rem;
  margin: 2rem 0;
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
    const theChosenOne = getMemberWhoWasLessChosen(team, history);
    setChosenMember(theChosenOne);
    setHistory([...history, theChosenOne]);
  }

  function handleShowHideHistory(): void {
    setShowHistory(!showHistory);
  }

  return (
    <Page>
      <Team team={team} add={handleAddMember} />

      <h3>The chosen one</h3>
      <TheChosenOne person={chosen} />
      <ShowChosenOne
        variant="contained"
        onSubmit={handleAssignRandomMember}
        onClick={handleAssignRandomMember}
      >
        Show me the chosen one...
      </ShowChosenOne>

      <ShowHistory variant="outlined" onClick={handleShowHideHistory}>
        (click to {showHistory ? "hide" : "show"} history)
      </ShowHistory>
      {showHistory ? <History history={history} /> : null}
    </Page>
  );
}

export default App;
