"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b my-1 sm:my-2", className)}
    style={{ borderColor: 'hsl(var(--line-color))' }}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-3 sm:py-4 px-2 sm:px-4 font-medium transition-all [&[data-state=open]_.accordion-plus]:hidden [&[data-state=open]_.accordion-minus]:block text-left text-black font-mono accordion-trigger-custom",
        className
      )}
      {...props}
    >
      {children}
      <span className="h-6 w-6 sm:h-8 sm:w-8 shrink-0 flex items-center justify-center text-lg sm:text-2xl transition-transform duration-200" style={{ color: 'hsl(var(--signal))', fontWeight: '500' }}>
        <span className="accordion-plus">+</span>
        <span className="accordion-minus hidden">-</span>
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = "AccordionPrimitive.Trigger.displayName"

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className="text-black leading-relaxed accordion-content px-2 sm:px-4" style={{ 
      fontFamily: 'zz_type_mon, sans-serif', 
      fontWeight: '400',
      paddingTop: '8px',
      paddingBottom: '16px'
    }}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = "AccordionPrimitive.Content.displayName"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }