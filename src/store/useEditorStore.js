import { create } from 'zustand';

// Grid Configuration
export const GRID_SIZE = 50; // 50px per cell
export const COLS = 16;      // 800px width
export const ROWS = 12;      // 600px height

export const useEditorStore = create((set, get) => ({
  items: [], // Stores { id, type, x, y }
  selectedTool: 'wall', // Default tool

  setTool: (tool) => set({ selectedTool: tool }),

  addItem: (x, y) => {
    const { selectedTool, items } = get();
    // Prevent adding if cursor mode
    if (selectedTool === 'cursor' || selectedTool === 'eraser') return;

    // Check if cell is already occupied
    const exists = items.find((i) => i.x === x && i.y === y);
    if (exists) return;

    set((state) => ({
      items: [
        ...state.items,
        {
          id: `${x}-${y}-${Date.now()}`,
          type: selectedTool, // 'wall' or 'heater'
          x,
          y,
        },
      ],
    }));
  },

  removeItem: (x, y) => {
    set((state) => ({
      items: state.items.filter((i) => i.x !== x || i.y !== y),
    }));
  },

  moveItem: (id, x, y) => {
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, x, y } : i)),
    }));
  },

  // Helper to clear board
  resetBoard: () => set({ items: [] }),
}));