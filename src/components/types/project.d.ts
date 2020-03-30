import Environment from "../environments/EnvironmentView";

export interface Project {
  id: string,
  name: string

  environments?: Environment[]
}
