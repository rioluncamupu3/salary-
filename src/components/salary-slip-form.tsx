import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Calculator, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface SalaryData {
  // Earnings
  basicSalary: number;
  generalAllowance: number;
  medical: number;
  phoneAllowance: number;
  transport: number;
  rent: number;
  actingAllowance: number;
  overtime: number;
  incentivePay: number;
  bonus: number;
  
  // Deductions
  nassitEmployee: number;
  paye: number;
  salaryAdvance: number;
  productPhoneRepayment: number;
  transportDeduction: number;
  rentDeduction: number;
  hubBalance: number;
  stockDeduction: number;
  loanRepayment: number;
  expensesAdvanceOthers: number;
  
  // Employer contributions
  nassitEmployer: number;
}

interface SalarySlipFormProps {
  salaryData: SalaryData;
  onUpdateSalary: (data: SalaryData) => void;
}

const defaultSalaryData: SalaryData = {
  basicSalary: 0,
  generalAllowance: 0,
  medical: 0,
  phoneAllowance: 0,
  transport: 0,
  rent: 0,
  actingAllowance: 0,
  overtime: 0,
  incentivePay: 0,
  bonus: 0,
  nassitEmployee: 0,
  paye: 0,
  salaryAdvance: 0,
  productPhoneRepayment: 0,
  transportDeduction: 0,
  rentDeduction: 0,
  hubBalance: 0,
  stockDeduction: 0,
  loanRepayment: 0,
  expensesAdvanceOthers: 0,
  nassitEmployer: 0,
};

export function SalarySlipForm({ salaryData, onUpdateSalary }: SalarySlipFormProps) {
  const [formData, setFormData] = useState<SalaryData>(salaryData || defaultSalaryData);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const updateField = (field: keyof SalaryData, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const grossPay = Object.keys(formData)
    .filter(key => [
      'basicSalary', 'generalAllowance', 'medical', 'phoneAllowance', 
      'transport', 'rent', 'actingAllowance', 'overtime', 'incentivePay', 'bonus'
    ].includes(key))
    .reduce((sum, key) => sum + formData[key as keyof SalaryData], 0);

  const totalDeductions = Object.keys(formData)
    .filter(key => [
      'nassitEmployee', 'paye', 'salaryAdvance', 'productPhoneRepayment',
      'transportDeduction', 'rentDeduction', 'hubBalance', 'stockDeduction',
      'loanRepayment', 'expensesAdvanceOthers'
    ].includes(key))
    .reduce((sum, key) => sum + formData[key as keyof SalaryData], 0);

  const netPay = grossPay - totalDeductions;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-SL', {
      style: 'currency',
      currency: 'SLL',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSave = () => {
    onUpdateSalary(formData);
    setIsEditing(false);
    toast({
      title: "Salary slip updated",
      description: `Net pay: ${formatCurrency(netPay)}`,
    });
  };

  const handleCancel = () => {
    setFormData(salaryData || defaultSalaryData);
    setIsEditing(false);
  };

  const InputField = ({ 
    label, 
    field, 
    icon 
  }: { 
    label: string; 
    field: keyof SalaryData; 
    icon?: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={field} className="flex items-center gap-2 text-sm">
        {icon}
        {label}
      </Label>
      {isEditing ? (
        <Input
          id={field}
          type="number"
          min="0"
          step="1"
          value={formData[field] || ""}
          onChange={(e) => updateField(field, parseInt(e.target.value) || 0)}
          placeholder="0"
          className="text-right"
        />
      ) : (
        <p className="p-2 bg-muted rounded-md text-right font-mono">
          {formatCurrency(formData[field])}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header with totals */}
      <Card className="shadow-card bg-gradient-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Salary Summary
            </span>
            {!isEditing ? (
              <Button variant="secondary" onClick={() => setIsEditing(true)}>
                Edit Salary
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="secondary" onClick={handleSave}>
                  Save
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm opacity-90">Gross Pay</span>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(grossPay)}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingDown className="h-5 w-5" />
                <span className="text-sm opacity-90">Total Deductions</span>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(totalDeductions)}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="h-5 w-5" />
                <span className="text-sm opacity-90">Net Pay</span>
              </div>
              <p className="text-3xl font-bold">{formatCurrency(netPay)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <TrendingUp className="h-5 w-5" />
              Earnings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputField label="Basic Salary" field="basicSalary" />
            <InputField label="General Allowance" field="generalAllowance" />
            <InputField label="Medical" field="medical" />
            <InputField label="Phone Allowance" field="phoneAllowance" />
            <InputField label="Transport" field="transport" />
            <InputField label="Rent" field="rent" />
            <InputField label="Acting Allowance" field="actingAllowance" />
            <InputField label="Overtime" field="overtime" />
            <InputField label="Incentive Pay" field="incentivePay" />
            <InputField label="Bonus" field="bonus" />
            
            <Separator />
            <div className="flex justify-between items-center font-semibold text-success">
              <span>Total Earnings:</span>
              <span className="font-mono">{formatCurrency(grossPay)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Deductions Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <TrendingDown className="h-5 w-5" />
              Deductions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputField label="NASSIT Employee" field="nassitEmployee" />
            <InputField label="PAYE" field="paye" />
            <InputField label="Salary Advance" field="salaryAdvance" />
            <InputField label="Product & Phone Repayment" field="productPhoneRepayment" />
            <InputField label="Transport Deduction" field="transportDeduction" />
            <InputField label="Rent Deduction" field="rentDeduction" />
            <InputField label="Hub Balance" field="hubBalance" />
            <InputField label="Stock Deduction" field="stockDeduction" />
            <InputField label="Loan Repayment" field="loanRepayment" />
            <InputField label="Expenses Advance/Others" field="expensesAdvanceOthers" />
            
            <Separator />
            <div className="flex justify-between items-center font-semibold text-warning">
              <span>Total Deductions:</span>
              <span className="font-mono">{formatCurrency(totalDeductions)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employer Contributions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Employer Contributions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InputField label="NASSIT Employer" field="nassitEmployer" />
        </CardContent>
      </Card>
    </div>
  );
}