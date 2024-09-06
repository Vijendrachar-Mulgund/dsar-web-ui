import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Role } from "@/enums/Role";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export function CreateNewFirstResponderDialog({ submit }: any) {
  const [newFirstResponders, setNewFirstResponders] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewFirstResponders({
      ...newFirstResponders,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleSelection = (role: string) => {
    setNewFirstResponders({
      ...newFirstResponders,
      role: role,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(newFirstResponders);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span className="ml-2">Register new First Responder</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="mb-5">Register new First Responder</DialogTitle>
          </DialogHeader>
          <div className="grid gap-y-4">
            <div className="flex justify-between">
              <div>
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  name="firstname"
                  onChange={(event) => handleFieldChange(event)}
                  id="firstname"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  name="lastname"
                  onChange={(event) => handleFieldChange(event)}
                  id="lastname"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input name="email" onChange={(event) => handleFieldChange(event)} id="email" className="w-full" />
            </div>

            <div className="mb-5">
              <Label htmlFor="role">Role</Label>
              <Select name="role" onValueChange={(selectedRole) => handleRoleSelection(selectedRole)}>
                <SelectTrigger>
                  <SelectValue id="role" placeholder="Select a Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(Role).map((userRole) => {
                      return (
                        <SelectItem key={userRole} value={userRole}>
                          {userRole}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex sm:justify-end">
            <Button type="submit" variant="default">
              Submit
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
