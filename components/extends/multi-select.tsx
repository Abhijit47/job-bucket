'use client';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronsUpDownIcon, XCircleIcon } from 'lucide-react';
import * as React from 'react';
import { buttonVariants } from '../ui/button';

// Option interface
interface Option {
  value: string;
  label: string;
}

type MultiSelectV1Props = {
  options: readonly Option[];
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  inputPlaceholder?: string;
  emptyPlaceholder?: string;
  className?: string;
  multiple?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectV1Props>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Select...',
      inputPlaceholder,
      emptyPlaceholder,
      className,
      multiple = false,
      ...props
    },
    ref
  ) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);

    const handleSelect = (selectedValue: string) => {
      if (multiple) {
        const values = Array.isArray(value) ? value : [];
        const newValue = values.includes(selectedValue)
          ? values.filter((v) => v !== selectedValue)
          : [...values, selectedValue];
        onChange?.(newValue);
      }
      // else {
      //   onChange?.(selectedValue);
      //   setIsOpen(false);
      // }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (multiple) {
        onChange?.([]);
      } else {
        // onChange?.('');
        onChange?.([]);
      }
    };

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            tabIndex={0}
            role='button'
            onClick={() => setIsOpen((open) => !open)}
            ref={ref}
            {...props}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'flex cursor-pointer items-center justify-between',
              className
            )}>
            <div
              className={cn(
                'items-center gap-1 overflow-hidden text-sm',
                multiple
                  ? 'flex grow flex-wrap '
                  : 'inline-flex whitespace-nowrap'
              )}>
              {value && value.length > 0 ? (
                multiple ? (
                  options
                    .filter(
                      (option) =>
                        Array.isArray(value) && value.includes(option.value)
                    )
                    .map((option) => (
                      <span
                        key={option.value}
                        className='inline-flex items-center gap-1 rounded-md border py-0.5 pl-2 pr-1 text-xs font-medium text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'>
                        <span>{option.label}</span>
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            handleSelect(option.value);
                          }}
                          className='flex items-center rounded-sm px-px text-muted-foreground/60 hover:bg-accent hover:text-muted-foreground'>
                          <XCircleIcon className={'size-4'} />
                        </span>
                      </span>
                    ))
                ) : // options.find((opt) => opt.value === value)?.label
                null
              ) : (
                <span className='mr-auto text-muted-foreground'>
                  {placeholder}
                </span>
              )}
            </div>
            <div className='flex items-center self-stretch pl-1 text-muted-foreground/60 hover:text-foreground [&>div]:flex [&>div]:items-center [&>div]:self-stretch'>
              {value && value.length > 0 ? (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    handleClear(e);
                  }}>
                  <XCircleIcon className='size-4' />
                </div>
              ) : (
                <div>
                  <ChevronsUpDownIcon className='size-4' />
                </div>
              )}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className='w-(--radix-popover-trigger-width) p-0'
          align='start'>
          <Command>
            <div className='relative'>
              <CommandInput
                value={searchTerm}
                onValueChange={(e) => setSearchTerm(e)}
                placeholder={inputPlaceholder ?? 'Search...'}
                className='h-9'
              />
              {searchTerm && (
                <div
                  className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-muted-foreground hover:text-foreground'
                  onClick={() => setSearchTerm('')}>
                  <XCircleIcon className='size-4' />
                </div>
              )}
            </div>
            <CommandEmpty>
              {emptyPlaceholder ?? 'No results found.'}
            </CommandEmpty>
            <CommandGroup>
              <ScrollArea>
                <div className='max-h-64'>
                  {options.map((option) => {
                    const isSelected =
                      Array.isArray(value) && value.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        // value={option.value}
                        onSelect={() => handleSelect(option.value)}>
                        {multiple && (
                          <div
                            className={cn(
                              'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                              isSelected
                                ? 'bg-primary text-primary-foreground'
                                : 'opacity-50 [&_svg]:invisible'
                            )}>
                            <CheckIcon className={'size-4'} />
                          </div>
                        )}
                        <span>{option.label}</span>
                        {/* {!multiple && option.value === value && (
                          <CheckIcon
                            className={cn(
                              'ml-auto',
                              option.value === value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        )} */}
                      </CommandItem>
                    );
                  })}
                </div>
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
export default MultiSelect;
