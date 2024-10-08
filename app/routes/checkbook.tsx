import { Link, Outlet } from "@remix-run/react";



export default function CheckBookPage() {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-lime-800 p-4 text-white">
        <h1>CheckBook</h1>
          <Link to="new" className="bg-cyan-500 hover:bg-cyan-950 text-white font-bold py-2 px-4 rounded">
            New CheckBook Record  
          </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
