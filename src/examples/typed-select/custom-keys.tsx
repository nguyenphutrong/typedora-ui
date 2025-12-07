"use client";

import { useState } from "react";
import { TypedSelect } from "@/components/typed-select";

// Example data using id/name keys instead of value/label

type User = {
  id: number;
  name: string;
  email: string;
};

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

export function CustomKeys() {
  const [selectedId, setSelectedId] = useState<User["id"]>();

  return (
    <div className="space-y-4">
      <TypedSelect
        placeholder="Select a user"
        options={users}
        valueKey="id"
        labelKey="name"
        value={selectedId}
        onValueChange={setSelectedId}
        renderItem={({ option, itemProps, Item }) => (
          <Item {...itemProps} className="flex flex-col items-start py-2">
            <span className="font-medium">{option.name}</span>
            <span className="text-sm text-muted-foreground">
              {option.email}
            </span>
          </Item>
        )}
      />
      {selectedId && (
        <p className="text-sm text-muted-foreground">
          Selected user ID: <strong>{selectedId}</strong>
        </p>
      )}
    </div>
  );
}
