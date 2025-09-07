import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User, Briefcase, Calendar, Hash } from "lucide-react";

interface EmployeeInfo {
  name: string;
  employeeId: string;
  department: string;
  position: string;
}

interface EmployeeProfileProps {
  employeeInfo: EmployeeInfo;
  onUpdateEmployee: (info: EmployeeInfo) => void;
  currentPeriod: string;
  onUpdatePeriod: (period: string) => void;
}

export function EmployeeProfile({ 
  employeeInfo, 
  onUpdateEmployee, 
  currentPeriod, 
  onUpdatePeriod 
}: EmployeeProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(employeeInfo);
  const [period, setPeriod] = useState(currentPeriod);
  const { toast } = useToast();

  const handleSave = () => {
    onUpdateEmployee(formData);
    onUpdatePeriod(period);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Employee information has been saved successfully.",
    });
  };

  const handleCancel = () => {
    setFormData(employeeInfo);
    setPeriod(currentPeriod);
    setIsEditing(false);
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Employee Information
        </CardTitle>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-gradient-primary hover:bg-primary-hover">
              Save
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Employee Name
            </Label>
            {isEditing ? (
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter employee name"
              />
            ) : (
              <p className="p-2 bg-muted rounded-md">{employeeInfo.name || "Not set"}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="employeeId" className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Employee ID
            </Label>
            {isEditing ? (
              <Input
                id="employeeId"
                value={formData.employeeId}
                onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
                placeholder="Enter employee ID"
              />
            ) : (
              <p className="p-2 bg-muted rounded-md">{employeeInfo.employeeId || "Not set"}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="department" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Department
            </Label>
            {isEditing ? (
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                placeholder="Enter department"
              />
            ) : (
              <p className="p-2 bg-muted rounded-md">{employeeInfo.department || "Not set"}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="position" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Position
            </Label>
            {isEditing ? (
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                placeholder="Enter position"
              />
            ) : (
              <p className="p-2 bg-muted rounded-md">{employeeInfo.position || "Not set"}</p>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label htmlFor="period" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Current Period (Month/Year)
          </Label>
          {isEditing ? (
            <Input
              id="period"
              type="month"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="max-w-xs"
            />
          ) : (
            <p className="p-2 bg-muted rounded-md max-w-xs">
              {new Date(currentPeriod + "-01").toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}