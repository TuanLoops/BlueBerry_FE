import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LockIcon from "@mui/icons-material/Lock";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

function PrivacyIcon({ privacyLevel, className }) {
  switch (privacyLevel) {
    case "PUBLIC": {
      return <PublicOutlinedIcon className={className} />;
    }
    case "FRIENDS": {
      return <PeopleAltIcon className={className} />;
    }
    case "PRIVATE": {
      return <LockIcon className={className} />;
    }
  }
}
export default PrivacyIcon;
