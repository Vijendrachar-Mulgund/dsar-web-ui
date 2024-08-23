import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/auth";
import { RootState } from "@/store/store";
import mapboxgl from "mapbox-gl";

// @ts-ignore
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import VideoPlayer from "@/components/modules/video-player";
import { SenderType } from "@/enums/SenderType";
import Markdown from "react-markdown";
import toast from "react-hot-toast";
import { Message } from "@/types/case";
import { Send } from "lucide-react";

export function CaseDetail() {
  const { caseId } = useParams();

  const [prompt, setPrompt] = useState("");
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

  const me: User | null = useSelector((state: RootState) => state.auth.me) as User | null;
  const messages: any = useSelector((state: RootState) => state.cases.messages);
  const caseDetail: any = useSelector((state: RootState) => state.cases.currentCase);
  const isChatLoading: boolean = useSelector((state: RootState) => state.cases.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    const payload = { caseId: caseId, sender: me?._id };

    // Chat
    dispatch({ type: "cases/createChatConnection", payload });
    dispatch({ type: "cases/receiveInitialMessages" });
    dispatch({ type: "cases/receiveMessage" });

    // Case
    dispatch({ type: "cases/joinCaseRoom", payload });
    dispatch({ type: "cases/getCaseDetail", payload });

    getCurrentLocation();

    return () => {
      dispatch({ type: "cases/closeChatConnection", payload: { caseId } });
      dispatch({ type: "cases/leaveCaseRoom", payload: { caseId } });
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (caseDetail?.location) {
      const map = initMapbox(
        +caseDetail?.location?.coordinates[0],
        +caseDetail?.location?.coordinates[1],
        +currentLocation?.lng,
        +currentLocation?.lat,
        +caseDetail?.location?.coordinates[0],
        +caseDetail?.location?.coordinates[1],
      );

      new mapboxgl.Marker()
        .setLngLat([+caseDetail?.location?.coordinates[0], +caseDetail?.location?.coordinates[1]])
        .addTo(map);
    } else {
      initMapbox(currentLocation?.lng, currentLocation?.lat);
    }
  }, [caseDetail?.location]);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        toast.error(error.message);
      },
      { enableHighAccuracy: true },
    );
  };

  const initMapbox = (
    long: number,
    lat: number,
    sourceLong?: number,
    sourceLat?: number,
    destinationLong?: number,
    destinationLat?: number,
  ) => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

    const mapbox = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [long, lat], // starting position [lng, lat]
      zoom: 6, // starting zoom
    });

    mapbox.addControl(new mapboxgl.NavigationControl());

    if (!sourceLong || !sourceLat || !destinationLong || !destinationLat) return mapbox;

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/walking",
      geometries: "polyline",
      controls: {
        inputs: true,
        instructions: true,
        profileSwitcher: true,
      },
    });

    mapbox.addControl(directions, "top-left");

    directions.setOrigin([sourceLong, sourceLat]); // Example: [longitude, latitude]

    directions.setDestination([destinationLong, destinationLat]); // Example: [longitude, latitude]

    return mapbox;
  };

  const scrollToBottom = () => {
    const chatBox = document.getElementById("ai-chat-box");
    chatBox?.scrollTo(0, chatBox.scrollHeight);
  };

  const handleSendMessage = () => {
    const payload = { case: caseId, message: prompt, sender: me?._id, senderType: SenderType.user };
    dispatch({ type: "cases/sendMessage", payload });

    setPrompt("");
    scrollToBottom();
  };

  return (
    <div>
      <div className="w-11/12 m-auto">
        <h1 className="text-4xl text-center font-bold ">Case Detail</h1>
        <div className="text-muted-foreground text-center my-5">Case ID: {caseId}</div>

        {/* Video Player */}
        <VideoPlayer src={caseDetail?.videoURL} isLive={caseDetail?.isLive} liveVideoURL={caseDetail?.liveVideoURL} />

        <div className="grid grid-cols-4 gap-4 h-[750px] my-10">
          <div className="cols-span-1 flex items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl">Location Information</h1>

              <h1 className="text-xl my-5">Your current location</h1>
              <h1>
                <span className="font-bold">Longitude: </span>
                {currentLocation?.lng}, <span className="font-bold">Latitude: </span> {currentLocation?.lat}
              </h1>

              {caseDetail?.location ? (
                <>
                  <h1 className="text-xl my-5">Discovered location</h1>
                  <h1>
                    <span className="font-bold">Longitude: </span>
                    {caseDetail?.location?.coordinates[0]}, <span className="font-bold">Latitude: </span>
                    {caseDetail.location?.coordinates[1]}
                  </h1>
                </>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="col-span-3">
            {/* Map Box */}
            <div id="map" className="w-full h-full border rounded-lg"></div>
          </div>
        </div>

        <div className="grid grid-cols-4">
          {/* Chat Box */}
          <div className="min-h-96 my-10 col-span-3">
            <div
              id="ai-chat-box"
              className="flex flex-col gap-4 w-full mx-auto border rounded-lg pt-4 h-[750px] hide-scrollbar overflow-auto"
            >
              {messages?.length ? (
                messages?.map((message: Message | any) => {
                  return (
                    <div key={message?._id} className="flex pl-4 pr-4 items-start gap-4">
                      <Avatar className="w-8 h-8 border">
                        <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                        <AvatarFallback>{message?.senderType === SenderType.user ? "FR" : "AI"}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="font-medium">{message?.sender?.name}</div>
                          <div className="text-muted-foreground">{`${new Date(message?.updatedAt ?? "")}`}</div>
                        </div>
                        <div className="bg-card border-solid border-2 border-primary-foreground rounded-2xl p-4 max-w-full">
                          <Markdown>{message?.message}</Markdown>
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

              {!isChatLoading ? (
                <div className="sticky bottom-0 flex items-center gap-2 w-full bg-background p-4 border-t-2">
                  <Input
                    value={prompt}
                    placeholder="Type your message..."
                    onChange={(event) => setPrompt(event.target.value)}
                    className="flex-1 rounded-lg p-2 border border-input"
                  />
                  <Button disabled={prompt ? false : true} onClick={handleSendMessage}>
                    <div className="flex items-center justify-between w-16">
                      <Send /> Send
                    </div>
                  </Button>
                </div>
              ) : (
                <div className="sticky bottom-0 flex items-center justify-center gap-2 w-full bg-background p-4 border-t-2">
                  <div className="inset-0 flex items-center justify-center z-50">
                    <div className="w-6 h-6 border-4 border-primary rounded-full animate-spin border-t-transparent" />
                  </div>
                  <div className="text-muted-foreground">Loading...</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
