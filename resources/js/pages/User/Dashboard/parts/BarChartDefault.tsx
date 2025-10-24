
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Field, FieldLabel } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"

export const description = "A bar chart"

const chartConfig = {
    month: {
        label: "Total",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartBarDefault({
    allMonths,
    years,
    isShowYear,
    onHandleSelect,
    onHandleShowYear,
    data
}: {
    years: number[]
    allMonths: { month: string, total: number }[]
    isShowYear: boolean,
    onHandleShowYear: (value: boolean) => void,
    onHandleSelect: (value: string) => void,
    data?: number
}) {
    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                    <CardTitle className="w-full">Documents</CardTitle>
                    <Field className="w-full md:w-[300px]">
                        <FieldLabel>Year</FieldLabel>
                        <Popover open={isShowYear} onOpenChange={onHandleShowYear}>
                            <PopoverTrigger asChild>

                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={isShowYear}
                                    className="w-[200px] justify-between"
                                >
                                    {data
                                        ? years.find((year) => year === data)
                                        : "All"}

                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search year..." />
                                    <CommandList>
                                        <CommandEmpty>No Department found.</CommandEmpty>
                                        <CommandGroup>
                                            <CommandItem
                                                value={String(0)}
                                                onSelect={onHandleSelect}
                                            >
                                                <CheckIcon
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        data === 0 ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                All
                                            </CommandItem>
                                            {years.map((year) => (
                                                <CommandItem
                                                    key={year}
                                                    value={String(year)}
                                                    onSelect={onHandleSelect}
                                                >
                                                    <CheckIcon
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            data === year ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {year}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </Field>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} >
                    <BarChart accessibilityLayer data={allMonths}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="total" fill="var(--color-month)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}
