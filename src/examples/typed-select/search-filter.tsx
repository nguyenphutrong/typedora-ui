/** biome-ignore-all lint/a11y/noStaticElementInteractions: div with onKeyDown used to prevent Select shortcuts from interfering with search input */
// ---cut---
"use client";

import { useState } from "react";
import { TypedSelect } from "@/components/typed-select";
import { Input } from "@/components/ui/input";

export function SearchFilter() {
  const [search, setSearch] = useState("");

  const allOptions = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
  ];

  const filteredOptions = allOptions.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <TypedSelect
      options={filteredOptions}
      renderContent={({ children, Content }) => (
        <Content
          // Prevent Select from closing when clicking inside the search input
          onPointerDownOutside={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest("input")) {
              e.preventDefault();
            }
          }}
        >
          <div className="p-2 border-b" onKeyDown={(e) => e.stopPropagation()}>
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              // Prevent focus management interference from Radix
              onPointerDown={(e) => e.stopPropagation()}
            />
          </div>
          {children}
        </Content>
      )}
    />
  );
}
