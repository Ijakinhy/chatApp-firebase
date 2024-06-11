import Chat from "./components/chats/Chats";
import Details from "./components/details/Details";
import List from "./components/list/List";

function App() {
  return (
    <div className="container">
      <List />
      <Chat />
      <Details />
    </div>
  );
}

export default App;
