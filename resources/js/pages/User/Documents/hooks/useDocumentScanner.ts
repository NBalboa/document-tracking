import { router, useForm } from '@inertiajs/react';
import QrScanner from 'qr-scanner';
import { useCallback, useEffect, useRef, useState } from 'react'
import { UpdateFormData } from './useDocuments';
import { toast } from 'react-toastify';
import TrackController from '@/actions/App/Http/Controllers/TrackController';
import DocumentController from '@/actions/App/Http/Controllers/DocumentController';



const useDocumentScanner = () => {
    const [isManual, setIsManual] = useState(false)
    const [isShowStatus, setIsShowStatus] = useState(false)
    const [isShowQrScanner, setIsShowQrScanner] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [qrResult, setQrResult] = useState<string | null>(null);
    const scannerRef = useRef<QrScanner | null>(null);

    const { data, setData, errors, post, processing, reset } = useForm<UpdateFormData>({
        remarks: "",
        status: 'received'
    })

    const handleToggleIsManual = () => {
        if (isManual) {
            // Going from manual → scan mode
            setIsManual(false);

        } else {
            // Going from scan → manual mode
            scannerRef.current?.stop();
            setIsManual(true);
        }

        setQrResult("")
    };


    const handleToggleIsShowStatus = () => setIsShowStatus(prev => !prev)
    const handleToggleQrScanner = () => setIsShowQrScanner(prev => !prev)

    const handleSelectStatus = (value: string) => {
        setData('status', value)
        handleToggleIsShowStatus()
    }

    const handleChange = ({
        e,
        data
    }: {
        e: React.ChangeEvent<HTMLTextAreaElement>,
        data: keyof UpdateFormData
    }) => {
        setData(data, e.target.value)
    }

    const handleSubmitUpdate = useCallback(() => {

        if (!processing && qrResult) {
            post(isManual ? TrackController.store.url({ id: qrResult }) : qrResult, {
                onSuccess: () => {
                    reset()
                    handleToggleQrScanner()
                    if (qrResult.startsWith('/tracks')) {
                        router.get(`${DocumentController.index.url()}${qrResult}`)
                    }
                    else {
                        router.get(`${DocumentController.index.url()}/tracks/${qrResult}`)
                    }
                },
                onError: (errors: Partial<Record<keyof UpdateFormData, string>>) => {
                    toast.warn(`${errors.status}. Please try again.`);
                    setIsShowQrScanner(false);
                    setQrResult("");
                },
                replace: true
            })
        }
    }, [isManual, post, processing, qrResult, reset])


    useEffect(() => {
        if (!isShowQrScanner || isManual || !videoRef.current) return;

        scannerRef.current = new QrScanner(
            videoRef.current,
            (result) => {
                setQrResult(result.data);
                scannerRef.current?.stop();
            },
            {
                highlightScanRegion: true,
                highlightCodeOutline: true,
                maxScansPerSecond: 500,
            }
        );

        scannerRef.current.start();

        return () => {
            scannerRef.current?.stop();
            scannerRef.current?.destroy();
            scannerRef.current = null;
        };
    }, [isShowQrScanner, isManual]);


    useEffect(() => {
        if (!qrResult || isManual) return;
        handleSubmitUpdate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qrResult])


    return {
        isShowQrScanner,
        handleToggleQrScanner,
        videoRef,
        isShowStatus,
        qrResult,
        data,
        handleToggleIsShowStatus,
        errors,
        handleSelectStatus,
        handleChange,
        isManual,
        handleToggleIsManual,
        handleSubmitUpdate,
        setQrResult
    }
}

export default useDocumentScanner
