"use client";

import {
  AlertTriangle,
  Loader2,
  X,
} from "lucide-react";

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  message: string;

  confirmText?: string;
  cancelText?: string;

  loading?: boolean;
  danger?: boolean;

  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
}

export default function ConfirmationModal({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  danger = false,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onCancel();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        className="
          w-full
          max-w-md
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div
            className={`
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              ${
                danger
                  ? "bg-red-50 text-red-600"
                  : "bg-amber-50 text-amber-600"
              }
            `}
          >
            <AlertTriangle size={23} />
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            aria-label="Close confirmation"
            className="
              rounded-xl
              p-2
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT */}

        <div className="px-6 pb-6 pt-4">
          <h2
            id="confirmation-title"
            className="
              text-xl
              font-bold
              text-[#0A2A1F]
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-slate-500
            "
          >
            {message}
          </p>

          {/* ACTIONS */}

          <div className="mt-7 flex justify-end gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={onCancel}
              className="
                rounded-xl
                border
                border-slate-200
                px-5
                py-2.5
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {cancelText}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={onConfirm}
              className={`
                flex
                min-w-[110px]
                items-center
                justify-center
                gap-2
                rounded-xl
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                disabled:cursor-not-allowed
                disabled:opacity-60

                ${
                  danger
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-[#0A2A1F] hover:bg-[#123D30]"
                }
              `}
            >
              {loading && (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              )}

              {loading ? "Processing..." : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}