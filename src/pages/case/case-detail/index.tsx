import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/auth";
import { RootState } from "@/store/store";

export function CaseDetail() {
  const { caseId } = useParams();

  const [prompt, setPrompt] = useState("");

  const me: User | null = useSelector((state: RootState) => state.auth.me) as User | null;
  const messages: any = useSelector((state: RootState) => state.cases.messages);

  const dispatch = useDispatch();

  useEffect(() => {
    const payload = { caseId: caseId, sender: me?._id };
    dispatch({ type: "cases/createConnection", payload });
    dispatch({ type: "cases/receiveInitialMessages" });
    dispatch({ type: "cases/receiveMessage" });

    return () => {
      dispatch({ type: "cases/closeConnection", payload: { caseId } });
    };
  }, []);

  const handleSendMessage = () => {
    const payload = { caseId: caseId, message: prompt, sender: me?._id };
    dispatch({ type: "cases/sendMessage", payload });
  };

  return (
    <div>
      <div className="w-4/5 m-auto">
        <h1 className="text-4xl text-center font-bold ">Case Detail</h1>
        <div className="text-muted-foreground text-center my-5">Case ID: {caseId}</div>

        {/* Chat Box */}
        <div className="min-h-96">
          <div className="flex flex-col gap-4 w-full mx-auto border rounded-lg pt-4 h-[750px] overflow-auto">
            {messages?.length ? (
              messages?.map((message: any) => {
                return (
                  <div key={message?._id} className="flex pl-4 pr-4 items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                      <AvatarFallback>YO</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="font-medium">{message?.sender?.name}</div>
                        <div className="text-muted-foreground">{`${new Date(message?.updatedAt)}`}</div>
                      </div>
                      <div className="bg-card border-solid border-2 border-primary-foreground rounded-2xl p-4 max-w-full">
                        <p>{message?.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full">
                <div className="flex justify-center items-center h-full">
                  <div className="text-muted-foreground">No messages yet</div>
                </div>
              </div>
            )}

            <div className="sticky bottom-0 flex items-center gap-2 w-full bg-background p-4 border-t-2">
              <Input
                placeholder="Type your message..."
                onChange={(event) => setPrompt(event.target.value)}
                className="flex-1 rounded-lg p-2 border border-input"
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
