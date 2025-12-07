"use client";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { ExtractOption, ExtractOptionValue } from "@/lib/typed-utils";
import { cn } from "@/lib/utils";

// =============================================================================
// Types
// =============================================================================

/**
 * Supported value types for TypedCombobox.
 * Values are serialized to strings internally but typed correctly externally.
 */
export type ComboboxValueType = string | number | boolean;

/**
 * Default option type with value and label.
 * Use this as a reference for your custom option types.
 */
export type ComboboxOption<T extends ComboboxValueType = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

/**
 * A group of combobox options with a label.
 * @template TOption - The full option type including custom properties
 */
export type ComboboxOptionGroup<TOption> = {
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
export type ComboboxTriggerRenderProps<TOption> = {
  /** Currently selected option (undefined if none) */
  selectedOption: TOption | undefined;
  /** Placeholder text */
  placeholder: string;
  /** Whether the combobox is open */
  open: boolean;
  /** Whether the combobox is disabled */
  disabled: boolean;
  /** Default Button component */
  Button: typeof Button;
};

/**
 * Props passed to renderItem function.
 * @template TOption - The full option type including custom properties
 */
export type ComboboxItemRenderProps<TOption> = {
  /** The option data */
  option: TOption;
  /** Whether this option is currently selected */
  isSelected: boolean;
  /** Whether this option is disabled */
  isDisabled: boolean;
  /** Group this option belongs to (undefined if ungrouped) */
  group: ComboboxOptionGroup<TOption> | undefined;
  /** Props to spread on CommandItem */
  itemProps: {
    value: string;
    disabled?: boolean;
    onSelect: () => void;
  };
  /** Default item component */
  Item: typeof CommandItem;
};

/**
 * Props passed to renderGroup function.
 * @template TOption - The full option type including custom properties
 */
export type ComboboxGroupRenderProps<TOption> = {
  /** The group data */
  group: ComboboxOptionGroup<TOption>;
  /** Rendered items inside this group */
  children: React.ReactNode;
  /** Default group component */
  Group: typeof CommandGroup;
};

/**
 * Props passed to renderEmpty function.
 */
export type ComboboxEmptyRenderProps = {
  /** The current search query */
  searchQuery: string;
  /** Default empty component */
  Empty: typeof CommandEmpty;
};

/**
 * Props passed to renderContent function.
 */
export type ComboboxContentRenderProps = {
  /** Rendered items/groups */
  children: React.ReactNode;
  /** Default content components */
  Command: typeof Command;
  CommandInput: typeof CommandInput;
  CommandList: typeof CommandList;
  /** Current search query */
  searchQuery: string;
  /** Update search query */
  setSearchQuery: (query: string) => void;
  /** Search input placeholder */
  searchPlaceholder: string;
  /** Empty state component */
  emptyState: React.ReactNode;
};

/**
 * Core props for TypedCombobox (for documentation).
 */
export interface TypedComboboxBaseProps<
  TOptions extends
    | readonly Record<string, unknown>[]
    | readonly ComboboxOptionGroup<Record<string, unknown>>[],
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
  /** Placeholder text for the trigger button */
  placeholder?: string;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Text to show when no options match the search */
  emptyText?: string;
  /** Custom render for trigger */
  renderTrigger?: (
    props: ComboboxTriggerRenderProps<ExtractOption<TOptions>>,
  ) => React.ReactNode;
  /** Custom render for each item */
  renderItem?: (
    props: ComboboxItemRenderProps<ExtractOption<TOptions>>,
  ) => React.ReactNode;
  /** Custom render for each group */
  renderGroup?: (
    props: ComboboxGroupRenderProps<ExtractOption<TOptions>>,
  ) => React.ReactNode;
  /** Custom render for empty state */
  renderEmpty?: (props: ComboboxEmptyRenderProps) => React.ReactNode;
  /** Custom render for content wrapper */
  renderContent?: (props: ComboboxContentRenderProps) => React.ReactNode;
  /** Whether the combobox is disabled */
  disabled?: boolean;
  /** Whether the combobox is open (controlled) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Custom filter function for search */
  filterFn?: (option: ExtractOption<TOptions>, searchQuery: string) => boolean;
  /** Width of the popover content */
  popoverWidth?: string | number;
  /** Class name for the trigger button */
  triggerClassName?: string;
  /** Class name for the popover content */
  contentClassName?: string;
}

/**
 * Props for the TypedCombobox component.
 * @template TOptions - The options array type
 * @template TValueKey - The key used for the value property (default: "value")
 * @template TLabelKey - The key used for the label property (default: "label")
 */
export interface TypedComboboxProps<
  TOptions extends
    | readonly Record<string, unknown>[]
    | readonly ComboboxOptionGroup<Record<string, unknown>>[],
  TValueKey extends string = "value",
  TLabelKey extends string = "label",
> extends TypedComboboxBaseProps<TOptions, TValueKey, TLabelKey> {}

// =============================================================================
// Helpers
// =============================================================================

/**
 * Type guard to check if options are grouped
 */
function isGroupedOptions<TOption>(
  options: readonly TOption[] | readonly ComboboxOptionGroup<TOption>[],
): options is readonly ComboboxOptionGroup<TOption>[] {
  return options.length > 0 && "options" in (options[0] as object);
}

/**
 * Serialize a value to string for internal use
 */
function serializeValue<T extends ComboboxValueType>(value: T): string {
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
  options: readonly TOption[] | readonly ComboboxOptionGroup<TOption>[],
  valueKey: keyof TOption,
): TOption[keyof TOption] {
  const allOptions = isGroupedOptions(options)
    ? options.flatMap((group) => group.options)
    : options;

  const found = allOptions.find(
    (opt) => serializeValue(opt[valueKey] as ComboboxValueType) === serialized,
  );

  return found?.[valueKey] as TOption[keyof TOption];
}

/**
 * Find the selected option object from the current value.
 * Handles both flat and grouped options.
 */
function findSelectedOption<TOption extends Record<string, unknown>>(
  value: TOption[keyof TOption] | undefined,
  options: readonly TOption[] | readonly ComboboxOptionGroup<TOption>[],
  valueKey: keyof TOption,
): TOption | undefined {
  if (value === undefined) return undefined;

  const allOptions = isGroupedOptions(options)
    ? options.flatMap((group) => group.options)
    : options;

  return allOptions.find((opt) => opt[valueKey] === value);
}

/**
 * Default filter function - matches label against search query
 */
function defaultFilterFn<TOption extends Record<string, unknown>>(
  option: TOption,
  searchQuery: string,
  labelKey: keyof TOption,
): boolean {
  const label = String(option[labelKey] ?? "").toLowerCase();
  return label.includes(searchQuery.toLowerCase());
}

// =============================================================================
// Default Render Functions
// =============================================================================

function createDefaultRenderTrigger<
  TOption extends Record<string, unknown>,
  TLabelKey extends keyof TOption,
>(labelKey: TLabelKey, triggerClassName?: string) {
  return function defaultRenderTrigger({
    selectedOption,
    placeholder,
    open,
    disabled,
    Button: ButtonComponent,
  }: ComboboxTriggerRenderProps<TOption>): React.ReactNode {
    const label = selectedOption
      ? String(selectedOption[labelKey] ?? "")
      : placeholder;

    return (
      <ButtonComponent
        variant="outline"
        role="combobox"
        aria-expanded={open}
        disabled={disabled}
        className={cn("w-[200px] justify-between", triggerClassName)}
      >
        <span className="truncate">{label}</span>
        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </ButtonComponent>
    );
  };
}

function createDefaultRenderItem<
  TOption extends Record<string, unknown>,
  TLabelKey extends keyof TOption,
>(labelKey: TLabelKey) {
  return function defaultRenderItem({
    option,
    isSelected,
    itemProps,
    Item,
  }: ComboboxItemRenderProps<TOption>): React.ReactNode {
    const label = String(option[labelKey] ?? "");
    return (
      <Item {...itemProps}>
        <CheckIcon
          className={cn(
            "mr-2 h-4 w-4",
            isSelected ? "opacity-100" : "opacity-0",
          )}
        />
        {label}
      </Item>
    );
  };
}

function defaultRenderEmpty({
  Empty,
}: ComboboxEmptyRenderProps): React.ReactNode {
  return <Empty>No results found.</Empty>;
}

function defaultRenderContent({
  children,
  Command: CommandComponent,
  CommandInput: CommandInputComponent,
  CommandList: CommandListComponent,
  searchQuery,
  setSearchQuery,
  searchPlaceholder,
  emptyState,
}: ComboboxContentRenderProps): React.ReactNode {
  return (
    <CommandComponent shouldFilter={false}>
      <CommandInputComponent
        placeholder={searchPlaceholder}
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandListComponent>
        {emptyState}
        {children}
      </CommandListComponent>
    </CommandComponent>
  );
}

// =============================================================================
// Component
// =============================================================================

/**
 * A headless, type-safe combobox component with full TypeScript inference
 * and customizable rendering via render props.
 *
 * @example
 * ```tsx
 * // Default usage with value/label keys
 * <TypedCombobox
 *   placeholder="Select framework..."
 *   searchPlaceholder="Search frameworks..."
 *   options={[
 *     { value: "next", label: "Next.js" },
 *     { value: "remix", label: "Remix" },
 *     { value: "astro", label: "Astro" },
 *   ] as const}
 *   onValueChange={(value) => {
 *     // value: "next" | "remix" | "astro"
 *   }}
 * />
 *
 * // Custom keys usage with id/name
 * <TypedCombobox
 *   placeholder="Select user..."
 *   options={[
 *     { id: 1, name: "John Doe", email: "john@example.com" },
 *     { id: 2, name: "Jane Smith", email: "jane@example.com" },
 *   ] as const}
 *   valueKey="id"
 *   labelKey="name"
 *   onValueChange={(value) => {
 *     // value: 1 | 2
 *   }}
 * />
 * ```
 */
function TypedCombobox<
  TOptions extends
    | readonly Record<string, unknown>[]
    | readonly ComboboxOptionGroup<Record<string, unknown>>[],
  TValueKey extends string = "value",
  TLabelKey extends string = "label",
>({
  options,
  valueKey = "value" as TValueKey,
  labelKey = "label" as TLabelKey,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyText: _emptyText = "No results found.",
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  filterFn,
  popoverWidth = 200,
  triggerClassName,
  contentClassName,
  renderTrigger,
  renderItem,
  renderGroup,
  renderEmpty = defaultRenderEmpty,
  renderContent = defaultRenderContent,
}: TypedComboboxProps<TOptions, TValueKey, TLabelKey>) {
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

  // Track search query
  const [searchQuery, setSearchQuery] = React.useState("");

  // Use controlled value if provided, otherwise use internal state
  const currentValue = value !== undefined ? value : internalValue;

  const handleOpenChange = (newOpen: boolean) => {
    setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
    // Reset search when closing
    if (!newOpen) {
      setSearchQuery("");
    }
  };

  const handleSelect = (serialized: string) => {
    const deserialized = deserializeValue(
      serialized,
      options as readonly TOption[] | readonly ComboboxOptionGroup<TOption>[],
      valueKey as keyof TOption,
    );

    // Toggle selection - if same value is selected, deselect
    const newValue =
      currentValue === deserialized ? undefined : (deserialized as TValue);

    // Update internal state for uncontrolled mode
    if (value === undefined) {
      setInternalValue(newValue);
    }

    if (onValueChange && newValue !== undefined) {
      onValueChange(newValue);
    }

    handleOpenChange(false);
  };

  const selectedOption = findSelectedOption(
    currentValue as TOption[keyof TOption] | undefined,
    options as readonly TOption[] | readonly ComboboxOptionGroup<TOption>[],
    valueKey as keyof TOption,
  );

  const serializedValue =
    currentValue !== undefined
      ? serializeValue(currentValue as ComboboxValueType)
      : undefined;

  // Use provided renderTrigger or create default with labelKey
  const actualRenderTrigger: (
    props: ComboboxTriggerRenderProps<ExtractOption<TOptions>>,
  ) => React.ReactNode =
    renderTrigger ??
    (createDefaultRenderTrigger<TOption, keyof TOption>(
      labelKey as keyof TOption,
      triggerClassName,
    ) as (
      props: ComboboxTriggerRenderProps<ExtractOption<TOptions>>,
    ) => React.ReactNode);

  // Use provided renderItem or create default with labelKey
  const actualRenderItem =
    renderItem ??
    createDefaultRenderItem<TOption, keyof TOption>(labelKey as keyof TOption);

  // Filter options based on search query
  const filterOption = (option: TOption): boolean => {
    if (!searchQuery) return true;
    if (filterFn) {
      return filterFn(option as ExtractOption<TOptions>, searchQuery);
    }
    return defaultFilterFn(option, searchQuery, labelKey as keyof TOption);
  };

  // Get filtered options
  const getFilteredOptions = ():
    | readonly TOption[]
    | readonly ComboboxOptionGroup<TOption>[] => {
    const opts = options as
      | readonly TOption[]
      | readonly ComboboxOptionGroup<TOption>[];

    if (isGroupedOptions(opts)) {
      return opts
        .map((group) => ({
          ...group,
          options: group.options.filter(filterOption),
        }))
        .filter((group) => group.options.length > 0);
    }

    return (opts as readonly TOption[]).filter(filterOption);
  };

  const filteredOptions = getFilteredOptions();

  // Check if there are any results
  const hasResults = isGroupedOptions(filteredOptions)
    ? filteredOptions.some((g) => g.options.length > 0)
    : filteredOptions.length > 0;

  // Render a single item
  const renderSingleItem = (
    option: TOption,
    group: ComboboxOptionGroup<TOption> | undefined,
  ) => {
    const optionValue = option[valueKey as keyof TOption] as ComboboxValueType;
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
            onSelect: () => handleSelect(serialized),
          },
          Item: CommandItem,
        })}
      </React.Fragment>
    );
  };

  // Render all items (grouped or flat)
  const renderItems = () => {
    if (isGroupedOptions(filteredOptions)) {
      return filteredOptions.map((group) => {
        const groupChildren = group.options.map((option) =>
          renderSingleItem(
            option as TOption,
            group as ComboboxOptionGroup<TOption>,
          ),
        );

        if (renderGroup) {
          return (
            <React.Fragment key={group.label}>
              {renderGroup({
                group: group as ComboboxOptionGroup<ExtractOption<TOptions>>,
                children: groupChildren,
                Group: CommandGroup,
              })}
            </React.Fragment>
          );
        }

        // Default group rendering if renderGroup not provided
        return (
          <CommandGroup key={group.label} heading={group.label}>
            {groupChildren}
          </CommandGroup>
        );
      });
    }

    return (filteredOptions as readonly TOption[]).map((option) =>
      renderSingleItem(option, undefined),
    );
  };

  // Render empty state
  const emptyState = !hasResults
    ? renderEmpty({
        searchQuery,
        Empty: CommandEmpty,
      })
    : null;

  const popoverWidthStyle =
    typeof popoverWidth === "number" ? `${popoverWidth}px` : popoverWidth;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        {actualRenderTrigger({
          selectedOption: selectedOption as unknown as
            | ExtractOption<TOptions>
            | undefined,
          placeholder,
          open,
          disabled,
          Button,
        })}
      </PopoverTrigger>
      <PopoverContent
        className={cn("p-0", contentClassName)}
        style={{ width: popoverWidthStyle }}
      >
        {renderContent({
          children: renderItems(),
          Command,
          CommandInput,
          CommandList,
          searchQuery,
          setSearchQuery,
          searchPlaceholder,
          emptyState,
        })}
      </PopoverContent>
    </Popover>
  );
}

export { TypedCombobox };
