import Section from "~/components/landing/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { siteConfig } from "~/lib/landing-config";

export default function FAQ() {
  return (
    <Section title="FAQ" subtitle="Frequently Asked Questions">
      <div className="max-w-3xl mx-auto mt-12">
        <Accordion type="single" collapsible className="w-full">
          {siteConfig.faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
