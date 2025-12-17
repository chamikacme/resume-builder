import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFormContext, useFieldArray } from "react-hook-form";
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
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { SortableCard } from "../sortable-card";
import { ResumeContent } from "@/lib/validations";

export function VolunteeringForm() {
    const { control, register } = useFormContext<ResumeContent>();
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "volunteering"
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

    const addVolunteering = () => {
        append({ 
            id: crypto.randomUUID(), 
            role: "", 
            organization: "", 
            startDate: "", 
            endDate: "", 
            current: false, 
            description: "" 
        });
    };

    return (
        <div className="space-y-4">
             <Button onClick={addVolunteering} className="w-full" variant="outline" type="button">
                <Plus className="mr-2 h-4 w-4" /> Add Volunteering
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
                                        Role {index + 1}
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100" onClick={() => remove(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-2">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Role</Label>
                                            <Input {...register(`volunteering.${index}.role`)} placeholder="Volunteer" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Organization</Label>
                                            <Input {...register(`volunteering.${index}.organization`)} placeholder="Non-Profit Org" />
                                        </div>
                                    </div>
                                     <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Start Date</Label>
                                            <Input {...register(`volunteering.${index}.startDate`)} placeholder="MM/YYYY" />
                                        </div>
                                         <div className="space-y-2">
                                            <Label>End Date</Label>
                                            <Input 
                                                {...register(`volunteering.${index}.endDate`)} 
                                                placeholder="MM/YYYY" 
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Textarea 
                                            {...register(`volunteering.${index}.description`)}
                                            className="h-24 text-sm"
                                            placeholder="Description of activities..."
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
