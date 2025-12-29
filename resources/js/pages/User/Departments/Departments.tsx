import Table from '@/components/table/Table'
import TableBody from '@/components/table/TableBody'
import TableCell from '@/components/table/TableCell'
import TableHead from '@/components/table/TableHead'
import TableHeadCell from '@/components/table/TableHeadCell'
import TableRow from '@/components/table/TableRow'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Paginate } from '@/types/types'
import { Department } from '../Users/types'
import { Button } from '@/components/ui/button'
import Search from '@/components/Search'
import PaginateComponent from '@/components/Paginate'
import Modal from '@/components/Modal'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useDepartment } from './useDepartment'
import DepartmentController from '@/actions/App/Http/Controllers/DepartmentController'
import { useEffect } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import { SharedData } from '@/types'
import { allowedRoles } from '@/lib/allowedRoles'

const Departments = ({ departments, filter: search }: { departments: Paginate<Department>, filter: string }) => {
    const {
        handleToggleModal,
        isShowModal,
        data,
        handleChange,
        handleSubmit,
        errors,
        processing,
        department,
        isEdit,
        handleDelete
    } = useDepartment()

    const { data: filter, setData, get } = useForm<{ search: string }>({
        search: search ?? ""
    })

    const { auth } = usePage<SharedData>().props

    useEffect(() => {
        if (search === filter.search) return;

        const timeout = setTimeout(() => {
            get(DepartmentController.index.url(), {
                preserveState: true,
                replace: true
            })
        }, 400)

        return () => clearTimeout(timeout)
    }, [filter.search, get, search])

    return (
        <>
            <AuthLayout>
                <div className='space-y-2'>
                    <div className='flex justify-end'>
                        <Button onClick={() => handleToggleModal({ isEdit: false })}>Create</Button>
                    </div>
                    <Search value={filter.search || ""} onHandleChange={(e) => setData("search", e.target.value)} />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Name</TableHeadCell>
                                <TableHeadCell>Action</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departments.data.map((department) => (
                                <TableRow key={department.id}>
                                    <TableCell>{department.name}</TableCell>
                                    <TableCell>
                                        <div className='flex flex-col md:flex-row gap-2'>
                                            <Button variant={'secondary'} onClick={() => handleToggleModal({ isEdit: true, department })} >Edit</Button>
                                            {
                                                allowedRoles({ roles: ['admin'], role: auth.user?.role }) && (
                                                    <Button variant={'destructive'} onClick={() => handleDelete(department.id)}>Delete</Button>
                                                )
                                            }
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <PaginateComponent links={departments.links} />
                </div>
            </AuthLayout>
            <Modal title='Create Department' width={600} height={250} isOpen={isShowModal} onHandleClose={() => handleToggleModal({ isEdit, department })}>
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Name</FieldLabel>
                            {errors.name && (
                                <FieldError>{errors.name}</FieldError>
                            )}
                            <Input value={data.name} onChange={(e) => handleChange({ data: 'name', event: e })} placeholder='Department Name' />
                        </Field>
                    </FieldGroup>
                    <FieldGroup>
                        <Button disabled={processing} type='submit'>Save</Button>
                    </FieldGroup>
                </form>
            </Modal>
        </>
    )
}

export default Departments
