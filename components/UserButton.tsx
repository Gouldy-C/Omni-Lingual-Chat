import UserAvatar from "./UserAvatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from "./ui/dropdown-menu";


export default function UserButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatar name="Christian Gouldy" image="https://github.com/shadcn.png" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          Hello, Christian
        </DropdownMenuLabel>
        <DropdownMenuItem >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  
  )
}