import React from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { MousePointer2, BrickWall, Flame, Eraser, Trash2 } from 'lucide-react';

const tools = [
  { id: 'cursor', label: 'Move', icon: MousePointer2, color: 'text-blue-500' },
  { id: 'wall', label: 'Add Wall', icon: BrickWall, color: 'text-gray-700' },
  { id: 'heater', label: 'Add Heater', icon: Flame, color: 'text-red-500' },
  { id: 'eraser', label: 'Eraser', icon: Eraser, color: 'text-gray-400' },
];

const Toolbar = () => {
  const { selectedTool, setTool, resetBoard } = useEditorStore();

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-xl shadow-md h-fit">
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Tools</h2>
      
      {tools.map((t) => (
        <button
          key={t.id}
          onClick={() => setTool(t.id)}
          className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
            selectedTool === t.id
              ? 'bg-indigo-50 border-indigo-200 border text-indigo-700 font-medium'
              : 'hover:bg-gray-50 text-gray-600'
          }`}
        >
          <t.icon className={`w-5 h-5 ${selectedTool === t.id ? 'text-indigo-600' : t.color}`} />
          <span>{t.label}</span>
        </button>
      ))}

      <div className="h-px bg-gray-200 my-2" />

      <button 
        onClick={resetBoard}
        className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 className="w-5 h-5" />
        <span>Clear Board</span>
      </button>
    </div>
  );
};

export default Toolbar;