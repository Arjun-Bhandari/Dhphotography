import { packages } from "@/content/packages";

/** Options for "What are you celebrating?", following the packages. */
export const occasions = [
  { value: "Wedding", label: "Wedding" },
  { value: "Pre-wedding and wedding", label: `Pre-wedding and wedding (${packages[0].name})` },
  { value: "Pre, wedding and post-wedding", label: `Pre, wedding and post-wedding (${packages[1].name})` },
  { value: "Programme or pooja", label: "School function, pooja or ceremony" },
  { value: "Birthday", label: "Birthday" },
  { value: "Something else", label: "Something else" },
];
