'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn, formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface FilterProps {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
  route?: string;
}

const Filter = ({
  filters,
  containerClasses,
  otherClasses,
  route,
}: FilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const filter = searchParams.get('filter');

  const [value, setValue] = useState(filter ?? '');

  useEffect(() => {
    if (value) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value,
      });

      router.push(newUrl, { scroll: false });
    } else {
      if (pathname === route) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keys: ['filter'],
        });
        router.push(newUrl, { scroll: false });
      }
    }
  }, [value, searchParams, filter, router, pathname, route]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={containerClasses}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`body-regular light-border background-light800_dark300 text-dark500_light700 justify-between border px-5 py-2.5 ${otherClasses}`}
          >
            {value
              ? filters.find((filter) => filter.value === value)?.name
              : 'Select a Filter...'}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={`body-regular light-border background-light800_dark300 text-dark500_light700 border p-0 ${otherClasses}`}
        >
          <Command>
            <CommandList>
              <CommandGroup>
                {filters.map((filter) => (
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
