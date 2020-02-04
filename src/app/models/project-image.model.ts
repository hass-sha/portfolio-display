export class ProjectImage {
  public name: {
    en?: string,
    fr?: string,
    ur?: string
  };
  public url: string;
  public altText: {
    en?: string,
    fr?: string,
    ur?: string
  };
  public technologies: {
    en?: string,
    fr?: string,
    ur?: string
  };

  constructor(
    name: { en?: string; fr?: string; ur?: string }, url: string, altText: { en?: string; fr?: string; ur?: string },
    technologies: { en?: string; fr?: string; ur?: string }
  ) {
    this.name = name;
    this.url = url;
    this.altText = altText;
    this.technologies = technologies;
  }
}
