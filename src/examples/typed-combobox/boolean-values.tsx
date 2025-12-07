import { TypedCombobox } from "@/components/typed-combobox";

export function BooleanValues() {
  return (
    <TypedCombobox
      placeholder="Select status..."
      searchPlaceholder="Search..."
      options={
        [
          { label: "Active", value: true },
          { label: "Inactive", value: false },
        ] as const
      }
      onValueChange={(value) => {
        //             ^?
        console.log(value);
      }}
    />
  );
}
