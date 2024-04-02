import React from "react";
import ExpenseItem from "./ExpenseItem";

export const Table = ({ expenses, showBudget = true }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {["Name", "Amount", "Date", showBudget ? "budget" : "", ""].map(
              (item, index) => {
                return <th key={index}>{item}</th>;
              }
            )}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, id) => (
            <tr key={id}>
              <ExpenseItem expense={expense} showBudget={showBudget} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
