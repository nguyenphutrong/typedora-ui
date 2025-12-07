import { TypedCombobox } from "@/components/typed-combobox";

export function BasicUsage() {
  return (
    <TypedCombobox
      placeholder="Select a framework..."
      searchPlaceholder="Search frameworks..."
      options={
        [
          { label: "Next.js", value: "nextjs" },
          { label: "Remix", value: "remix" },
          { label: "Astro", value: "astro" },
          { label: "SvelteKit", value: "sveltekit" },
          { label: "Nuxt", value: "nuxt" },
        ] as const
      }
      onValueChange={(value) => {
        //             ^?
        console.log(value);
      }}
    />
  );
}
