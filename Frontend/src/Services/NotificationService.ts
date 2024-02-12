import { Notyf } from "notyf";

class NotificationService {
    private notification = new Notyf({
        duration: 2500,
        position: { x: 'center', y: 'top' },
        ripple: true,
        types: [
            {
                type: 'success',
                background: '#88C8BC',
                icon: false,
                className: 'custom-notification',
            },
            {
                type: 'error',
                background: '#FD676A',
                icon: false,
                className: 'custom-notification',
            },
        ],
    });

    public success(message: string): void {
        this.notification.success(message);
    }

    public error(err: string): void {
        const message = this.extractErrorMessage(err);
        this.notification.error(message);
    }

    private extractErrorMessage(err: any): string {
        if (typeof err === "string") return err;
        if (typeof err.response?.data === "string") return err.response?.data; // axios
        if (Array.isArray(err.response?.data)) return err.response?.data[0]; // axios
        if (typeof err.message === "string") return err.message;
        return "Unknown error";
    }
}

const notificationService = new NotificationService();
export default notificationService;