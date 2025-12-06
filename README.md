# ✨ Typedora UI

> A Type-Safe Component Registry & Form Toolkit for Modern React Applications

Typedora UI is a next-generation extension layer for shadcn/ui, designed to bring full type-safety, schema-driven form components, and a flexible registry system to your UI stack.
Whether you're building internal tools or large-scale applications, Typedora UI helps you ship faster with confidence.

---

## 🚀 Why Typedora UI?

### 🔒 100% Type-Safe Components

Strong types for every component — Select, RadioGroup, Combobox, Field wrappers, and more. No more `any`, no more guessing.

### 🎨 Built on shadcn/ui

All components follow the shadcn philosophy: beautiful primitives, fully customizable, no vendor lock-in.

### 🧩 Registry-Driven Architecture

Define, override, or extend UI components through a cohesive registry system. Perfect for design systems and multi-app environments.

### 📐 Form-First by Design

Typedora UI integrates cleanly with TanStack Form, Zod, or React Hook Form, offering a frictionless form development experience.

### ⚡ Developer-Friendly API

Minimal, predictable, composable. Designed for teams that care about maintainability.

---

## 📦 Installation

```bash
npm install typedora-ui
# or
pnpm add typedora-ui
# or
yarn add typedora-ui
# or
bun add typedora-ui
```

Typedora UI requires React 18+ and a project already configured with shadcn/ui.

---

## ✨ Example: Type-Safe Select

```tsx
import { TypedSelect } from "@/components/typedora-ui";

export function DemoSelect() {
  return (
    <TypedSelect
      placeholder="Select fruit"
      options={[
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Orange", value: "orange" },
      ]}
      onChange={(value) => console.log("Selected:", value)}
    />
  );
}
```

Strongly-typed from end to end — even your event handlers get the correct type.

---

## 🧱 Components

### Form-Ready, Typed Components

- `TypedSelect`
- `TypedRadioGroup`

### Registry Core

- JSON or TypeScript-driven registry configuration
- Easy override / extend behavior

### Utilities

- Schema → UI component mapping
- Field metadata helpers

---

## 📁 Project Structure

```
typedora-ui/
└── package.json
```

---

## 🤝 Contributing

We welcome contributions from developers who care about type-safety, clean architecture, and beautiful code.
If you have ideas, improvements, or new typed components, feel free to open an Issue or a Pull Request.

---

## 📄 License

MIT License — © 2025 Typedora UI Team.

---

## ❤️ Acknowledgements

Typedora UI is built on top of exceptional open-source projects:

- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [React](https://react.dev/)
