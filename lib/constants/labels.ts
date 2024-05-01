import { PerCollection } from "../types/perCollection";

export const perCollectionSEOTitle = {
  sandbox: "Washington Gas",
  karma_education: "Karma Education",
  elitebuild: "EliteBuild",
  support: "Knowledgebase",
  pdf: "PDF print",
  default: "default"
} as const satisfies PerCollection<string>;