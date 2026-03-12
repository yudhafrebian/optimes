import { atomWithStorage } from "jotai/utils";

const workCenterAtom = atomWithStorage<string | undefined>("work-center-path", undefined);

export default workCenterAtom;