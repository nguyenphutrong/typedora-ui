import { TypedCombobox } from "@/components/typed-combobox";

export function DisabledOptions() {
  return (
    <TypedCombobox
      placeholder="Select a plan..."
      searchPlaceholder="Search plans..."
      options={
        [
          { label: "Free", value: "free" },
          { label: "Pro", value: "pro" },
          { label: "Enterprise", value: "enterprise", disabled: true },
        ] as const
      }
    />
  );
}
