import { TypedCombobox } from "@/components/typed-combobox";

export function NumberValues() {
  return (
    <TypedCombobox
      placeholder="Select priority..."
      searchPlaceholder="Search priorities..."
      options={
        [
          { label: "Low", value: 1 },
          { label: "Medium", value: 2 },
          { label: "High", value: 3 },
          { label: "Critical", value: 4 },
        ] as const
      }
      onValueChange={(value) => {
        //             ^?
        console.log(value);
      }}
    />
  );
}
