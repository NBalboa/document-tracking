import { format } from "date-fns";

export const formatDate = ({ dateFormat = "MM/dd/yyyy", date }: { dateFormat?: string, date: string }) => {

    return format(new Date(date), dateFormat)
}
