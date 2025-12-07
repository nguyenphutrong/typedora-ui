"use client";

import { useState } from "react";
import { TypedRadioGroup } from "@/components/typed-radio-group";
import { Label } from "@/components/ui/label";

// Example data using id/name keys instead of value/label
const roles = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full access to all features",
  },
  { id: "editor", name: "Editor", description: "Can edit content" },
  { id: "viewer", name: "Viewer", description: "Read-only access" },
] as const;

export function CustomKeys() {
  const [selectedId, setSelectedId] = useState<(typeof roles)[number]["id"]>();

  return (
    <div className="space-y-4">
      <Label>Select Role</Label>
      <TypedRadioGroup
        options={roles}
        valueKey="id"
        labelKey="name"
        value={selectedId}
        onValueChange={setSelectedId}
        renderItem={({ option, itemProps, Item, Indicator }) => (
          <label
            htmlFor={itemProps.id}
            className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border hover:bg-accent"
          >
            <Item {...itemProps} className="mt-1">
              <Indicator />
            </Item>
            <div className="flex flex-col">
              <span className="font-medium">{option.name}</span>
              <span className="text-sm text-muted-foreground">
                {option.description}
              </span>
            </div>
          </label>
        )}
      />
      {selectedId && (
        <p className="text-sm text-muted-foreground">
          Selected role: <strong>{selectedId}</strong>
        </p>
      )}
    </div>
  );
}
