import Swal, { SweetAlertIcon } from "sweetalert2";

interface fireToastProps {
  message: string;
  icon: SweetAlertIcon;
  duration?: number;
  showTimer?: boolean;
}

function fireToast({ icon, message, duration, showTimer }: fireToastProps) {
  Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: duration ?? 3000,
    timerProgressBar: showTimer ?? true,

    didOpen: (toast: HTMLElement) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  }).fire({
    icon: icon,
    title: message,
  });
}

interface confirmDialogProps {
  question: string;
  confirmButtonColor?: string;
}

export default class AlertHelper {
  static errorToast = (
    message: string,
    duration?: number,
    showTimer?: boolean
  ) => {
    fireToast({
      icon: "error",
      message: message,
      duration: duration,
      showTimer: showTimer,
    });
  };

  static infoToast = (message: string, duration?: number) => {
    fireToast({
      icon: "info",
      message: message,
      duration: duration,
    });
  };

  static successToast = (message: string, duration?: number) => {
    fireToast({
      icon: "success",
      message: message,
      duration: duration,
    });
  };

  static textInputAlert = (
    question: string,
    onConfirm: (value: any) => void
  ) => {
    Swal.fire({
      icon: "question",
      title: question,
      input: "text",
      showCancelButton: true,
    }).then((value: any) => {
      if (value.isConfirmed) {
        onConfirm(value.value);
      }
    });
  };

  static numberInputAlert = (
    question: string,
    onConfirm: (value: any) => void
  ) => {
    return Swal.fire({
      icon: "question",
      html: `
      <span id="number-input-alert">
        <small>Appalling</small>
        <input
          type="range"
          class="swal2-input"
          min="1"
          max="10"
          id="range-value"> 
        <small>Masterpiece</small>
      </span>`,
      title: question,
      showCancelButton: true,
    }).then((value: any) => {
      if (value.isConfirmed) {
        onConfirm(
          (document.getElementById("range-value") as HTMLInputElement).value
        );
      } else {
        onConfirm(undefined);
      }
    });
  };

  static fileInputAlert = (
    question: string,
    accept: string,
    onConfirm: (value: any) => void
  ) => {
    Swal.fire({
      title: question,
      input: "file",
      inputAttributes: {
        accept: accept,
      },
      showCancelButton: true,
    }).then((value: any) => {
      if (value.isConfirmed) {
        onConfirm(value.value);
      }
    });
  };

  static successAlert = (title: string, message?: string) => {
    Swal.fire({
      icon: "success",
      title: title,
      text: message,
    });
  };

  static infoAlert = (message: string) => {
    return Swal.fire({
      icon: "info",
      title: message,
    });
  };

  static showLoading = (message: string): any => {
    let loading = Swal.fire({
      title: message,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    return loading;
  };

  static confirmDialog = async ({
    question,
    confirmButtonColor,
  }: confirmDialogProps) => {
    return Swal.fire({
      icon: "question",
      title: question,
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor ?? "red",
    }).then((value: any) => {
      return value.isConfirmed;
    });
  };
}
