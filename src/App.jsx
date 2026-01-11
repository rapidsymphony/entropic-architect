import RoomEditor from './components/Editor/RoomEditor';
import Toolbar from './components/Editor/Toolbar';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-8">
      
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Entropic <span className="text-indigo-600">Architect</span>
        </h1>
        <p className="text-gray-500">Gemini 3 Powered Thermal Optimization</p>
      </div>

      <div className="flex gap-6 items-start">
        {/* Left Side: Toolbar */}
        <Toolbar />

        {/* Right Side: The Canvas */}
        <RoomEditor />
      </div>

      <div className="text-sm text-gray-400">
        Grid: 16x12 • 1 Cell = 1 Meter
      </div>

    </div>
  );
}

export default App;