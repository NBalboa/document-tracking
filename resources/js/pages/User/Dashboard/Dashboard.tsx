import { AuthLayout } from "@/layouts/AuthLayout";
import ChartPieLabel from "./parts/PieChart";
import { ChartBarLabelCustom } from "./parts/BarChart";
import { ChartBarDefault } from "./parts/BarChartDefault";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import DashboardController from "@/actions/App/Http/Controllers/DashboardController";
import { File, User } from "lucide-react";
import DashboardCard from "./parts/DashboardCard";


const Dashboard = ({
    documentsByDepartment,
    documentsByLatestStatus,
    allMonths,
    years,
    year: searchYear,
    total
}: {
    documentsByDepartment: { department_name: string, total: number }[]
    documentsByLatestStatus: { latest_status: string, total: number }[]
    allMonths: { month: string, total: number }[],
    years: number[],
    year: string,
    total: {
        users: number,
        documents: number,
    }
}) => {
    const [isShowYears, setIsShowYears] = useState(false);
    const handleToggleIsShowYears = (value: boolean) => setIsShowYears(value);
    const [year, setYear] = useState<number | undefined>(searchYear ? Number(searchYear) : undefined)

    const handleSelectYear = (value: string) => {
        setYear(Number(value));
        setIsShowYears(false)

    }

    useEffect(() => {
        if (Number(searchYear) === year) return;

        router.get(DashboardController.index.url({
            query: {
                ...(year && year > 0 ? { year } : {})
            }
        }), {}, {
            replace: true,
            preserveState: true
        })
    }, [searchYear, year])



    return (
        <AuthLayout>
            <div className="space-y-3">
                <div className="flex flex-col md:flex-row gap-3">
                    <DashboardCard title="Users" sub={total.users} icon={<User className="text-primary-foreground" />} />
                    <DashboardCard title="Documents" sub={total.documents} icon={<File className="text-primary-foreground" />} />
                </div>
                <ChartBarDefault
                    data={year}
                    onHandleShowYear={handleToggleIsShowYears}
                    onHandleSelect={handleSelectYear}
                    isShowYear={isShowYears}
                    allMonths={allMonths}
                    years={years} />
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full">
                        <ChartBarLabelCustom documentsByLatestStatus={documentsByLatestStatus} />
                    </div>
                    <div className="w-full">
                        {documentsByDepartment.length ? (
                            <ChartPieLabel documentsByDepartment={documentsByDepartment} />
                        ) : undefined}
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Dashboard
