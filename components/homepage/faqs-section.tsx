import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

export const faqs = [
  {
    id: crypto.randomUUID(),
    question: 'How do I start my job search on Jobweez?',
    answer: `To start your job search, simply create a free account on Jobweez, complete your
profile, and begin exploring job listings that match your skills and interests. You can
filter jobs by location, industry, and job type to find the best opportunities for you.`,
  },
  {
    id: crypto.randomUUID(),
    question: 'Is Jobweez free to use?',
    answer: `To start your job search, simply create a free account on Jobweez, complete your
profile, and begin exploring job listings that match your skills and interests. You can
filter jobs by location, industry, and job type to find the best opportunities for you.`,
  },
  {
    id: crypto.randomUUID(),
    question: 'How can I track my job applications?',
    answer: `To start your job search, simply create a free account on Jobweez, complete your
profile, and begin exploring job listings that match your skills and interests. You can
filter jobs by location, industry, and job type to find the best opportunities for you.`,
  },
  {
    id: crypto.randomUUID(),
    question: 'Can I get job alerts based on my preferences?',
    answer: `To start your job search, simply create a free account on Jobweez, complete your
profile, and begin exploring job listings that match your skills and interests. You can
filter jobs by location, industry, and job type to find the best opportunities for you.`,
  },
  {
    id: crypto.randomUUID(),
    question: 'Can I apply to multiple jobs at once?',
    answer: `To start your job search, simply create a free account on Jobweez, complete your
profile, and begin exploring job listings that match your skills and interests. You can
filter jobs by location, industry, and job type to find the best opportunities for you.`,
  },
];

export default function FaqsSection() {
  return (
    <section className={'max-w-[85em] mx-auto'}>
      <Card
        className={
          'grid grid-cols-3 rounded-none border-none shadow-none bg-transparent'
        }>
        <Card
          className={
            'col-span-full lg:col-span-1 rounded-none border-none shadow-none bg-transparent'
          }>
          <CardHeader>
            <CardTitle>
              <h4 className={'text-3xl font-semibold'}>
                <span className={'block'}>Frequently</span>
                <span className={'block'}>Asked Questions</span>
              </h4>
            </CardTitle>
            <CardDescription>
              <p className={'text-base text-muted-foreground'}>
                Have another question? Please contact our team!
              </p>
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              size={'lg'}
              className={'bg-foreground rounded-full text-base'}>
              Contact Our Team
            </Button>
          </CardFooter>
        </Card>

        <Card
          className={
            'col-span-full lg:col-span-2 rounded-none border-none shadow-none bg-transparent'
          }>
          <CardContent>
            <Accordion type='single' collapsible className='w-full'>
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={`item-${faq.id}`}
                  className={'border-none'}>
                  <AccordionTrigger
                    className={
                      'ring-1 ring-accent px-6 text-xl font-semibold py-6 rounded-xl'
                    }>
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent
                    className={
                      'bg-muted-foreground/10 p-4 text-base rounded-xl'
                    }>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </Card>
    </section>
  );
}
