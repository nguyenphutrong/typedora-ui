import { TypedSelect } from "@/components/typed-select";

export function GroupedOptions() {
  return (
    <div>
      <TypedSelect
        options={
          [
            {
              label: "Fruits",
              options: [
                { label: "Apple", value: "apple" },
                { label: "Banana", value: "banana" },
              ],
            },
            {
              label: "Vegetables",
              options: [
                { label: "Carrot", value: "carrot" },
                { label: "Broccoli", value: "broccoli" },
              ],
            },
          ] as const
        }
        onChange={(value) => {
          //       ^?
        }}
      />
    </div>
  );
}
