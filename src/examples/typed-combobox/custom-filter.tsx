import { TypedCombobox } from "@/components/typed-combobox";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "admin" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "user" },
] as const;

export function CustomFilter() {
  return (
    <TypedCombobox
      placeholder="Search by name, email, or role..."
      searchPlaceholder="Type to search..."
      options={users}
      valueKey="id"
      labelKey="name"
      popoverWidth={300}
      filterFn={(option, query) => {
        const q = query.toLowerCase();
        return (
          option.name.toLowerCase().includes(q) ||
          option.email.toLowerCase().includes(q) ||
          option.role.toLowerCase().includes(q)
        );
      }}
      onValueChange={(value) => {
        console.log(value);
      }}
    />
  );
}
