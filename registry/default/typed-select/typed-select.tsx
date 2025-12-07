"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ExtractOption, ExtractOptionValue } from "@/lib/typed-utils";

// =============================================================================
// Types
// =============================================================================

/**
 * Supported value types for TypedSelect.
 * Values are serialized to strings internally but typed correctly externally.
 */
export type SelectValueType = string | number | boolean;

/**
 * Default option type with value and label.
 * Use this as a reference for your custom option types.
 */
export type SelectOption<T extends SelectValueType = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

/**
 * A group of select options with a label.
 * @template TOption - The full option type including custom properties
 */
export type SelectOptionGroup<TOption> = {
  label: string;
  options: TOption[];
};

// =============================================================================
// Render Props Types
// =============================================================================

/**
 * Props passed to renderTrigger function.
 * @template TOption - The full option type including custom properties
 */
export type SelectTriggerRenderProps<TOption> = {
  /** Currently selected option (undefined if none) */
  selectedOption: TOption | undefined;
  /** Placeholder text */
  placeholder: string;
  /** Whether the select is open */
  open: boolean;
  /** Whether the select is disabled */
  disabled: boolean;
  /** Default trigger component */
  Trigger: typeof SelectTrigger;
  /** Default value component */
  Value: typeof SelectValue;
};

/**
 * Props passed to renderItem function.
 * @template TOption - The full option type including custom properties
 */
export type SelectItemRenderProps<TOption> = {
  /** The option data */
  option: TOption;
  /** Whether this option is currently selected */
  isSelected: boolean;
  /** Whether this option is disabled */
  isDisabled: boolean;
  /** Group this option belongs to (undefined if ungrouped) */
  group: SelectOptionGroup<TOption> | undefined;
  /** Props to spread on SelectItem */
  itemProps: {
    value: string;
    disabled?: boolean;
  };
  /** Default item component */
  Item: typeof SelectItem;
};

/**
 * Props passed to renderGroup function.
 * @template TOption - The full option type including custom properties
 */
export type SelectGroupRenderProps<TOption> = {
  /** The group data */
  group: SelectOptionGroup<TOption>;
  /** Rendered items inside this group */
  children: React.ReactNode;
  /** Default group component */
  Group: typeof SelectGroup;
  /** Default label component */
  Label: typeof SelectLabel;
};

/**
 * Props passed to renderContent function.
 */
export type SelectContentRenderProps = {
  /** Rendered items/groups */
  children: React.ReactNode;
  /** Default content component */
  Content: typeof SelectContent;
};

/**
 * Core props for TypedSelect (for documentation).
 * The actual component also accepts all Select props.
 */
export interface TypedSelectBaseProps<
  TOptions extends
    | readonly Record<string, unknown>[]
    | readonly SelectOptionGroup<Record<string, unknown>>[],
  TValueKey extends string = "value",
  TLabelKey extends string = "label",
> {
  /** Array of options or grouped options */
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
  /** Placeholder text (passed to renderTrigger) */
  placeholder?: string;
  /** Custom render for trigger */
  renderTrigger?: (
    props: SelectTriggerRenderProps<ExtractOption<TOptions>>,
  ) => React.ReactNode;
  /** Custom render for each item */
  renderItem?: (
    props: SelectItemRenderProps<ExtractOption<TOptions>>,
  ) => React.ReactNode;
  /** Custom render for each group (required when using grouped options) */
  renderGroup?: (
    props: SelectGroupRenderProps<ExtractOption<TOptions>>,
  ) => React.ReactNode;
  /** Custom render for content wrapper */
  renderContent?: (props: SelectContentRenderProps) => React.ReactNode;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is open (controlled) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** The name of the select (for form submission) */
  name?: string;
  /** Whether selection is required */
  required?: boolean;
}

/**
 * Props for the TypedSelect component.
 * @template TOptions - The options array type
 * @template TValueKey - The key used for the value property (default: "value")
 * @template TLabelKey - The key used for the label property (default: "label")
 */
export interface TypedSelectProps<
  TOptions extends
    | readonly Record<string, unknown>[]
    | readonly SelectOptionGroup<Record<string, unknown>>[],
  TValueKey extends string = "value",
  TLabelKey extends string = "label",
> extends Omit<
      React.ComponentProps<typeof Select>,
      "value" | "defaultValue" | "onValueChange" | "children"
    >,
    TypedSelectBaseProps<TOptions, TValueKey, TLabelKey> {}

// =============================================================================
// Helpers
// =============================================================================

/**
 * Type guard to check if options are grouped
 */
function isGroupedOptions<TOption>(
  options: readonly TOption[] | readonly SelectOptionGroup<TOption>[],
): options is readonly SelectOptionGroup<TOption>[] {
  return options.length > 0 && "options" in (options[0] as object);
}

/**
 * Serialize a value to string for internal use with Radix Select
 */
function serializeValue<T extends SelectValueType>(value: T): string {
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
  options: readonly TOption[] | readonly SelectOptionGroup<TOption>[],
  valueKey: keyof TOption,
): TOption[keyof TOption] {
  const allOptions = isGroupedOptions(options)
    ? options.flatMap((group) => group.options)
    : options;

  const found = allOptions.find(
    (opt) => serializeValue(opt[valueKey] as SelectValueType) === serialized,
  );

  return found?.[valueKey] as TOption[keyof TOption];
}

/**
 * Find the selected option object from the current value.
 * Handles both flat and grouped options.
 */
function findSelectedOption<TOption extends Record<string, unknown>>(
  value: TOption[keyof TOption] | undefined,
  options: readonly TOption[] | readonly SelectOptionGroup<TOption>[],
  valueKey: keyof TOption,
): TOption | undefined {
  if (value === undefined) return undefined;

  const allOptions = isGroupedOptions(options)
    ? options.flatMap((group) => group.options)
    : options;

  return allOptions.find((opt) => opt[valueKey] === value);
}

// =============================================================================
// Default Render Functions
// =============================================================================

function defaultRenderTrigger<TOption>({
  placeholder,
  Trigger,
  Value,
}: SelectTriggerRenderProps<TOption>): React.ReactNode {
  return (
    <Trigger>
      <Value placeholder={placeholder} />
    </Trigger>
  );
}

function createDefaultRenderItem<
  TOption extends Record<string, unknown>,
  TLabelKey extends keyof TOption,
>(labelKey: TLabelKey) {
  return function defaultRenderItem({
    option,
    itemProps,
    Item,
  }: SelectItemRenderProps<TOption>): React.ReactNode {
    const label = option[labelKey];
    return <Item {...itemProps}>{String(label ?? "")}</Item>;
  };
}

function defaultRenderContent({
  children,
  Content,
}: SelectContentRenderProps): React.ReactNode {
  return <Content>{children}</Content>;
}

// =============================================================================
// Component
// =============================================================================

/**
 * A headless, type-safe select component with full TypeScript inference
 * and customizable rendering via render props.
 *
 * @example
 * ```tsx
 * // Default usage with value/label keys
 * <TypedSelect
 *   placeholder="Select fruit"
 *   options={[
 *     { value: "apple", label: "Apple" },
 *     { value: "banana", label: "Banana", description: "Yellow fruit" },
 *   ] as const}
 *   renderTrigger={({ placeholder, selectedOption, Trigger, Value }) => (
 *     <Trigger>
 *       <Value placeholder={placeholder} />
 *     </Trigger>
 *   )}
 *   renderItem={({ option, itemProps, Item }) => (
 *     <Item {...itemProps}>
 *       <div>
 *         <span>{option.label}</span>
 *         {option.description && <p>{option.description}</p>}
 *       </div>
 *     </Item>
 *   )}
 *   renderContent={({ children, Content }) => (
 *     <Content>{children}</Content>
 *   )}
 *   onValueChange={(value) => {
 *     // value: "apple" | "banana"
 *   }}
 * />
 *
 * // Custom keys usage with id/name
 * <TypedSelect
 *   placeholder="Select user"
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
function TypedSelect<
  TOptions extends
    | readonly Record<string, unknown>[]
    | readonly SelectOptionGroup<Record<string, unknown>>[],
  TValueKey extends string = "value",
  TLabelKey extends string = "label",
>({
  options,
  valueKey = "value" as TValueKey,
  labelKey = "label" as TLabelKey,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select an option",
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  renderTrigger = defaultRenderTrigger,
  renderItem,
  renderGroup,
  renderContent = defaultRenderContent,
  ...props
}: TypedSelectProps<TOptions, TValueKey, TLabelKey>) {
  // Extract the actual option type for internal use
  type TOption = ExtractOption<TOptions> & Record<string, unknown>;
  type TValue = ExtractOptionValue<TOptions, TValueKey>;

  // Track open state internally
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen ?? internalOpen;

  // Track internal value for uncontrolled mode
  const [internalValue, setInternalValue] = React.useState<TValue | undefined>(
    defaultValue,
  );

  // Use controlled value if provided, otherwise use internal state
  const currentValue = value !== undefined ? value : internalValue;

  const handleOpenChange = (newOpen: boolean) => {
    setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const handleValueChange = (serialized: string) => {
    const deserialized = deserializeValue(
      serialized,
      options as readonly TOption[] | readonly SelectOptionGroup<TOption>[],
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

  const selectedOption = findSelectedOption(
    currentValue as TOption[keyof TOption] | undefined,
    options as readonly TOption[] | readonly SelectOptionGroup<TOption>[],
    valueKey as keyof TOption,
  );
  const serializedValue =
    currentValue !== undefined
      ? serializeValue(currentValue as SelectValueType)
      : undefined;
  const serializedDefaultValue =
    defaultValue !== undefined
      ? serializeValue(defaultValue as SelectValueType)
      : undefined;

  // Use provided renderItem or create default with labelKey
  const actualRenderItem =
    renderItem ??
    createDefaultRenderItem<TOption, keyof TOption>(labelKey as keyof TOption);

  // Render a single item
  const renderSingleItem = (
    option: TOption,
    group: SelectOptionGroup<TOption> | undefined,
  ) => {
    const optionValue = option[valueKey as keyof TOption] as SelectValueType;
    const serialized = serializeValue(optionValue);
    const isSelected = serializedValue === serialized;
    const isDisabled = (option as { disabled?: boolean }).disabled ?? false;

    return (
      <React.Fragment key={serialized}>
        {actualRenderItem({
          option,
          isSelected,
          isDisabled,
          group,
          itemProps: {
            value: serialized,
            disabled: isDisabled,
          },
          Item: SelectItem,
        })}
      </React.Fragment>
    );
  };

  // Render all items (grouped or flat)
  const renderItems = () => {
    const opts = options as
      | readonly TOption[]
      | readonly SelectOptionGroup<TOption>[];

    if (isGroupedOptions(opts)) {
      return opts.map((group) => {
        const groupChildren = group.options.map((option) =>
          renderSingleItem(option, group),
        );

        if (renderGroup) {
          return (
            <React.Fragment key={group.label}>
              {renderGroup({
                group: group as SelectOptionGroup<ExtractOption<TOptions>>,
                children: groupChildren,
                Group: SelectGroup,
                Label: SelectLabel,
              })}
            </React.Fragment>
          );
        }

        // Default group rendering if renderGroup not provided
        return (
          <SelectGroup key={group.label}>
            <SelectLabel>{group.label}</SelectLabel>
            {groupChildren}
          </SelectGroup>
        );
      });
    }

    return (opts as readonly TOption[]).map((option) =>
      renderSingleItem(option, undefined),
    );
  };

  return (
    <Select
      value={serializedValue}
      defaultValue={serializedDefaultValue}
      onValueChange={handleValueChange}
      open={open}
      onOpenChange={handleOpenChange}
      disabled={disabled}
      {...props}
    >
      {renderTrigger({
        selectedOption: selectedOption as ExtractOption<TOptions> | undefined,
        placeholder,
        open,
        disabled,
        Trigger: SelectTrigger,
        Value: SelectValue,
      })}
      {renderContent({
        children: renderItems(),
        Content: SelectContent,
      })}
    </Select>
  );
}

export { TypedSelect };
