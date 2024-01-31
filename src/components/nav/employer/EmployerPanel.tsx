import { Button } from "@/components/ui/button";
import NavButton from "../NavButton";

export default function EmployerPanel() {
  return (
    <>
      <NavButton
        href="/employer-panel"
        styles="flex h-10 min-w-fit font-semibold px-4 items-center justify-center rounded-2xl"
      >
        Employer panel
      </NavButton>
      <Button className="flex h-10 font-semibold items-center justify-center bg-blue-200 rounded-2xl text-black hover:text-white ">
        Logout
      </Button>
    </>
  );
}
