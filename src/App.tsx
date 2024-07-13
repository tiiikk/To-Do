import Header from "./components/Header/Header.tsx";
import TemporaryDrawer from "./components/MenuDrawer/MenuDrawer.tsx";
import OutlinedCard from "./components/Tasks/Tasks.tsx";
function App() {
  return (
    <>
      <Header />
      <TemporaryDrawer />
      <OutlinedCard />
    </>
  );
}

export default App;
