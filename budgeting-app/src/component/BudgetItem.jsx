import React from "react";
import {
  calculateSpentBudget,
  formatCurrency,
  formatPercentage,
} from "../helpers";

export const BudgetItem = ({ budget }) => {
  const { id, amount, color, name } = budget;
  const spent = calculateSpentBudget(id);
  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
    </div>
  );
};

export default BudgetItem;
