
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="rounded-2xl shadow-xl border-0 bg-white/95 backdrop-blur-lg">
            <div className="grid gap-1">
              {title && <ToastTitle className="text-slate-800 font-semibold">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-slate-600">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="rounded-xl" />
          </Toast>
        )
      })}
      <ToastViewport className="fixed top-6 left-4 right-4 z-[100] flex max-h-screen w-auto flex-col-reverse p-0 sm:top-6 sm:right-6 sm:left-auto sm:max-w-[420px]" />
    </ToastProvider>
  )
}
