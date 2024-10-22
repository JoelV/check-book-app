import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { createCheck, validateCheckCleared } from "~/workflows/check";

interface TextInputProps {
  type: "number" | "date" | "text" | "checkbox";
  label: string;
  name: string;
  step?: string;
}

function TextInput({ type, label, name, step }: TextInputProps) {
  return (
    <div className="mb-4">
      <label
        className="mb-2 flex w-full flex-col gap-1 font-semibold"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        step={step}
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const checkNumber = formData.get("checkNumber");
  const checkDate = formData.get("checkDate");
  const checkAmount = formData.get("checkAmount");
  const checkWrittenTo = formData.get("checkWrittenTo");
  const checkCleared = formData.get("checkCleared");
  console.log({
    checkNumber,
    checkDate,
    checkAmount,
    checkWrittenTo,
    checkCleared,
    userId,
  });
  console.log(typeof checkAmount);
  if (typeof checkNumber !== "string" || checkNumber.length === 0) {
    return json(
      { errors: { body: null, title: "Check number is required" } },
      { status: 400 },
    );
  }

  if (typeof checkDate !== "string" || checkDate.length === 0) {
    return json(
      { errors: { body: null, title: "Check date is required" } },
      { status: 400 },
    );
  }

  if (typeof checkAmount !== "string" || checkAmount.length === 0) {
    return json(
      { errors: { body: null, title: "Check amount is required" } },
      { status: 400 },
    );
  }

  if (typeof checkWrittenTo !== "string" || checkWrittenTo.length === 0) {
    return json(
      { errors: { body: null, title: "Check written to is required" } },
      { status: 400 },
    );
  }

  if (!validateCheckCleared(checkCleared)) {
    return json(
      { errors: { body: null, title: "Cleared is required" } },
      { status: 400 },
    );
  }

  await createCheck({
    checkNumber,
    checkDate,
    checkAmount,
    checkWrittenTo,
    checkCleared,
    userId,
  });
  return redirect("/checkbook");
};

export default function NewCheckForm() {
  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold mb-4">Create a Check Record</h1>
      <Form
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
        }}
      >
        <TextInput type="number" name="checkNumber" label="Check Number:" />
        <TextInput type="date" name="checkDate" label="Check Date:" />
        <TextInput type="number" name="checkAmount" label="Check Amount:" />
        <TextInput type="text" name="checkWrittenTo" label="Written To:" />
        <div className="mb-4 flex items-center gap-2">
          <label
            className="font-semibold"
            htmlFor="checkCleared"
          >
            Cleared:
          </label>
          <input
            id="checkCleared"
            name="checkCleared"
            type="checkbox"
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
