import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngry,
  faGrinTongueSquint,
  faGrimace,
  faGrin,
  faMeh,
  faSadTear,
  faSurprise,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

export const createFaLibrary = () => {
  library.add(
    faAngry,
    faGrinTongueSquint,
    faGrimace,
    faGrin,
    faMeh,
    faSadTear,
    faSurprise,
    faTimesCircle
  );
};
