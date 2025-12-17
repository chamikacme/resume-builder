import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export function PersonalInfoForm() {
    const { register } = useFormContext();

    return (
        <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                        id="fullName" 
                        {...register("personalInfo.fullName")} 
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        id="email" 
                        type="email"
                        {...register("personalInfo.email")} 
                        placeholder="john@example.com"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                        id="phone" 
                        {...register("personalInfo.phone")} 
                        placeholder="+1 234 567 890"
                    />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="address">Location</Label>
                    <Input 
                        id="address" 
                        {...register("personalInfo.address")} 
                        placeholder="San Francisco, CA"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input 
                        id="linkedin" 
                        {...register("personalInfo.linkedin")} 
                        placeholder="https://linkedin.com/in/username"
                    />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input 
                        id="github" 
                        {...register("personalInfo.github")} 
                        placeholder="https://github.com/username"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="website">Website / Portfolio</Label>
                    <Input 
                        id="website" 
                        {...register("personalInfo.website")} 
                        placeholder="https://yourwebsite.com"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea 
                    id="summary" 
                    {...register("personalInfo.summary")} 
                    placeholder="Experienced Full Stack Developer..."
                    className="h-32"
                />
            </div>
        </div>
    )
}
