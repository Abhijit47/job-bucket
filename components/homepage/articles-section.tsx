import { ArrowUpCircleIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

type Article = {
  id: string;
  title: string;
  description: string;
  cover: string;
};

export const articles: Article[] = [
  {
    id: crypto.randomUUID(),
    title: 'Building a Winning Resume for Any Industry',
    description: `Learn how to craft a standout resume that highlights
your skills and experience, tailored to any industry...`,
    cover: '/vite.svg',
  },
  {
    id: crypto.randomUUID(),
    title: `How to Land Your Dream

Job in 2024`,
    description: `In todays competitive job market, securing your
dream job requires more than just submitting...
`,
    cover: '/vite.svg',
  },
  {
    id: crypto.randomUUID(),
    title: `The Ultimate Guide to

Crafting a Standout Resume`,
    description: `Your resume is your first impression make it count!
This guide walks you through everything you need t...`,
    cover: '/vite.svg',
  },
];

export default function ArticlesSection() {
  return (
    <section className={'max-w-[85em] mx-auto'}>
      <Card className={'rounded-none border-none shadow-none bg-transparent'}>
        <CardHeader className={'text-center'}>
          <CardDescription>ARTICLES</CardDescription>
          <CardTitle>
            <h2 className={'text-4xl font-medium'}>
              <span className={'block'}>Expert Guidance and</span>{' '}
              <span className={'block'}>Tips from Jobweez</span>
            </h2>
          </CardTitle>
        </CardHeader>

        <CardContent
          className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
          {articles.map((article) => (
            <Card key={article.id} className={'pb-0'}>
              <CardContent className={'group relative'}>
                <img
                  src={article.cover}
                  alt={`article-cover-${article.id}`}
                  className={
                    'w-full h-full object-cover grayscale group-hover:grayscale-25 transition-colors ease-in-out'
                  }
                />

                <CardAction className={'absolute -top-4 right-4'}>
                  <a href='#'>
                    <ArrowUpCircleIcon className={'size-8 rotate-45'} />
                  </a>
                </CardAction>

                <CardDescription
                  className={
                    'bg-background/35 dark:bg-background/5 backdrop-blur-sm text-background rounded-b-xl blur-in-xs absolute bottom-0 left-0 w-full h-fit p-4 flex flex-col justify-center'
                  }>
                  <h4
                    className={
                      'text-lg text-card-foreground dark:text-foreground font-semibold mb-2'
                    }>
                    {article.title.slice(0, 40)}...
                  </h4>
                  <p className={'text-card-foreground dark:text-foreground'}>
                    {article.description}
                  </p>
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </CardContent>

        <CardContent className={'flex items-center justify-center'}>
          <Button
            size={'lg'}
            variant={'secondary'}
            className={'rounded-full font-semibold'}>
            Read all articles
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
