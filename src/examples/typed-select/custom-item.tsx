import { TypedSelect } from "@/components/typed-select";

export function CustomItem() {
  return (
    <div>
      <TypedSelect
        placeholder="Select a plan"
        options={[
          { label: "Free", value: "free", description: "For personal use" },
          { label: "Pro", value: "pro", description: "For professionals" },
          { label: "Team", value: "team", description: "For small teams" },
        ]}
        renderItem={({ option, itemProps, Item }) => (
          <Item {...itemProps} className="flex flex-col items-start py-2">
            <span className="font-medium">{option.label}</span>
            <span className="text-sm text-muted-foreground">
              {option.description}
            </span>
          </Item>
        )}
      />
    </div>
  );
}
