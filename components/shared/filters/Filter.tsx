'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface FilterProps {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, containerClasses, otherClasses }: FilterProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={containerClasses}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`justify-between body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5 ${otherClasses}`}
          >
            {value
              ? filters.find((filter) => filter.value === value)?.name
              : 'Select a Filter...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={`p-0 body-regular light-border background-light800_dark300 text-dark500_light700 border ${otherClasses}`}
        >
          <Command>
            <CommandList>
              <CommandGroup>
                {filters.map((filter, index) => (
                  <CommandItem
                    key={filter.value}
                    value={filter.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === filter.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {filter.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default Filter;
