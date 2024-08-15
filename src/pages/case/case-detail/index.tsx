import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/auth";
import { RootState } from "@/store/store";
import mapboxgl from "mapbox-gl";

export function CaseDetail() {
  const { caseId } = useParams();

  const [prompt, setPrompt] = useState("");

  const me: User | null = useSelector((state: RootState) => state.auth.me) as User | null;
  const messages: any = useSelector((state: RootState) => state.cases.messages);

  const dispatch = useDispatch();

  useEffect(() => {
    const payload = { caseId: caseId, sender: me?._id };
    dispatch({ type: "cases/createChatConnection", payload });
    dispatch({ type: "cases/receiveInitialMessages" });
    dispatch({ type: "cases/receiveMessage" });

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-3.170606, 54.443657], // starting position [lng, lat]
      zoom: 10, // starting zoom
    });

    const start: any = [];
    navigator.geolocation.getCurrentPosition((position) => {
      start.push(position.coords.longitude, position.coords.latitude);
    });

    // new mapboxgl.Marker().setLngLat([-3.170606, 54.443657]).addTo(map);

    // const start = [-2.49444, 53.740336]; // Source coordinates [lng, lat]
    const end = [-2.533587, 53.992786]; // Destination coordinates [lng, lat]

    // Get route from Mapbox Directions API
    async function getRoute(start: any, end: any) {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: "GET" },
      );
      const json = await query.json();
      const data = json.routes[0];
      const route = data.geometry.coordinates;
      const geojson: any = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };

      if (map && map.getSource("route")) {
        map.getSource("route").setData(geojson);
      } else {
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }
    }

    map.on("load", () => {
      getRoute(start, end);

      // Add start and end markers
      new mapboxgl.Marker().setLngLat(start).addTo(map);
      new mapboxgl.Marker().setLngLat(end).addTo(map);
    });

    return () => {
      dispatch({ type: "cases/closeChatConnection", payload: { caseId } });
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

        <div id="map" className="w-full h-[500px]"></div>

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
