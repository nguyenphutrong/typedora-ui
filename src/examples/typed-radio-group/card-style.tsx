import { CheckIcon } from "lucide-react";
import { TypedRadioGroup } from "@/components/typed-radio-group";
import { cn } from "@/lib/utils";

export function CardStyle() {
  return (
    <div className="not-prose">
      <TypedRadioGroup
        defaultValue="free"
        className="grid grid-cols-3 gap-4"
        options={[
          { value: "free", label: "Free", description: "Basic features" },
          { value: "pro", label: "Pro", description: "Advanced features" },
          { value: "team", label: "Team", description: "For teams" },
        ]}
        renderItem={({ option, isSelected, itemProps, Item }) => (
          <label
            htmlFor={itemProps.id}
            className={cn(
              "relative flex flex-col p-4 border rounded-lg cursor-pointer",
              isSelected ? "border-primary bg-primary/5" : "border-border",
            )}
          >
            <Item {...itemProps} className="sr-only" />
            {isSelected && (
              <CheckIcon className="absolute top-3 right-3 size-4 text-primary" />
            )}
            <div className="grid grow gap-2">
              <p className="font-semibold">{option.label}</p>
              <p
                className="text-muted-foreground text-xs"
                id={`${itemProps.id}-description`}
              >
                {option.description}
              </p>
            </div>
          </label>
        )}
      />
    </div>
  );
}
