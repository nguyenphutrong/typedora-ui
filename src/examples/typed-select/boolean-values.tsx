import { TypedSelect } from "@/components/typed-select";

export function BooleanValues() {
  return (
    <div>
      <TypedSelect
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        onValueChange={(value) => {
          //            ^?
        }}
      />
    </div>
  );
}
