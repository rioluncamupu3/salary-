import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Database, Trash2 } from "lucide-react";
import { useState } from "react";

export function DataManagement() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const clearAllData = () => {
    try {
      // Clear all application data from localStorage
      localStorage.removeItem('employeeInfo');
      localStorage.removeItem('currentPeriod');
      localStorage.removeItem('salaryData');
      localStorage.removeItem('expenses');
      
      toast({
        title: "Data cleared",
        description: "All saved data has been removed. Refresh the page to see changes.",
      });
      
      setOpen(false);
    } catch (error) {
      console.error('Error clearing data:', error);
      toast({
        title: "Error",
        description: "Failed to clear data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportData = () => {
    try {
      // Collect all data from localStorage
      const data = {
        employeeInfo: JSON.parse(localStorage.getItem('employeeInfo') || '{}'),
        currentPeriod: localStorage.getItem('currentPeriod'),
        salaryData: JSON.parse(localStorage.getItem('salaryData') || '{}'),
        expenses: JSON.parse(localStorage.getItem('expenses') || '[]'),
      };
      
      // Create a downloadable file
      const dataStr = JSON.stringify(data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `pocket-pocket-data-${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: "Data exported",
        description: "Your data has been exported successfully.",
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Export failed",
        description: "Could not export data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
        onClick={exportData}
      >
        <Database className="h-4 w-4" />
        Export Data
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            Clear Data
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear all saved data?</DialogTitle>
            <DialogDescription>
              This action will remove all your saved information including employee details, salary data, and expenses.
              This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={clearAllData}>Delete All Data</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}