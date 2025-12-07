"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ExtractOption, ExtractOptionValue } from "@/lib/typed-utils";

// =============================================================================
// Internal Indicator Component (matches shadcn/ui style)
// =============================================================================

function RadioGroupIndicator(
  props: React.ComponentProps<typeof RadioGroupPrimitive.Indicator>,
) {
  return (
    <RadioGroupPrimitive.Indicator
      data-slot="radio-group-indicator"
      className="relative flex items-center justify-center"
      {...props}
    >
      <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
    </RadioGroupPrimitive.Indicator>
  );
}

// =============================================================================
// Types
// =============================================================================

/**
 * Supported value types for TypedRadioGroup.
 * Values are serialized to strings internally but typed correctly externally.
 */
export type RadioValueType = string | number | boolean;

/**
 * Default option type with value and label.
 * Use this as a reference for your custom option types.
 */
export type RadioOption<T extends RadioValueType = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

// =============================================================================
// Render Props Types
// =============================================================================

/**
 * Props passed to renderItem function.
 * @template TOption - The full option type including custom properties
 */
export type RadioItemRenderProps<TOption> = {
  /** The option data */
  option: TOption;
  /** Whether this option is currently selected */
  isSelected: boolean;
  /** Whether this option is disabled */
  isDisabled: boolean;
  /** Props to spread on RadioGroupItem */
  itemProps: {
    value: string;
    id: string;
    disabled?: boolean;
  };
  /** Default item component */
  Item: typeof RadioGroupItem;
  /** Default indicator component */
  Indicator: typeof RadioGroupIndicator;
};

/**
 * Props passed to renderGroup function.
 * Used to customize the layout wrapper around radio items.
 */
export type RadioGroupRenderProps = {
  /** Rendered items to be placed inside your custom wrapper */
  children: React.ReactNode;
};

/**
 * Core props for TypedRadioGroup (for documentation).
 * The actual component also accepts all RadioGroup props (className, disabled, etc.)
 */
export interface TypedRadioGroupBaseProps<
  TOptions extends readonly Record<string, unknown>[],
  TValueKey extends string = "value",
  TLabelKey extends string = "label",
> {
  /** Array of radio options */
  options: TOptions;
  /** The key to use for the option value (default: "value") */
  valueKey?: TValueKey;
  /** The key to use for the option label (default: "label") */
  labelKey?: TLabelKey;
  /** Controlled value */
  value?: ExtractOptionValue<TOptions, TValueKey>;
  /** Default value for uncontrolled usage */
  defaultValue?: ExtractOptionValue<TOptions, TValueKey>;
  /** Callback when value changes - receives the typed value */
  onValueChange?: (value: ExtractOptionValue<TOptions, TValueKey>) => void;
  /** Custom render for each item */
  renderItem?: (
    props: RadioItemRenderProps<ExtractOption<TOptions>>,
  ) => React.ReactNode;
  /**
   * Custom render for wrapping the items inside RadioGroup.
   * Use this for adding custom elements between items (e.g., dividers).
   * For simple layout changes, prefer using the `className` prop directly.
   */
  renderGroup?: (props: RadioGroupRenderProps) => React.ReactNode;
  /** CSS class name for the RadioGroup container */
  className?: string;
  /** Whether the entire radio group is disabled */
  disabled?: boolean;
  /** The name of the group (for form submission) */
  name?: string;
  /** Whether selection is required */
  required?: boolean;
  /** The orientation of the radio group */
  orientation?: "horizontal" | "vertical";
  /** When true, keyboard navigation will loop */
  loop?: boolean;
}

/**
 * Props for the TypedRadioGroup component.
 * @template TOptions - The options array type
 * @template TValueKey - The key used for the value property (default: "value")
 * @template TLabelKey - The key used for the label property (default: "label")
 */
export interface TypedRadioGroupProps<
  TOptions extends readonly Record<string, unknown>[],
  TValueKey extends string = "value",
  TLabelKey extends string = "label",
> extends Omit<
      React.ComponentProps<typeof RadioGroup>,
      "value" | "defaultValue" | "onValueChange" | "children" | "onValueChange"
    >,
    TypedRadioGroupBaseProps<TOptions, TValueKey, TLabelKey> {}

// =============================================================================
// Helpers
// =============================================================================

/**
 * Serialize a value to string for internal use with Radix RadioGroup
 */
function serializeValue<T extends RadioValueType>(value: T): string {
  if (typeof value === "boolean") {
    return value ? "__boolean_true__" : "__boolean_false__";
  }
  if (typeof value === "number") {
    return `__number_${value}__`;
  }
  return String(value);
}

/**
 * Deserialize a string value back to its original type
 */
function deserializeValue<TOption extends Record<string, unknown>>(
  serialized: string,
  options: readonly TOption[],
  valueKey: keyof TOption,
): TOption[keyof TOption] {
  const found = options.find(
    (opt) => serializeValue(opt[valueKey] as RadioValueType) === serialized,
  );
  return found?.[valueKey] as TOption[keyof TOption];
}

/**
 * Generate a unique ID for a radio item
 */
function generateItemId(index: number, groupId: string): string {
  return `${groupId}-item-${index}`;
}

// =============================================================================
// Default Render Functions
// =============================================================================

function createDefaultRenderItem<
  TOption extends Record<string, unknown>,
  TLabelKey extends keyof TOption,
>(labelKey: TLabelKey) {
  return function defaultRenderItem({
    option,
    itemProps,
    Item,
    Indicator,
  }: RadioItemRenderProps<TOption>): React.ReactNode {
    const label = option[labelKey];
    return (
      <label
        htmlFor={itemProps.id}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Item {...itemProps}>
          <Indicator />
        </Item>
        <span>{String(label ?? "")}</span>
      </label>
    );
  };
}

function defaultRenderGroup({
  children,
}: RadioGroupRenderProps): React.ReactNode {
  return children;
}

// =============================================================================
// Component
// =============================================================================

/**
 * A headless, type-safe radio group component with full TypeScript inference
 * and customizable rendering via render props.
 *
 * @example
 * ```tsx
 * // Default usage with value/label keys
 * <TypedRadioGroup
 *   options={[
 *     { value: "apple", label: "Apple" },
 *     { value: "banana", label: "Banana", description: "Yellow fruit" },
 *   ] as const}
 *   renderItem={({ option, itemProps, Item, Indicator }) => (
 *     <label htmlFor={itemProps.id} className="flex items-center gap-2">
 *       <Item {...itemProps}>
 *         <Indicator />
 *       </Item>
 *       <div>
 *         <span>{option.label}</span>
 *         {option.description && <p>{option.description}</p>}
 *       </div>
 *     </label>
 *   )}
 *   onValueChange={(value) => {
 *     // value: "apple" | "banana"
 *   }}
 * />
 *
 * // Custom keys usage with id/name
 * <TypedRadioGroup
 *   options={[
 *     { id: 1, name: "John Doe" },
 *     { id: 2, name: "Jane Smith" },
 *   ] as const}
 *   valueKey="id"
 *   labelKey="name"
 *   onValueChange={(value) => {
 *     // value: 1 | 2
 *   }}
 * />
 * ```
 */
function TypedRadioGroup<
  TOptions extends readonly Record<string, unknown>[],
  TValueKey extends string = "value",
  TLabelKey extends string = "label",
>({
  options,
  valueKey = "value" as TValueKey,
  labelKey = "label" as TLabelKey,
  value,
  defaultValue,
  onValueChange,
  renderItem,
  renderGroup = defaultRenderGroup,
  ...props
}: TypedRadioGroupProps<TOptions, TValueKey, TLabelKey>) {
  // Extract the actual option type for internal use
  type TOption = ExtractOption<TOptions> & Record<string, unknown>;
  type TValue = ExtractOptionValue<TOptions, TValueKey>;

  // Generate a stable ID for this radio group instance
  const groupId = React.useId();

  // Track internal value for uncontrolled mode
  const [internalValue, setInternalValue] = React.useState<TValue | undefined>(
    defaultValue,
  );

  // Use controlled value if provided, otherwise use internal state
  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (serialized: string) => {
    const deserialized = deserializeValue(
      serialized,
      options as unknown as readonly TOption[],
      valueKey as keyof TOption,
    );

    // Update internal state for uncontrolled mode
    if (value === undefined) {
      setInternalValue(deserialized as TValue);
    }

    if (onValueChange) {
      onValueChange(deserialized as TValue);
    }
  };

  const serializedValue =
    currentValue !== undefined
      ? serializeValue(currentValue as RadioValueType)
      : undefined;
  const serializedDefaultValue =
    defaultValue !== undefined
      ? serializeValue(defaultValue as RadioValueType)
      : undefined;

  // Use provided renderItem or create default with labelKey
  const actualRenderItem =
    renderItem ??
    createDefaultRenderItem<TOption, keyof TOption>(labelKey as keyof TOption);

  // Render all items
  const renderItems = () => {
    return (options as unknown as readonly TOption[]).map((option, index) => {
      const optionValue = option[valueKey as keyof TOption] as RadioValueType;
      const serialized = serializeValue(optionValue);
      const isSelected = serializedValue === serialized;
      const itemId = generateItemId(index, groupId);
      const isDisabled = (option as { disabled?: boolean }).disabled ?? false;

      return (
        <React.Fragment key={serialized}>
          {actualRenderItem({
            option,
            isSelected,
            isDisabled,
            itemProps: {
              value: serialized,
              id: itemId,
              disabled: isDisabled,
            },
            Item: RadioGroupItem,
            Indicator: RadioGroupIndicator,
          })}
        </React.Fragment>
      );
    });
  };

  // Render the group content (items wrapped by renderGroup)
  const groupContent = renderGroup({
    children: renderItems(),
  });

  return (
    <RadioGroup
      value={serializedValue}
      defaultValue={serializedDefaultValue}
      onValueChange={handleValueChange}
      {...props}
    >
      {groupContent}
    </RadioGroup>
  );
}

export { TypedRadioGroup };
