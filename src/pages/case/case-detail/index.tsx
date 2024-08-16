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

export function CaseDetail() {
  const { caseId } = useParams();

  const [prompt, setPrompt] = useState("");
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  // const [map, setMap] = useState<any>(null);
  // let map: any;

  const me: User | null = useSelector((state: RootState) => state.auth.me) as User | null;
  const messages: any = useSelector((state: RootState) => state.cases.messages);
  const caseDetail: any = useSelector((state: RootState) => state.cases.currentCase);

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
    };
  }, []);

  useEffect(() => {
    if (caseDetail?.location) {
      const map = initMapbox(
        +caseDetail?.location?.coordinates[0],
        +caseDetail?.location?.coordinates[1],
        currentLocation?.lng,
        currentLocation?.lat,
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
        console.error(error);
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

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      geometries: "polyline",
    });

    mapbox.addControl(directions, "top-left");

    if (!sourceLong || !sourceLat || !destinationLong || !destinationLat) return mapbox;

    directions.setOrigin([sourceLong, sourceLat]); // Example: [longitude, latitude]

    directions.setDestination([destinationLong, destinationLat]); // Example: [longitude, latitude]

    return mapbox;
  };

  const handleSendMessage = () => {
    const payload = { caseId: caseId, message: prompt, sender: me?._id };
    dispatch({ type: "cases/sendMessage", payload });
  };

  return (
    <div>
      <div className="w-4/5 m-auto">
        <h1 className="text-4xl text-center font-bold ">Case Detail</h1>
        <div className="text-muted-foreground text-center my-5">Case ID: {caseId}</div>

        <div id="map" className="w-full h-[500px] border rounded-lg"></div>

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
