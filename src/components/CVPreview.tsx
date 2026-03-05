import React from 'react';
import { jsPDF } from 'jspdf';
import { Download, RefreshCw, Copy, Check, Loader2, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { PDFDocument } from 'pdf-lib';

interface CVPreviewProps {
  content: string;
  supportingDocs: File[];
  onReset: () => void;
  t: {
    title: string;
    description: string;
    copy: string;
    download: string;
    merging: string;
    createNew: string;
  };
}

export const CVPreview = ({ content, supportingDocs, onReset, t }: CVPreviewProps) => {
  const [copied, setCopied] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // 1. Generate Tailored CV PDF using jsPDF
      const doc = new jsPDF();
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const maxWidth = pageWidth - (margin * 2);
      const lines = doc.splitTextToSize(content, maxWidth);
      
      let cursorY = margin;
      const lineHeight = 5;
      const pageHeight = doc.internal.pageSize.getHeight();

      lines.forEach((line: string) => {
          if (cursorY + lineHeight > pageHeight - margin) {
              doc.addPage();
              cursorY = margin;
          }
          doc.text(line, margin, cursorY);
          cursorY += lineHeight;
      });

      // Get tailored CV as array buffer
      const cvBytes = doc.output('arraybuffer');

      // 2. Create final PDF document
      const pdfDoc = await PDFDocument.create();
      
      // Load tailored CV
      const cvPdf = await PDFDocument.load(cvBytes);
      const cvPages = await pdfDoc.copyPages(cvPdf, cvPdf.getPageIndices());
      cvPages.forEach(page => pdfDoc.addPage(page));

      // 3. Append supporting documents
      for (const file of supportingDocs) {
        const fileBytes = await file.arrayBuffer();

        if (file.type === 'application/pdf') {
          try {
            const supportingPdf = await PDFDocument.load(fileBytes);
            const supportingPages = await pdfDoc.copyPages(supportingPdf, supportingPdf.getPageIndices());
            supportingPages.forEach(page => pdfDoc.addPage(page));
          } catch (e) {
            console.error(`Failed to merge PDF: ${file.name}`, e);
          }
        } else if (file.type.startsWith('image/')) {
          try {
            let image;
            if (file.type === 'image/jpeg') {
              image = await pdfDoc.embedJpg(fileBytes);
            } else if (file.type === 'image/png') {
              image = await pdfDoc.embedPng(fileBytes);
            } else {
              continue;
            }

            if (image) {
              const page = pdfDoc.addPage();
              const { width, height } = image.scale(1);
              
              const pWidth = page.getWidth();
              const pHeight = page.getHeight();
              const m = 50;
              const maxW = pWidth - (m * 2);
              const maxH = pHeight - (m * 2);

              let dims = image.scale(1);
              if (width > maxW || height > maxH) {
                  const scaleFactor = Math.min(maxW / width, maxH / height);
                  dims = image.scale(scaleFactor);
              }

              page.drawImage(image, {
                x: (pWidth / 2) - (dims.width / 2),
                y: pHeight - m - dims.height,
                width: dims.width,
                height: dims.height,
              });
            }
          } catch (e) {
            console.error(`Failed to merge Image: ${file.name}`, e);
          }
        }
      }

      // 4. Save and Download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'tailored_cv.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (err) {
      console.error("PDF Generation failed", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto space-y-6"
    >
      {/* Info banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3 text-sm text-emerald-800">
        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p>{t.description}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-emerald-50 border-b border-emerald-100 p-4 flex justify-between items-center">
          <h3 className="font-semibold text-emerald-800">{t.title}</h3>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600 hover:text-emerald-600 hover:shadow-sm"
              title={t.copy}
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isDownloading ? t.merging : t.download}
            </button>
          </div>
        </div>
        <div className="p-8 md:p-12 bg-white min-h-[500px]">
          <div className="prose max-w-none whitespace-pre-wrap font-serif text-gray-800 leading-relaxed">
            {content}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          {t.createNew}
        </button>
      </div>
    </motion.div>
  );
};
