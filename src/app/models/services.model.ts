export class Services {
  public icon: string;
  public description: {
    en?: string,
    fr?: string,
    ur?: string
  };
  public name: {
    en?: string,
    fr?: string,
    ur?: string
  };
  public toolsType: {
    en?: string,
    fr?: string,
    ur?: string
  };
  public tools: {
    en?: string[],
    fr?: string[],
    ur?: string[]
  };

  constructor(icon: string, description: { en?: string; fr?: string; ur?: string }, name: { en?: string; fr?: string; ur?: string },
              toolsType: { en?: string; fr?: string; ur?: string }, tools: { en?: string[]; fr?: string[]; ur?: string[] }) {
    this.icon = icon;
    this.description = description;
    this.name = name;
    this.toolsType = toolsType;
    this.tools = tools;
  }
}
