import { Link } from "@/types/types"
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"
import { Link as LinkInertia } from "@inertiajs/react"



const Paginate = ({ links }: { links: Link[] }) => {
    return (
        <>
            {links.length > 3 && (
                <Pagination>
                    <PaginationContent>
                        {links.map((link) => {
                            return (
                                <PaginationItem key={link.label} className={
                                    cn([
                                        ((link.label.includes('Previous') || link.label.includes('Next')) && 'hidden')
                                    ])
                                }>
                                    <LinkInertia href={link.url ?? '#'} className={cn(
                                        buttonVariants({
                                            variant: link.active ? "outline" : "ghost",
                                            size: 'icon',
                                        }),
                                    )} preserveState={true}>{link.label}</LinkInertia>
                                </PaginationItem>
                            )
                        })}
                    </PaginationContent>
                </Pagination>
            )}

        </>
    )
}

export default Paginate
