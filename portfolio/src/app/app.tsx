import Header from './components/Header';
import ToolsSection from './components/ToolsSection';

export function App() {
  return (
    <div className="text-white relative flex flex-col min-h-screen justify-center items-center" style={{ background: 'transparent' }}>
      <Header />
      <ToolsSection />
    </div>
  );
}

export default App;