import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    arrayMove, 
    SortableContext, 
    sortableKeyboardCoordinates, 
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { SortableCard } from "../sortable-card";

export function ExperienceForm() {
    const { control, register, watch } = useFormContext<ResumeContent>();
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "experience"
    });

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

    const addExperience = () => {
        append({ 
            id: crypto.randomUUID(), 
            title: "", 
            company: "", 
            startDate: "", 
            endDate: "", 
            current: false, 
            description: "" 
        });
    };

    return (
        <div className="space-y-4">
             <Button onClick={addExperience} className="w-full" variant="outline" type="button">
                <Plus className="mr-2 h-4 w-4" /> Add Experience
             </Button>
             
             <DndContext 
                sensors={sensors} 
                collisionDetection={closestCenter} 
                onDragEnd={handleDragEnd}
            >
                <SortableContext 
                    items={fields} 
                    strategy={verticalListSortingStrategy}
                >
                    {fields.map((item, index) => (
                        <SortableCard key={item.id} id={item.id}>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <div className="font-semibold text-sm">
                                        Position {index + 1}
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100" onClick={() => remove(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-2">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Job Title</Label>
                                            <Input {...register(`experience.${index}.title`)} placeholder="Software Engineer" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Company</Label>
                                            <Input {...register(`experience.${index}.company`)} placeholder="Acme Inc." />
                                        </div>
                                    </div>
                                     <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Start Date</Label>
                                            <Input {...register(`experience.${index}.startDate`)} placeholder="MM/YYYY" />
                                        </div>
                                         <div className="space-y-2">
                                            <Label>End Date</Label>
                                            <Input 
                                                {...register(`experience.${index}.endDate`)} 
                                                placeholder="MM/YYYY" 
                                                disabled={watch(`experience.${index}.current`)}
                                            />
                                        </div>
                                    </div>
                                    <FormSwitchControl index={index} control={control} />
                                    
                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Textarea 
                                            {...register(`experience.${index}.description`)}
                                            className="h-32 text-sm"
                                            placeholder="• Led development of...&#10;• Improved performance by..."
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </SortableCard>
                    ))}
                </SortableContext>
             </DndContext>
        </div>
    )
}

import { Controller, Control } from "react-hook-form";

function FormSwitchControl({ index, control }: { index: number, control: Control<ResumeContent> }) {
    return (
        <Controller
            control={control}
            name={`experience.${index}.current`}
            render={({ field }) => (
                <div className="flex items-center space-x-2">
                    <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id={`current-${index}`}
                    />
                    <Label htmlFor={`current-${index}`}>I currently work here</Label>
                </div>
            )}
        />
    );
}
