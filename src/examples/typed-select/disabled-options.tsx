import { TypedSelect } from "@/components/typed-select";

export function DisabledOptions() {
  return (
    <div>
      <TypedSelect
        options={[
          { label: "Apple", value: "apple" },
          { label: "Banana", value: "banana", disabled: true },
          { label: "Orange", value: "orange" },
        ]}
      />
    </div>
  );
}
