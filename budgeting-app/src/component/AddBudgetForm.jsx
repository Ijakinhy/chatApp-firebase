import React, { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { awaIt } from "../helpers";

const AddBudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef();
  const refFocus = useRef();
  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      refFocus.current.focus();
    }
  }, [isSubmitting]);
  return (
    <div className="form-wrapper">
      <h2 className="h3">Create Budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            placeholder="e.g.,groceries"
            name="newBudget"
            id="newBudget"
            required
            ref={refFocus}
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            placeholder="e.g.,340$"
            name="newBudgetAmount"
            id="newBudgetAmount"
            step="0.01"
            inputMode="decimals"
            required
          />
        </div>
        <button type="submit" className="btn btn--dark">
          {isSubmitting ? (
            <span>Creating Budget....</span>
          ) : (
            <>
              <span>Create Budget</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
