import sendgrid from '@sendgrid/mail';

const apiKey = 'xxxxxkey';

export function sendEmail(data: any) {
  sendgrid.setApiKey(apiKey);
  return sendgrid.send(data)
    .then(() => {
      return {publisher: 'sendGrid-api', status: 'success'};
    })
    .catch((error) => {
      return {publisher: 'sendGrid-api', status: 'error', data: error};
    });
}
