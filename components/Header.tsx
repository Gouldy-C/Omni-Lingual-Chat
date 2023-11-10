import Logo from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import UserButton from "./UserButton";


export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-700">
      <nav className="flex flex-col sm:flex-row items-center justify-between p-2 px-2 bg-white dark:bg-slate-700 max-w-7xl mx-auto">
        <Logo/>

        <div className="flex gap-2">
          {/*  language selector */}
          {/* {Session && ()} */}
          
          <ThemeToggle/>
          
          <UserButton/>

        </div>
      </nav>
      {/* {Upgrade banner} */}
    </header>
  )
}
