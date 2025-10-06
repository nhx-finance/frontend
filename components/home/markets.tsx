"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { IconGrid4x4, IconTable } from "@tabler/icons-react";
import GridView from "./render-grid-assets";
import TableView from "./table-view-assets";

function Markets() {
  const [view, setView] = useState("grid");
  return (
    <div className="mt-8 px-2 mb-8">
      <h1 className="text-xl font-funnel-display font-semibold flex items-start gap-2">
        Markets
      </h1>
      <div className="flex items-center justify-between mt-4 mb-2">
        <Input
          placeholder="Find an asset"
          className="border-foreground/30 text-sm bg-foreground/5 font-funnel-display rounded-3xl w-1/2 max-w-sm"
        />
        <div className="flex items-center gap-4">
          <div className="items-center gap-2 hidden xl:flex">
            <Button
              variant={view === "table" ? "outline" : "ghost"}
              size="icon"
              onClick={() => setView("table")}
            >
              <IconTable className={view === "table" ? "text-primary" : ""} />
            </Button>
            <Button
              variant={view === "grid" ? "outline" : "ghost"}
              size="icon"
              onClick={() => setView("grid")}
            >
              <IconGrid4x4 className={view === "grid" ? "text-primary" : ""} />
            </Button>
          </div>
          <Drawer>
            <DrawerTrigger className="text-sm font-funnel-display font-semibold border border-foreground/20 rounded-full px-12 py-2 flex items-center justify-between">
              Sort By: All
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="max-w-xl mx-auto my-0">
                <DrawerTitle>Filter Assets</DrawerTitle>
                <DrawerDescription>
                  Explore assets by different categories and filters.
                </DrawerDescription>
                <div className="flex flex-col my-8 gap-4 items-start">
                  <h1 className="text-sm font-funnel-display font-semibold hover:bg-foreground/5 text-start rounded-md px-2 w-full duration-300 py-2 ease-in transition-all">
                    Most Popular
                  </h1>

                  <h1 className="text-sm font-funnel-display font-semibold hover:bg-foreground/5 text-start rounded-md px-2 w-full duration-300 py-2 ease-in transition-all">
                    Volume
                  </h1>
                  <h1 className="text-sm font-funnel-display font-semibold hover:bg-foreground/5 text-start rounded-md px-2 w-full duration-300 py-2 ease-in transition-all">
                    Market Cap
                  </h1>
                  <h1 className="text-sm font-funnel-display font-semibold hover:bg-foreground/5 text-start rounded-md px-2 w-full duration-300 py-2 ease-in transition-all">
                    Trending
                  </h1>
                </div>
              </DrawerHeader>
              <div className="items-center gap-2 flex max-w-xl px-4 mx-auto my-0 w-full justify-between">
                <Button
                  variant={view === "table" ? "outline" : "ghost"}
                  size="icon"
                  onClick={() => setView("table")}
                  className="w-1/2"
                >
                  <IconTable
                    className={view === "table" ? "text-primary" : ""}
                  />
                </Button>
                <Button
                  variant={view === "grid" ? "outline" : "ghost"}
                  size="icon"
                  onClick={() => setView("grid")}
                  className="w-1/2"
                >
                  <IconGrid4x4
                    className={view === "grid" ? "text-primary" : ""}
                  />
                </Button>
              </div>
              <DrawerFooter className="max-w-xl mx-auto my-0 flex flex-row items-center justify-between w-full">
                <Button className="w-1/2">Confirm</Button>
                <DrawerClose className="w-1/2">
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <div className="mt-4">
        {view === "grid" ? <GridView /> : <TableView />}
      </div>
    </div>
  );
}

export default Markets;
