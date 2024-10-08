import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Check, getChecks } from "~/workflows/check";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (request) console.log("foo");
  const checks = await getChecks();
  return json({ checks });
};
function CheckMarkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
      style={{ margin: "auto" }}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CheckRow({ check }: { check: Check }) {
  return (
    <tr>
      <td className="border border-slate-300 px-4 py-2 text-center">{check.number}</td>
      <td className="border border-slate-300 px-4 py-2 text-center">
        {check.date}
      </td>
      <td className="border border-slate-300 px-4 py-2 text-center">{check.writtenTo}</td>
      <td className="border border-slate-300 px-4 py-2 text-center">{check.amount}</td>
      <td className="border border-slate-300 px-4 py-2 text-center">
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" checked={check.cleared} />
      </td>
    </tr>
  );
}

export default function CheckBookPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-lime-800 p-4 text-white">
        <h1>CheckBook</h1>
      </header>
      <main>
        <table className="min-w-full table-auto border-collapse border border-slate-400">
          <thead>
            <tr className="bg-slate-200">
              <th className="border border-slate-300 px-4 py-2">
                Check Number
              </th>
              <th className="border border-slate-300 px-4 py-2">Date</th>
              <th className="border border-slate-300 px-4 py-2">Written To</th>
              <th className="border border-slate-300 px-4 py-2">
                Check Payment
              </th>
              <th className="border border-slate-300 px-4 py-2">
                <CheckMarkIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            {data.checks.map(check => {
              return <CheckRow key={check.id} check={check}/>
            })}
            {/* <tr>
              <td className="border border-slate-300 px-4 py-2 text-center">
                181
              </td>
              <td className="border border-slate-300 px-4 py-2 text-center">
                09/21/2024
              </td>
              <td className="border border-slate-300 px-4 py-2 text-center">
                PCC
              </td>
              <td className="border border-slate-300 px-4 py-2 text-center">
                445.50
              </td>
              <td className="border border-slate-300 px-4 py-2 text-center">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />
              </td>
            </tr> */}
          </tbody>
        </table>
      </main>
    </div>
  );
}
