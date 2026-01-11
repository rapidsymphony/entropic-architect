import React from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import { useEditorStore, GRID_SIZE, COLS, ROWS } from '../../store/useEditorStore';

const RoomEditor = () => {
  const { items, selectedTool, addItem, removeItem, moveItem } = useEditorStore();

  const handleStageClick = (e) => {
    // Get mouse position relative to the grid
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();
    
    // Snap logic
    const x = Math.floor(pointer.x / GRID_SIZE) * GRID_SIZE;
    const y = Math.floor(pointer.y / GRID_SIZE) * GRID_SIZE;

    if (selectedTool === 'eraser') {
      removeItem(x, y);
    } else {
      addItem(x, y);
    }
  };

  const handleDragEnd = (e, id) => {
    // Snap on drop
    const x = Math.round(e.target.x() / GRID_SIZE) * GRID_SIZE;
    const y = Math.round(e.target.y() / GRID_SIZE) * GRID_SIZE;
    
    e.target.to({ x, y }); // Animate snap
    moveItem(id, x, y);
  };

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-300">
      <Stage
        width={COLS * GRID_SIZE}
        height={ROWS * GRID_SIZE}
        onMouseDown={handleStageClick}
        className="cursor-crosshair"
      >
        <Layer>
          {/* 1. Draw Grid Lines */}
          {[...Array(COLS + 1)].map((_, i) => (
            <Line
              key={`v-${i}`}
              points={[i * GRID_SIZE, 0, i * GRID_SIZE, ROWS * GRID_SIZE]}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          ))}
          {[...Array(ROWS + 1)].map((_, i) => (
            <Line
              key={`h-${i}`}
              points={[0, i * GRID_SIZE, COLS * GRID_SIZE, i * GRID_SIZE]}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          ))}

          {/* 2. Draw Items */}
          {items.map((item) => (
            <Rect
              key={item.id}
              x={item.x}
              y={item.y}
              width={GRID_SIZE}
              height={GRID_SIZE}
              fill={item.type === 'heater' ? '#ef4444' : '#374151'} // Red for heater, Dark Gray for wall
              draggable={selectedTool === 'cursor'} // Only draggable in cursor mode
              onDragEnd={(e) => handleDragEnd(e, item.id)}
              shadowBlur={item.type === 'heater' ? 15 : 0}
              shadowColor={item.type === 'heater' ? 'red' : 'black'}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default RoomEditor;