import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useFormContext, useFieldArray } from "react-hook-form";
import { ResumeContent } from "@/lib/validations";

import {
    DndContext, 
    closestCenter, 
    KeyboardSensor, 
    PointerSensor, 
    useSensor, 
    useSensors,
    DragEndEvent
} from "@dnd-kit/core";
import {
    SortableContext, 
    sortableKeyboardCoordinates, 
    rectSortingStrategy // Better for flowing/grid layouts like badges
} from "@dnd-kit/sortable";
import { SortableBadge } from "../sortable-badge";

export function SkillsForm() {
    const { control } = useFormContext<ResumeContent>();
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "skills"
    });
    const [inputValue, setInputValue] = useState("");

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        
        if (active.id !== over?.id) {
             const oldIndex = fields.findIndex(item => item.id === active.id);
             const newIndex = fields.findIndex(item => item.id === over?.id);
             move(oldIndex, newIndex);
        }
    };

    const addSkill = () => {
        if (!inputValue.trim()) return;
        append({ id: crypto.randomUUID(), name: inputValue.trim() });
        setInputValue("");
    };

    return (
        <div className="space-y-4">
             <div className="flex gap-2">
                <Input 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    onKeyDown={(e) => {
                         if (e.key === 'Enter') {
                             e.preventDefault(); // Prevent form submission
                             addSkill();
                         }
                    }}
                    placeholder="Add a skill (e.g. React)" 
                />
                <Button onClick={addSkill} disabled={!inputValue.trim()} type="button">Add</Button>
             </div>
             
             <DndContext 
                sensors={sensors} 
                collisionDetection={closestCenter} 
                onDragEnd={handleDragEnd}
            >
                <SortableContext 
                    items={fields} 
                    strategy={rectSortingStrategy} // Use rectSortingStrategy for wrapped lists
                >
                    <div className="flex flex-wrap gap-2">
                        {fields.map((item, index) => (
                            <SortableBadge key={item.id} id={item.id}>
                                <Badge variant="secondary" className="pl-3 pr-1 py-1 text-sm bg-secondary hover:bg-secondary/80 select-none">
                                    {item.name}
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-4 w-4 ml-1 rounded-full p-0 hover:bg-muted-foreground/20" 
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent drag start when clicking delete
                                            remove(index);
                                        }}
                                        onPointerDown={(e) => e.stopPropagation()} // Important to prevent drag start on touch/click
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </Badge>
                            </SortableBadge>
                        ))}
                    </div>
                </SortableContext>
             </DndContext>
        </div>
    )
}
