"use client";

import { useState } from "react";
import { TypedRadioGroup } from "@/components/typed-radio-group";

export function Controlled() {
  const [value, setValue] = useState<"apple" | "banana">("apple");

  return (
    <div className="space-y-4">
      <TypedRadioGroup
        value={value}
        options={
          [
            { label: "Apple", value: "apple" },
            { label: "Banana", value: "banana" },
          ] as const
        }
        onValueChange={setValue}
      />
      <p>Selected: {value}</p>
    </div>
  );
}
