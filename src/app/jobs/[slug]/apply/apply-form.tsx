"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { type ApplyFormState, applyToJobAction } from "./actions";

interface ApplyFormProps {
  jobId: string;
  disabled: boolean;
  initialState: ApplyFormState;
}

export function ApplyForm({
  jobId,
  disabled,
  initialState,
}: ApplyFormProps) {
  const [state, formAction] = useActionState(applyToJobAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {state.error}
        </p>
      ) : null}
      <input type="hidden" name="jobId" value={jobId} />
      <div className="space-y-2">
        <label htmlFor="coverLetter" className="text-sm font-medium">
          Cover letter (optional)
        </label>
        <Textarea
          id="coverLetter"
          name="coverLetter"
          rows={6}
          placeholder="Explain why you're a great fit for this role."
        />
      </div>
      <Button type="submit" className="w-full" disabled={disabled}>
        Submit application
      </Button>
    </form>
  );
}
