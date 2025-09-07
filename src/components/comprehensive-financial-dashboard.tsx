import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeProfile } from "./employee-profile";
import { SalarySlipForm } from "./salary-slip-form";
import { ExpenseTracker } from "./expense-tracker";
import { MonthlySummary } from "./monthly-summary";
import { DataManagement } from "./data-management";
import { User, Calculator, Receipt, BarChart3 } from "lucide-react";

interface EmployeeInfo {
  name: string;
  employeeId: string;
  department: string;
  position: string;
}

interface SalaryData {
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
  nassitEmployer: number;
}

interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
}

// Helper functions for localStorage
const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage: ${error}`);
  }
};

const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : defaultValue;
  } catch (error) {
    console.error(`Error loading from localStorage: ${error}`);
    return defaultValue;
  }
};

export function ComprehensiveFinancialDashboard() {
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo>(() => 
    loadFromLocalStorage('employeeInfo', {
      name: "",
      employeeId: "",
      department: "",
      position: "",
    })
  );

  const [currentPeriod, setCurrentPeriod] = useState(() =>
    loadFromLocalStorage('currentPeriod', new Date().toISOString().slice(0, 7)) // YYYY-MM format
  );

  const [salaryData, setSalaryData] = useState<SalaryData>(() =>
    loadFromLocalStorage('salaryData', {
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
    })
  );

  const [expenses, setExpenses] = useState<ExpenseItem[]>(() =>
    loadFromLocalStorage('expenses', [])
  );

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage('employeeInfo', employeeInfo);
  }, [employeeInfo]);

  useEffect(() => {
    saveToLocalStorage('currentPeriod', currentPeriod);
  }, [currentPeriod]);

  useEffect(() => {
    saveToLocalStorage('salaryData', salaryData);
  }, [salaryData]);

  useEffect(() => {
    saveToLocalStorage('expenses', expenses);
  }, [expenses]);

  // Calculate totals
  const grossPay = Object.keys(salaryData)
    .filter(key => [
      'basicSalary', 'generalAllowance', 'medical', 'phoneAllowance', 
      'transport', 'rent', 'actingAllowance', 'overtime', 'incentivePay', 'bonus'
    ].includes(key))
    .reduce((sum, key) => sum + salaryData[key as keyof SalaryData], 0);

  const totalDeductions = Object.keys(salaryData)
    .filter(key => [
      'nassitEmployee', 'paye', 'salaryAdvance', 'productPhoneRepayment',
      'transportDeduction', 'rentDeduction', 'hubBalance', 'stockDeduction',
      'loanRepayment', 'expensesAdvanceOthers'
    ].includes(key))
    .reduce((sum, key) => sum + salaryData[key as keyof SalaryData], 0);

  const netPay = grossPay - totalDeductions;
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              Salary & Expense Tracking System
            </h1>
            <p className="text-muted-foreground text-lg">
              Complete payroll and expense management dashboard
            </p>
          </div>
          <DataManagement />
        </div>

        {/* Employee Profile - Always visible */}
        <EmployeeProfile
          employeeInfo={employeeInfo}
          onUpdateEmployee={setEmployeeInfo}
          currentPeriod={currentPeriod}
          onUpdatePeriod={setCurrentPeriod}
        />

        {/* Main Content Tabs */}
        <Tabs defaultValue="salary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="salary" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Salary Slip
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Summary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="salary" className="space-y-6">
            <SalarySlipForm
              salaryData={salaryData}
              onUpdateSalary={setSalaryData}
            />
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <ExpenseTracker
              expenses={expenses}
              onUpdateExpenses={setExpenses}
            />
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <MonthlySummary
              netPay={netPay}
              totalExpenses={totalExpenses}
              currentPeriod={currentPeriod}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}