import { TypedCombobox } from "@/components/typed-combobox";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
] as const;

export function CustomKeys() {
  return (
    <TypedCombobox
      placeholder="Select a user..."
      searchPlaceholder="Search users..."
      options={users}
      valueKey="id"
      labelKey="name"
      popoverWidth={250}
      onValueChange={(value) => {
        //             ^?
        console.log(value);
      }}
    />
  );
}
