'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import type * as React from 'react';
import { cn } from '../utils/cn';

export const Tabs = TabsPrimitive.Root;

export function TabsList({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
	return (
		<TabsPrimitive.List
			className={cn(
				'inline-flex h-8 items-center justify-center rounded-lg bg-muted p-0.5 text-muted-foreground',
				className,
			)}
			{...props}
		/>
	);
}

export function TabsTrigger({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
	return (
		<TabsPrimitive.Trigger
			className={cn(
				'inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-2.5 py-1 font-medium text-xs ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs',
				className,
			)}
			{...props}
		/>
	);
}

export function TabsContent({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			className={cn(
				'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
				className,
			)}
			{...props}
		/>
	);
}
