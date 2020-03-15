import Envionment from "../environments/EnvironmentView";

export interface Project {
  id: string,
  name: string

  environments?: Envionment[]
}
