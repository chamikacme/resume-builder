'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, FileText, Trash2, Copy, Pencil, Loader2, FileEdit } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteResume, duplicateResume, updateResume } from "@/app/actions/resume";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";

interface Resume {
    id: string;
    title: string;
    updatedAt: Date;
}

export function ResumeCard({ resume }: { resume: Resume }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDuplicating, setIsDuplicating] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
    const [newTitle, setNewTitle] = useState(resume.title);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteResume(resume.id);
            toast.success("Resume deleted");
        } catch (error) {
            toast.error("Failed to delete resume");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDuplicate = async () => {
        setIsDuplicating(true);
        try {
            await duplicateResume(resume.id);
            toast.success("Resume duplicated");
        } catch (error) {
            toast.error("Failed to duplicate resume");
        } finally {
            setIsDuplicating(false);
        }
    };

    const handleRename = async () => {
        if (!newTitle.trim()) {
            toast.error("Resume title cannot be empty");
            return;
        }
        
        if (newTitle === resume.title) {
            setIsRenameDialogOpen(false);
            return;
        }

        setIsRenaming(true);
        try {
            await updateResume(resume.id, { title: newTitle.trim() });
            toast.success("Resume renamed");
            setIsRenameDialogOpen(false);
        } catch (error) {
            toast.error("Failed to rename resume");
        } finally {
            setIsRenaming(false);
        }
    };

    return (
        <Card className="hover:shadow-md transition-shadow group relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium line-clamp-1 pr-8">
                    {resume.title}
                </CardTitle>
                <div className="absolute right-2 top-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/editor/${resume.id}`} className="cursor-pointer">
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setIsRenameDialogOpen(true)} className="cursor-pointer">
                                <FileEdit className="mr-2 h-4 w-4" />
                                Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDuplicate} disabled={isDuplicating} className="cursor-pointer">
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                            </DropdownMenuItem>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600 focus:text-red-600 cursor-pointer">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your resume.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                                            {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>
                <Link href={`/editor/${resume.id}`} className="flex flex-col items-center justify-center py-8 space-y-4 hover:opacity-80 transition-opacity cursor-pointer">
                     <div className="w-16 h-20 bg-muted border rounded shadow-sm flex items-center justify-center">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                     </div>
                     <span className="text-xs text-muted-foreground">
                        Edited {new Date(resume.updatedAt).toLocaleDateString()}
                     </span>
                </Link>
            </CardContent>

            {/* Rename Dialog */}
            <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rename Resume</DialogTitle>
                        <DialogDescription>
                            Enter a new name for your resume.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Resume Title</Label>
                            <Input
                                id="title"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleRename();
                                    }
                                }}
                                placeholder="Enter resume title"
                                autoFocus
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)} disabled={isRenaming}>
                            Cancel
                        </Button>
                        <Button onClick={handleRename} disabled={isRenaming || !newTitle.trim()}>
                            {isRenaming ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Rename
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    )
}
