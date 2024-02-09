import './App.css';
import ChatWindow from './components/ChatWindow';
import PageViewer from './components/PageViewer';

// // optinal iframe page can load as chat background as PageViewer
function App() {
  return (
    <div className="App">
      <ChatWindow></ChatWindow>
      <PageViewer />
    </div>
  );
}

export default App;
