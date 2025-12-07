import { TypedRadioGroup } from "@/components/typed-radio-group";

export function NumberValues() {
  return (
    <div>
      <TypedRadioGroup
        options={[
          { label: "Small", value: 1 },
          { label: "Medium", value: 2 },
          { label: "Large", value: 3 },
        ]}
        onChange={(value) => {
          //       ^?
        }}
      />
    </div>
  );
}
