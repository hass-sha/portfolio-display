export class HeaderLinks {
  public name: {
    en: string,
    fr: string,
    ur: string
  };
  public url: string;
  public fragmentation: string;
  public dataToggle: string;
  public dataTarget: string;

  constructor(name: { en: string; fr: string; ur: string }, url: string, fragmentation: string, dataToggle: string, dataTarget: string) {
    this.name = name;
    this.url = url;
    this.fragmentation = fragmentation;
    this.dataToggle = dataToggle;
    this.dataTarget = dataTarget;
  }
}
