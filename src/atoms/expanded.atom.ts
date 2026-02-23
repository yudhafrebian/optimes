import { atomWithStorage } from "jotai/utils";

const expandedAtom = atomWithStorage<boolean>("job-event:isExpanded", true);

export default expandedAtom;
