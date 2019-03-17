import Service, { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';


export default class ToastService extends Service {
    // from ember-cli-notifications
    @service('notification-messages') notifications;

    info(msg, title = '', options = {}) {
      this.createToast('info', msg, title, options);
    }

    success(msg, title = '', options = {}) {
      this.createToast('success', msg, title, options);
    }

    warning(msg, title = '', options = {}) {
      this.createToast('warning', msg, title, options);
    }

    error(msg, title = '', options = {}) {
      this.createToast('error', msg, title, options);
    }

    createToast(status, msg, title, options) {
      const message = isPresent(title) ? `${title}: ${msg}` : msg;


      this.notifications.addNotification({
        autoClear: true,
        clearDuration: 4000,
        ...options,
        message: message || 'status',
        type: status,
      });
    }
}
