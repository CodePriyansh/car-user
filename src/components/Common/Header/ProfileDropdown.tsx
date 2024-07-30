import React, { useState } from "react";
import { Avatar, Menu, MenuItem, Divider, ListItemIcon } from "@mui/material";
import { Person, PrivacyTip, Settings, Logout } from "@mui/icons-material";
import { Images } from "@/assets/Images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

const ProfileDropdown = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const cookies =  new Cookies();
const router = useRouter()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    cookies.remove("user")
    cookies.remove("id")
    cookies.remove("token")
    router.push("/login");  // Navigate to the login page
  };

  const handleProfile = () => {
    handleClose();
    router.push("/dealer-profile");  // Navigate to the profile page
  }
  return (
    <>
      <div onClick={handleClick} className="cursor-pointer h-full w-12">
        <Image
        
          width={1000}
          height={100}
          className="hidden sm:flex h-12 rounded-full"
          src={user?.profileImage || Images.demoProfile}
          alt="profile"
        />
        <Image
          className="sm:hidden h-8 w-full rounded-full"
          src={user?.profileImage || Images.userProfile}
          alt="Profile"
          width={1000}
          height={1000}


        />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 1,
          sx: {
            overflow: "visible",
            mt: 1.5,
            "& .MuiMenuItem-root": {
                fontFamily: "rajdhani",
                fontWeight: "500",
                fontSize: "18px",
                color: "black",
                letterSpacing: "0.5px",
              
              padding: "4px 25px",
              margin: "4px",
              minHeight: "35px",
              "&:hover": {
                backgroundColor: "rgba(55, 65, 81, 0.1)" // Tailwind bg-gray-600
              }
            },
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "& .MuiDivider-root": {
              margin: "4px 10px"
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem  onClick={handleProfile} >
          <ListItemIcon>
            <Image
              src={Images.viewProfile}
              alt="profile"
              width={20}
              height={20}
            />
          </ListItemIcon>
          View Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Image
              src={Images.privacyPolicy}
              alt="profile"
              width={22}
              height={22}
            />
          </ListItemIcon>
          Privacy Policy
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Image src={Images.setting} alt="profile" width={20} height={20} />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Image src={Images.logout} alt="profile" width={15} height={15} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileDropdown;
