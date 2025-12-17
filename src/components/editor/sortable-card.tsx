'use client';

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

export function SortableCard({ id, children }: SortableItemProps) {
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
    <div ref={setNodeRef} style={style} className="relative group">
      <div 
        {...attributes} 
        {...listeners} 
        className="absolute left-1/2 -top-3 -translate-x-1/2 cursor-move opacity-0 group-hover:opacity-100 transition-opacity bg-white border rounded-full p-1 shadow-sm z-10"
      >
         <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      {children}
    </div>
  );
}
