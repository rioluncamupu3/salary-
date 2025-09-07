import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Wallet, Calendar, PiggyBank } from "lucide-react";

interface MonthlySummaryProps {
  netPay: number;
  totalExpenses: number;
  currentPeriod: string;
}

export function MonthlySummary({ netPay, totalExpenses, currentPeriod }: MonthlySummaryProps) {
  const balanceRemaining = netPay - totalExpenses;
  const savingsRate = netPay > 0 ? (balanceRemaining / netPay) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-SL', {
      style: 'currency',
      currency: 'SLL',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatPeriod = (period: string) => {
    return new Date(period + "-01").toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Period Header */}
      <Card className="shadow-card bg-gradient-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Monthly Summary - {formatPeriod(currentPeriod)}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Net Pay (From Payslip)"
          value={formatCurrency(netPay)}
          icon={<TrendingUp className="h-6 w-6" />}
          variant="success"
        />
        <StatsCard
          title="Total Monthly Expenses"
          value={formatCurrency(totalExpenses)}
          icon={<TrendingDown className="h-6 w-6" />}
          variant="warning"
        />
        <StatsCard
          title="Balance Remaining"
          value={formatCurrency(balanceRemaining)}
          icon={<Wallet className="h-6 w-6" />}
          variant={balanceRemaining >= 0 ? "success" : "warning"}
        />
        <StatsCard
          title="Savings Rate"
          value={`${savingsRate.toFixed(1)}%`}
          icon={<PiggyBank className="h-6 w-6" />}
          variant={savingsRate > 20 ? "success" : "default"}
        />
      </div>

      {/* Financial Health Indicator */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Financial Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Monthly Cash Flow:</span>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={balanceRemaining >= 0 ? "default" : "destructive"}
                  className={balanceRemaining >= 0 ? "bg-success text-success-foreground" : ""}
                >
                  {balanceRemaining >= 0 ? "Positive" : "Negative"}
                </Badge>
                <span className={`font-mono font-semibold ${
                  balanceRemaining >= 0 ? "text-success" : "text-destructive"
                }`}>
                  {formatCurrency(Math.abs(balanceRemaining))}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span>Expense Ratio:</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {netPay > 0 ? `${((totalExpenses / netPay) * 100).toFixed(1)}%` : "0%"} of income
                </Badge>
              </div>
            </div>

            {balanceRemaining < 0 && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive font-medium">
                  ⚠️ You're spending more than you earn this month. Consider reviewing your expenses.
                </p>
              </div>
            )}

            {savingsRate > 20 && (
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <p className="text-sm text-success font-medium">
                  🎉 Great job! You're saving over 20% of your income this month.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Calculation Breakdown */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Calculation Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 font-mono">
            <div className="flex justify-between">
              <span>Final Net Pay:</span>
              <span className="text-success">{formatCurrency(netPay)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Monthly Expenses:</span>
              <span className="text-warning">- {formatCurrency(totalExpenses)}</span>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between font-bold text-lg">
              <span>Balance Remaining:</span>
              <span className={balanceRemaining >= 0 ? "text-success" : "text-destructive"}>
                {formatCurrency(balanceRemaining)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}