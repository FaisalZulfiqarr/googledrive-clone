import LogoutButton from "./LogoutButton";

export default function Header({ userName }) {
  return (
    <header className="bg-white px-6 py-4 shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tight text-blue-600">
          DriveVault
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold shadow">
            {userName?.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-blue-100 px-3 py-1.5 rounded-full text-blue-700 font-medium">
            <span className="text-sm truncate max-w-[100px]">{userName}</span>
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
