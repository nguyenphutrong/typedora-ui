import { CheckIcon } from "lucide-react";
import { TypedCombobox } from "@/components/typed-combobox";
import { cn } from "@/lib/utils";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", avatar: "JD" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", avatar: "JS" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", avatar: "BJ" },
] as const;

export function CustomItem() {
  return (
    <TypedCombobox
      placeholder="Select a user..."
      searchPlaceholder="Search users..."
      options={users}
      valueKey="id"
      labelKey="name"
      popoverWidth={300}
      renderItem={({ option, isSelected, itemProps, Item }) => (
        <Item {...itemProps} className="flex items-center gap-3 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
            {option.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{option.name}</div>
            <div className="text-xs text-muted-foreground truncate">
              {option.email}
            </div>
          </div>
          <CheckIcon
            className={cn(
              "h-4 w-4 shrink-0",
              isSelected ? "opacity-100" : "opacity-0",
            )}
          />
        </Item>
      )}
      onValueChange={(value) => {
        console.log(value);
      }}
    />
  );
}
