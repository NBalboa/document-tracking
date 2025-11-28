import Table from '@/components/table/Table'
import TableHead from '@/components/table/TableHead'
import TableHeadCell from '@/components/table/TableHeadCell'
import TableRow from '@/components/table/TableRow'
import { Button, buttonVariants } from '@/components/ui/button'
import { AuthLayout } from '@/layouts/AuthLayout'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import { Document, DocumentType } from './types'
import { Paginate } from '@/types/types'
import TableBody from '@/components/table/TableBody'
import TableCell from '@/components/table/TableCell'
import PaginateComponent from '@/components/Paginate'
import { Link, useForm, usePage } from '@inertiajs/react'
import DocumentController from '@/actions/App/Http/Controllers/DocumentController'
import Search from '@/components/Search'
import { SharedData, User } from '@/types'
import { Track, TrackStatus } from '../Track/types'
import { Badge } from '@/components/ui/badge'
import CreateDocumentModal from './parts/CreateDocumentModal'
import QRCode from './parts/QRCode'
import useDocumentScanner from './hooks/useDocumentScanner'
import { useDocuments } from './hooks/useDocuments'
import UpdateDocumentModal from './parts/UpdateDocumentModal'
import ScanDocumentModal from './parts/ScanDocumentModal'
import EditDocumentModal from './parts/EditDocumentModal'
import useEditDocument from './hooks/useEditDocument'
import { allowedRoles } from '@/lib/allowedRoles'
import { isOwner } from '@/lib/isOwner'


const Documents = ({
    documents,
    documentTypes,
    filter: search,
    statuses
}: {
    documents:
    Paginate<Document & {
        document_type: DocumentType,
        user: User,
        latest_track: Track
    }>,
    documentTypes: DocumentType[],
    filter: string,
    statuses: TrackStatus[]
}) => {

    const {
        handleToggleModal,
        isShowModal,
        data,
        handleChange,
        handleSubmit,
        handleSelect,
        handleToggleList,
        isShowList,
        errors,
        processing,
        activeDocument,
        handleToggleToggleDocument,
        isShowEditDocument,
        updateData,
        updateErrors,
        isShowStatus,
        handleToggleIsShowStatus,
        handleSelectStatus,
        handleSubmitUpdate,
        handleChangeUpdate,
        handleDelete,
        wrapperRef,
        handlePrint
    } = useDocuments();

    const {
        handleToggleQrScanner,
        isShowQrScanner,
        videoRef,
        data: dataQR,
        errors: errorsQR,
        handleToggleIsShowStatus: handleToggleIsShowStatusQR,
        isShowStatus: isShowStatusQR,
        handleSelectStatus: handleSelectStatusQR,
        handleChange: handleChangeQR,
        isManual,
        handleToggleIsManual,
        qrResult,
        handleSubmitUpdate: handleSubmitUpdateQr,
        setQrResult,
    } = useDocumentScanner()


    const {
        isShowModal: isShowModalEdit,
        toggleIsShowModal: toggleIsShowModalEdit,
        editDocument,
        isShowList: isShowListEdit,
        handleToggleList: handleToggleListEdit,
        data: dataEdit,
        errors: errorsEdit,
        handleChange: handleChangeEdit,
        handleSelect: handleSelectEdit,
        handleSubmit: handleSubmitEdit,
        processing: processingEdit
    } = useEditDocument()

    const { data: filter, setData, get } = useForm<{ search: string }>({
        search: search ?? ""
    })

    useEffect(() => {

        if (search === filter.search) return;

        const timeout = setTimeout(() => {
            get(DocumentController.index.url(), {
                preserveState: true,
                replace: true
            })
        }, 400)

        return () => clearTimeout(timeout)
    }, [filter.search, get, search])

    const { auth } = usePage<SharedData>().props

    return (
        <>
            {auth.user && (
                <AuthLayout>
                    <div className='space-y-2'>
                        <div className='flex justify-end gap-1'>
                            <Button onClick={handleToggleQrScanner}>Scan</Button>
                            <Button onClick={handleToggleModal}>Create</Button>

                        </div>
                        <Search value={filter.search || ""} onHandleChange={(e) => setData("search", e.target.value)} />
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell>ID</TableHeadCell>
                                    <TableHeadCell>Name</TableHeadCell>
                                    <TableHeadCell>Type</TableHeadCell>
                                    <TableHeadCell>Description</TableHeadCell>
                                    <TableHeadCell>Status</TableHeadCell>
                                    <TableHeadCell>QR Code</TableHeadCell>
                                    <TableHeadCell>Created By</TableHeadCell>
                                    <TableHeadCell>Action</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {documents.data.map((data, index) => (
                                    <TableRow key={data.id + String(index)}>
                                        <TableCell>{data.id}</TableCell>
                                        <TableCell>{data.name}</TableCell>
                                        <TableCell>{data.document_type.name}</TableCell>
                                        <TableCell>{data.description}</TableCell>
                                        <TableCell>
                                            {
                                                data.latest_track?.status && (
                                                    <Badge className='uppercase'>{data.latest_track?.status ?? ""}</Badge>
                                                )
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <QRCode id={data.id} wrapperRef={wrapperRef} />
                                        </TableCell>
                                        <TableCell>{data.user.first_name} {data.user.last_name}</TableCell>
                                        <TableCell>
                                            <div className='flex flex-col gap-1 md:flex-row'>
                                                <Link className={cn(buttonVariants({ variant: 'link' }))} href={`${DocumentController.index.url()}/tracks/${data.id}`}>
                                                    Track
                                                </Link>
                                                <Button onClick={handlePrint} className={cn([buttonVariants({ variant: "outline" }), "text-black"])}>
                                                    Print
                                                </Button>
                                                <Button
                                                    className={
                                                        cn(allowedRoles({ roles: ['admin', 'staff'], role: auth.user?.role }) ||
                                                            isOwner({ ownerId: data.latest_track.user_id, id: auth.user?.id })
                                                            ? '' : 'hidden'
                                                        )
                                                    }
                                                    onClick={() => handleToggleToggleDocument(data)}>
                                                    Update
                                                </Button>
                                                <Button
                                                    className={cn(
                                                        (allowedRoles({ roles: ['admin', 'staff'], role: auth.user?.role }) ||
                                                            isOwner({ ownerId: data.user.id, id: auth.user?.id })) ? '' : 'hidden'
                                                    )}
                                                    variant={'secondary'} onClick={() => toggleIsShowModalEdit(data)}>Edit</Button>
                                                <Button className={
                                                    cn(!allowedRoles({ roles: ['admin'], role: auth.user?.role }) && 'hidden')} variant={'destructive'} onClick={() => handleDelete(data.id)}>Delete</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <PaginateComponent links={documents.links} />
                    </div>
                </AuthLayout>
            )}
            <CreateDocumentModal
                data={data}
                documentTypes={documentTypes}
                errors={errors}
                isShowList={isShowList}
                onHandleChangeDescription={(e) => handleChange({ data: 'description', e })}
                onHandleChangeName={(e) => handleChange({ data: 'name', e })}
                onHandleChangeType={(e) => handleChange({ data: 'type', e })}
                onHandleSelect={handleSelect}
                onHandleSubmit={handleSubmit}
                onHandleToggleList={handleToggleList}
                onHandleToggleModal={handleToggleModal}
                processing={processing}
                isShowModal={isShowModal}
            />
            <UpdateDocumentModal
                data={updateData}
                errors={updateErrors}
                isOpen={isShowEditDocument}
                isShowStatus={isShowStatus}
                onHandleChangeRemarks={(e) => handleChangeUpdate({ data: 'remarks', e })}
                onHandleClose={() => handleToggleToggleDocument()}
                onHandleSelectStatus={handleSelectStatus}
                onHandleSubmit={handleSubmitUpdate}
                onHandleToggleStatus={handleToggleIsShowStatus}
                statuses={statuses}
                activeDocument={activeDocument}
            />
            <ScanDocumentModal
                documentId={qrResult || ""}
                onHandleChangeDocumnetId={(e) => setQrResult(e.target.value)}
                onHandleSubmit={handleSubmitUpdateQr}
                handleToggleIsManual={handleToggleIsManual}
                isManual={isManual}
                videoRef={videoRef}
                data={dataQR}
                errors={errorsQR}
                isOpen={isShowQrScanner}
                isShowStatus={isShowStatusQR}
                onHandleChangeRemarks={(e) => handleChangeQR({ data: "remarks", e })}
                onHandleSelectStatus={handleSelectStatusQR}
                onHandleToggleIsShowStatus={handleToggleIsShowStatusQR}
                onHandleToggleQrScanner={handleToggleQrScanner}
                statuses={statuses}
            />
            <EditDocumentModal
                document={editDocument}
                isOpen={isShowModalEdit}
                onHandleClose={() => toggleIsShowModalEdit()}
                isShowList={isShowListEdit}
                onHandleToggleList={handleToggleListEdit}
                data={dataEdit}
                documentTypes={documentTypes}
                errors={errorsEdit}
                onHandleChangeDescription={(e) => handleChangeEdit({ data: 'description', e })}
                onHandleChangeName={(e) => handleChangeEdit({ data: 'name', e })}
                onHandleChangeType={(e) => handleChangeEdit({ data: 'type', e })}
                onHandleSelect={handleSelectEdit}
                onHandleSubmit={handleSubmitEdit}
                processing={processingEdit}
            />

        </>
    )
}

export default Documents
