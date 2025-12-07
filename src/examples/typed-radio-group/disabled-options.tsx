import { TypedRadioGroup } from "@/components/typed-radio-group";

export function DisabledOptions() {
  return (
    <div>
      <TypedRadioGroup
        options={[
          { label: "Available", value: "available" },
          { label: "Coming Soon", value: "coming-soon", disabled: true },
          { label: "Premium", value: "premium" },
        ]}
      />
    </div>
  );
}
