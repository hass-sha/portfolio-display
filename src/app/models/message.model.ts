export class Message {
  public to: string;
  public from: {
    email: string,
    name: string
  };
  public subject: string;
  public text: string;


  constructor(to: string, from: { email: string; name: string }, subject: string, text: string) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.text = text;
  }
}
