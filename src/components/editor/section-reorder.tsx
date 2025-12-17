'use client'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SortableItem({ id, label }: { id: string; label: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center justify-between p-3 bg-secondary/50 rounded-md border mb-2 select-none">
      <span className="font-medium text-sm">{label}</span>
      <Button variant="ghost" size="icon" className="cursor-move h-8 w-8" {...attributes} {...listeners}>
         <GripVertical className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface SectionReorderProps {
    order: string[];
    onOrderChange: (newOrder: string[]) => void;
}

const SECTION_LABELS: Record<string, string> = {
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
};

export function SectionReorder({ order, onOrderChange }: SectionReorderProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        
        if (active.id !== over?.id) {
             const oldIndex = order.indexOf(active.id as string);
             const newIndex = order.indexOf(over?.id as string);
             onOrderChange(arrayMove(order, oldIndex, newIndex));
        }
    }

    // Filter out sections that might not be in our label map (like personalInfo if it slipped in)
    const validOrder = order.filter(id => SECTION_LABELS[id]);

    return (
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={validOrder}
            strategy={verticalListSortingStrategy}
          >
            {validOrder.map((id) => (
              <SortableItem key={id} id={id} label={SECTION_LABELS[id] || id} />
            ))}
          </SortableContext>
        </DndContext>
    );
}
