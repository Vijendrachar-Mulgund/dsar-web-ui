import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DroneModel } from "@/enums/DroneModel";

export function CreateNewDroneDialog({ submit }: any) {
  const [newDrone, setNewDrone] = useState({
    name: "",
    model: "",
    serialNumber: "",
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewDrone({
      ...newDrone,
      [e.target.name]: e.target.value,
    });
  };

  const handleModelSelection = (model: string) => {
    setNewDrone({
      ...newDrone,
      model: model,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(newDrone);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span className="ml-2">Register new Drone</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="mb-5">Register new Drone</DialogTitle>
          </DialogHeader>
          <div className="grid gap-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input name="name" onChange={(event) => handleFieldChange(event)} id="name" className="w-full" />
            </div>

            <div>
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input
                name="serialNumber"
                onChange={(event) => handleFieldChange(event)}
                id="serialNumber"
                className="w-full"
              />
            </div>

            <div className="mb-5">
              <Label htmlFor="model">Model</Label>
              <Select name="model" onValueChange={(selectedModel) => handleModelSelection(selectedModel)}>
                <SelectTrigger>
                  <SelectValue id="model" placeholder="Select a Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(DroneModel).map((dm) => {
                      return (
                        <SelectItem key={dm} value={dm}>
                          {dm}
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
