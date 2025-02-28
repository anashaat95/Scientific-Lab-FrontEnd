"use client";
import { Avatar, Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { IEquipment } from "../equipmentsInterfaces";

const EquipmentAvatar = ({ equipment }: { equipment: IEquipment }) => {
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = equipment.image_url?.trim() ? equipment.image_url : "/images/tools.png";

  return (
    <Box sx={{ position: "relative", display: "inline-block" }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Avatar src={imageUrl} alt={equipment.name} sx={{ width: 75, height: 75, cursor: "pointer" }} />

      {isHovered && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "100%",
            ml: 1,
            zIndex: 5000,
            width: 250,
            height: 250,
            bgcolor: "background.paper",
            // borderRadius: 1,
            boxShadow: 3,
            overflow: "visible",
            border: "1px solid #ddd",
          }}
        >
          <Image src={imageUrl} alt={equipment.name} width={250} height={250} style={{ objectFit: "contain" }} />
        </Box>
      )}
    </Box>
  );
};

export default EquipmentAvatar;
