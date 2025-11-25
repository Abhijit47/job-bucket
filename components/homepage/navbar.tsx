import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { Button, buttonVariants } from '../ui/button';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { Separator } from '../ui/separator';
import viteLogo from '/vite.svg';

export const navlinks = [
  {
    id: crypto.randomUUID(),
    title: 'Explore Jobs',
    href: '#',
  },
  {
    id: crypto.randomUUID(),
    title: 'Company',
    href: '#',
  },
  {
    id: crypto.randomUUID(),
    title: 'Blog',
    href: '#',
  },
  {
    id: crypto.randomUUID(),
    title: 'Contact',
    href: '#',
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  return (
    <header className={'border-b border-muted-foreground'}>
      <nav className={'py-4 px-2 flex items-center justify-between'}>
        <a href='#' className={'inline-flex items-center gap-2'}>
          <img src={viteLogo} alt='logo' width={32} height={32} />
          <span className={'font-bold text-lg text-primary'}>JobWeez</span>
        </a>

        <div className={'hidden lg:block'}>
          {navlinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={buttonVariants({ variant: 'link' })}>
              {link.title}
            </a>
          ))}
        </div>

        <div className={'hidden lg:inline-flex items-center gap-2'}>
          <a
            href='#'
            className={buttonVariants({
              variant: 'outline',
              className: 'rounded-full!',
            })}>
            Log in
          </a>
          <a
            href='#'
            className={buttonVariants({
              variant: 'default',
              className: 'rounded-full!',
            })}>
            Register
          </a>
        </div>

        <div className={'lg:hidden'}>
          <Popover open={isOpen} onOpenChange={toggleMenu}>
            <PopoverTrigger asChild>
              <Button size={'icon-sm'} variant={'ghost'}>
                <MenuIcon />
              </Button>
            </PopoverTrigger>
            <PopoverAnchor>
              <PopoverContent align='end' className={'w-48 space-y-2 p-2'}>
                {navlinks.map((link) => (
                  <a
                    href={link.href}
                    key={link.id}
                    onClick={() => toggleMenu()}
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'link',
                      className: 'w-full justify-start hover:bg-accent',
                    })}>
                    {link.title}
                  </a>
                ))}

                <Separator />

                <div className={'inline-flex items-center gap-2'}>
                  <a
                    href='#'
                    className={buttonVariants({
                      variant: 'outline',
                      className: 'rounded-full!',
                      size: 'sm',
                    })}>
                    Log in
                  </a>
                  <a
                    href='#'
                    className={buttonVariants({
                      variant: 'default',
                      className: 'rounded-full!',
                      size: 'sm',
                    })}>
                    Register
                  </a>
                </div>
              </PopoverContent>
            </PopoverAnchor>
          </Popover>
        </div>
      </nav>
    </header>
  );
}
