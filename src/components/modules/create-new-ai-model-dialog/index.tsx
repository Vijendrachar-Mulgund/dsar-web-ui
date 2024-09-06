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
import { ArtificialIntelligenceModel, ParameterCount } from "@/enums/ArtificialIntelligenceModel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export function CreateNewAIModelDialog({ submit }: any) {
  const [newAIModel, setNewAIModel] = useState({
    name: "",
    model: "",
    description: "",
    parameters: "",
    version: "",
  });

  const [parameterCountValue, setParameterCountValue] = useState({ parameterValue: "", parameterCount: "" });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setNewAIModel({
      ...newAIModel,
      [e.target.name]: e.target.value,
    });
  };

  const handleAIModelSelection = (model: string) => {
    setNewAIModel({
      ...newAIModel,
      model: model,
    });
  };

  const handleParameterCountSelection = (value: string) => {
    setParameterCountValue({
      ...parameterCountValue,
      parameterCount: value,
    });
  };

  const handleParameterValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameterCountValue({
      ...parameterCountValue,
      parameterValue: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      ...newAIModel,
      parameters: `${parameterCountValue.parameterValue}:${parameterCountValue.parameterCount}`,
    };
    submit(payload);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span className="ml-2">Register new AI Model</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="mb-5">Register new AI Model</DialogTitle>
          </DialogHeader>
          <div className="grid gap-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input name="name" onChange={(event) => handleFieldChange(event)} id="name" className="w-full" />
            </div>

            <div>
              <Label htmlFor="model">AI model</Label>
              <Select name="model" onValueChange={(selectedModel) => handleAIModelSelection(selectedModel)}>
                <SelectTrigger>
                  <SelectValue id="model" placeholder="Select an AI model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(ArtificialIntelligenceModel).map((am) => {
                      return (
                        <SelectItem key={am} value={am}>
                          {am}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                onChange={(event) => handleFieldChange(event)}
                id="description"
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="parameters">Parameters</Label>
              <div className="flex justify-between">
                <div>
                  <Input
                    name="parameter-value"
                    onChange={(event) => handleParameterValueChange(event)}
                    id="parameter-value"
                    className="w-full"
                  />
                </div>

                <Select
                  name="parameter-count"
                  onValueChange={(selectedCount) => handleParameterCountSelection(selectedCount)}
                >
                  <SelectTrigger className="w-1/2">
                    <SelectValue id="parameter-value" placeholder="Select parameter count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(ParameterCount).map((count) => {
                        return (
                          <SelectItem key={count} value={count}>
                            {count}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-5">
              <Label htmlFor="version">Version</Label>
              <Input name="version" onChange={(event) => handleFieldChange(event)} id="version" className="w-full" />
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
