import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export function CaseDetail() {
  const { caseId } = useParams();

  return (
    <div>
      <div className="w-4/5 m-auto">
        <h1 className="text-4xl text-center font-bold my-20">Case Detail</h1>
        <div className="text-muted-foreground text-center my-10">Case ID: {caseId}</div>

        {/* Chat Box */}
        <div className="flex flex-col gap-4 w-full mx-auto border rounded-lg p-4">
          <div className="flex items-start gap-4">
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/placeholder-user.jpg" alt="Image" />
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="flex items-center gap-2 text-sm">
                <div className="font-medium">You</div>
                <div className="text-muted-foreground">2:39pm</div>
              </div>
              <div className="bg-card border-solid border-2 border-primary-foreground rounded-2xl p-4 max-w-full">
                <p>
                  Hey everyone. We just had a fantastic quarter! 🎉 Hey everyone. We just had a fantastic quarter! 🎉
                  Hey everyone. We just had a fantastic quarter! 🎉 Hey everyone. We just had a fantastic quarter! 🎉
                  Hey everyone. We just had a fantastic quarter! 🎉
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <Input placeholder="Type your message..." className="flex-1 rounded-lg p-2 border border-input" />
            <Button>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
