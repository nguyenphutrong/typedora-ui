import { TypedCombobox } from "@/components/typed-combobox";

const groupedOptions = [
  {
    label: "Frontend",
    options: [
      { label: "React", value: "react" },
      { label: "Vue", value: "vue" },
      { label: "Svelte", value: "svelte" },
    ],
  },
  {
    label: "Backend",
    options: [
      { label: "Node.js", value: "nodejs" },
      { label: "Python", value: "python" },
      { label: "Go", value: "go" },
    ],
  },
] as const;

export function GroupedOptions() {
  return (
    <TypedCombobox
      placeholder="Select a technology..."
      searchPlaceholder="Search technologies..."
      options={groupedOptions}
      popoverWidth={250}
      onValueChange={(value) => {
        //             ^?
        console.log(value);
      }}
    />
  );
}
