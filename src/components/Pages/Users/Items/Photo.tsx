import * as React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IPhotoParams } from "../../../../interfaces/index";
import AvatarEditor from "react-avatar-editor";

const Photo: React.FC<{
  photo?: string | null;
  params?: IPhotoParams;
  check?: boolean;
}> = ({ photo, params, check }) => {
  return (
    <>
      {photo && params ? (
        <AvatarEditor
          image={photo}
          width={113}
          height={113}
          border={1}
          color={[255, 255, 255, 1]}
          scale={params.scale}
          position={params.position}
          borderRadius={70}
          // //@ts-ignore
          //disableHiDPIScaling
          style={{ cursor: `auto` }}
        />
      ) : (
        <AccountCircleIcon
          sx={{
            color: `lightgrey`,
            width: `130px`,
            height: `130px`,
            backgroundColor: check ? `red` : `transparent`,
          }}
        />
      )}
    </>
  );
};

export default Photo;