import { RefObject } from "react";
import TrackController from "@/actions/App/Http/Controllers/TrackController";
import QR from "react-qr-code";

const QRCode = ({
    id,
    wrapperRef,
}: {
    id: string,
    wrapperRef: RefObject<HTMLDivElement | null>,
}) => {

    const handleDownload = () => {
        const svg = wrapperRef.current?.querySelector("svg");
        if (!svg) return;

        const serializer = new XMLSerializer();
        const svgData = serializer.serializeToString(svg);

        const img = new Image();
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 300;
            canvas.height = 300;
            const ctx = canvas.getContext("2d");

            if (!ctx) return;

            // Optional white background
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const pngFile = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = pngFile;
            link.download = `qr-${id}.png`;
            link.click();

            URL.revokeObjectURL(url);
        };

        img.src = url;
    };

    return (
        <div ref={wrapperRef} className="cursor-pointer flex justify-center" onClick={handleDownload}>
            <QR value={TrackController.store.url({ id })} size={100} />
        </div>
    );
};

export default QRCode;
