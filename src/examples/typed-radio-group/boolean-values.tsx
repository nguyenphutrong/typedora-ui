import { TypedRadioGroup } from "@/components/typed-radio-group";

export function BooleanValues() {
  return (
    <div>
      <TypedRadioGroup
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        onChange={(value) => {
          //       ^?
        }}
      />
    </div>
  );
}
