import { TypedSelect } from "@/components/typed-select";

export function BasicUsage() {
  return (
    <div>
      <TypedSelect
        options={
          [
            { label: "Apple", value: "apple" },
            { label: "Banana", value: "banana" },
            { label: "Orange", value: "orange" },
          ] as const
        }
        onChange={(value) => {
          //       ^?
        }}
      />
    </div>
  );
}
