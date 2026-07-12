

import React, { useEffect, useState } from 'react';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from './command';

import { Popover, PopoverContent, PopoverTrigger } from '@remis/ares/components/popover';

import { Button } from './button';
import { cn } from '../utils';

import { Check } from '@remis/icons/check';
import { ChevronsUpDown } from '@remis/icons/chevron';
import { X } from '@remis/icons/close';

export type SelectOption = {
  id: string | number;
  value: string | number;
  label: string | number;
  disabled?: boolean;
};

type Props = {
  options: SelectOption[];
  placeholder: string;
  width?: string;
  // eslint-disable-next-line no-unused-vars
  onTextChange?: (_: string) => void;
  // eslint-disable-next-line no-unused-vars
  onSelection: (_: SelectOption | undefined) => void;
  selected?: SelectOption | undefined;
};

export function SearchableSelect(
  { options, placeholder, width, onTextChange, onSelection, selected }: Props = {
    options: [],
    placeholder: 'Search',
    width: '200px',
    onSelection: () => {},
  },
) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(selected);

  useEffect(() => {
    setSelectedOption(selected);
    setValue(selected?.value as string);
  }, [selected]);

  function handleSelect(currentValue: string) {
    setValue(currentValue === value ? '' : currentValue);
    setOpen(false);
    const selectedValue = options.find((item) => item.value === currentValue);
    if (!selectedValue) return;

    setSelectedOption(selectedValue);
    onSelection(selectedValue);
  }
  const widthClass = width === 'full' ? 'w-full' : `w-[${width}]`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={`${widthClass} justify-between`}>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`justify-between w-full`}
          >
            {value ? selectedOption?.label : placeholder}
            {value ? (
              <X
                onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen(false);
                  setValue('');
                  onSelection(undefined);
                }}
                className="ml-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
              />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className={`w-[--radix-popover-trigger-width] p-0`}>
        <Command shouldFilter={!!onTextChange}>
          <CommandInput
            placeholder={placeholder}
            onValueChange={(ev: string) => onTextChange?.(ev || '')}
          />
          <CommandEmpty>No data found.</CommandEmpty>
          <CommandList>
            {options.map((item) => (
              <CommandItem
                disabled={Boolean(item.disabled)}
                key={item.id}
                value={item.value as string}
                onSelect={handleSelect}
              >
                <Check
                  className={cn('mr-2 h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
