"use client";

import { useState } from "react";
import { TypedSelect } from "@/components/typed-select";

type User = {
  id: string;
  name: string;
};

const users: User[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

export function Controlled() {
  const [value, setValue] = useState<User["id"]>(users[0].id);

  return (
    <div className="space-y-4">
      <TypedSelect
        value={value}
        options={users}
        valueKey="id"
        labelKey="name"
        onChange={setValue}
      />
      <p>Selected: {value}</p>
    </div>
  );
}
