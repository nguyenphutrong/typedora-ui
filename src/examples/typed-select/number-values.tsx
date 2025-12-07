import { TypedSelect } from "@/components/typed-select";

export function NumberValues() {
  return (
    <div>
      <TypedSelect
        options={
          [
            { label: "One", value: 1 },
            { label: "Two", value: 2 },
            { label: "Three", value: 3 },
          ] as const
        }
        onValueChange={(value) => {
          //            ^?
        }}
      />
    </div>
  );
}
