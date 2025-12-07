import { TypedRadioGroup } from "@/components/typed-radio-group";

export function BasicUsage() {
  return (
    <div>
      <TypedRadioGroup
        options={[
          { label: "Apple", value: "apple" },
          { label: "Banana", value: "banana" },
          { label: "Orange", value: "orange" },
        ]}
        onValueChange={(value) => {
          //            ^?
        }}
      />
    </div>
  );
}
