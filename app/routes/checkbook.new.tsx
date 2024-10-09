import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { createCheck, validateCheckCleared } from "~/workflows/check";

// import { requireUserId } from "~/session.server";
// import { CreateCheck } from '~/workflows/check'


export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const checkNumber = formData.get("checkNumber");
  const checkDate = formData.get("checkDate");
  const checkAmount = formData.get("checkAmount");
  const checkWrittenTo = formData.get("checkWrittenTo");
  const checkCleared = formData.get("checkCleared")
 console.log({ checkNumber, checkDate, checkAmount, checkWrittenTo, checkCleared }); 
 console.log(typeof checkAmount)
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

  if (typeof checkWrittenTo!== "string" || checkWrittenTo.length === 0) {
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


  await createCheck({ checkNumber, checkDate, checkAmount, checkWrittenTo, checkCleared, userId })
  return redirect('/checkbook');
};

export default function NewCheckForm() {
  return (
    <>
      <h1>Check form</h1>
      <Form
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
        }}
      >
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Check Number: </span>
            <input
              name="checkNumber"
              type="number"
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            />
          </label>
          <label className="flex w-full flex-col gap-1">
            <span>Check Date: </span>
            <input
              name="checkDate"
              type="date"
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            />
          </label>
          <label className="flex w-full flex-col gap-1">
            <span>Check Amount: </span>
            <input
              name="checkAmount"
              type="number"
              step="0.01"
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            />
          </label>
          <label className="flex w-full flex-col gap-1">
            <span>Written To: </span>
            <input
              name="checkWrittenTo"
              type="text"
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            />
          </label>
          <label className="flex w-full flex-col gap-1">
            <span>Cleared: </span>
            <input
              name="checkCleared"
              type="checkbox"
              value="true"
            />
          </label>
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
    </>
  );
}
