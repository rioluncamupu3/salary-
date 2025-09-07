import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Receipt } from "lucide-react";

interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
}

interface ExpenseTrackerProps {
  expenses: ExpenseItem[];
  onUpdateExpenses: (expenses: ExpenseItem[]) => void;
}

const defaultExpenses: ExpenseItem[] = [
  { id: "1", name: "Internet", amount: 800 },
  { id: "2", name: "Netflix", amount: 260 },
  { id: "3", name: "Apple Music", amount: 250 },
  { id: "4", name: "Little Sis", amount: 350 },
  { id: "5", name: "Mummy", amount: 200 },
  { id: "6", name: "John", amount: 1000 },
  { id: "7", name: "Saving", amount: 1000 },
];

export function ExpenseTracker({ expenses, onUpdateExpenses }: ExpenseTrackerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localExpenses, setLocalExpenses] = useState<ExpenseItem[]>(
    expenses.length > 0 ? expenses : defaultExpenses
  );
  const { toast } = useToast();

  const totalExpenses = localExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-SL', {
      style: 'currency',
      currency: 'SLL',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const updateExpenseAmount = (id: string, amount: number) => {
    setLocalExpenses(prev => 
      prev.map(expense => 
        expense.id === id ? { ...expense, amount } : expense
      )
    );
  };

  const updateExpenseName = (id: string, name: string) => {
    setLocalExpenses(prev => 
      prev.map(expense => 
        expense.id === id ? { ...expense, name } : expense
      )
    );
  };

  const addExpense = () => {
    const newExpense: ExpenseItem = {
      id: Date.now().toString(),
      name: "New Expense",
      amount: 0,
    };
    setLocalExpenses(prev => [...prev, newExpense]);
  };

  const removeExpense = (id: string) => {
    setLocalExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const handleSave = () => {
    onUpdateExpenses(localExpenses);
    setIsEditing(false);
    toast({
      title: "Expenses updated",
      description: `Total monthly expenses: ${formatCurrency(totalExpenses)}`,
    });
  };

  const handleCancel = () => {
    setLocalExpenses(expenses.length > 0 ? expenses : defaultExpenses);
    setIsEditing(false);
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-primary" />
          Monthly Expenses
        </CardTitle>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit Expenses
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
        <div className="space-y-4">
          {/* Expenses List */}
          <div className="space-y-3">
            {localExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center gap-3">
                <div className="flex-1">
                  {isEditing ? (
                    <Input
                      value={expense.name}
                      onChange={(e) => updateExpenseName(expense.id, e.target.value)}
                      placeholder="Expense name"
                    />
                  ) : (
                    <Label className="font-medium">{expense.name}</Label>
                  )}
                </div>
                <div className="w-32">
                  {isEditing ? (
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      value={expense.amount || ""}
                      onChange={(e) => updateExpenseAmount(expense.id, parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="text-right"
                    />
                  ) : (
                    <p className="text-right font-mono text-warning font-semibold">
                      {formatCurrency(expense.amount)}
                    </p>
                  )}
                </div>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExpense(expense.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Add New Expense Button */}
          {isEditing && (
            <Button
              variant="outline"
              onClick={addExpense}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Expense Item
            </Button>
          )}

          <Separator />

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Monthly Expenses:</span>
            <span className="text-xl font-bold text-warning font-mono">
              {formatCurrency(totalExpenses)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}