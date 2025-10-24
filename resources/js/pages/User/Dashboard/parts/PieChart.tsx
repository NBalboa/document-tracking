import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useMemo } from "react"

export const description = "A pie chart with a label"



export function ChartPieLabel({ documentsByDepartment }: { documentsByDepartment: { department_name: string, total: number }[] }) {


    const chartData = useMemo(() => {

        const firstToFourth = documentsByDepartment.slice(0, 4).map((item, index) => {
            return {
                name: item.department_name,
                value: item.total,
                fill: `var(--chart-${index + 1})`
            }
        });

        const others = documentsByDepartment.slice(4);

        const totalOthers = others.reduce((sum, item) => sum + item.total, 0);

        const resultOthers = { name: "Others", value: totalOthers }

        return [
            ...firstToFourth,
            ...(resultOthers.value > 1 ? [resultOthers] : []),
        ]
    }, [documentsByDepartment])

    const chartConfig = chartData.reduce((acc, item, index) => {
        acc[item.name] = {
            label: item.name,
            color: `var(--chart-${index + 1})`,
        }
        return acc
    }, {} as ChartConfig)




    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Documents by Department</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="value" label nameKey="name" />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="name" />}
                            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}




export default ChartPieLabel
