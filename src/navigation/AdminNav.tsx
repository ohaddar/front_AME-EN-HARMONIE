import * as React from "react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { AppProvider } from "@toolpad/core/AppProvider";
import {
  DashboardLayout,
  SidebarFooterProps,
} from "@toolpad/core/DashboardLayout";
import {
  Account,
  AccountPreview,
  AccountPopoverFooter,
  SignOutButton,
  AccountPreviewProps,
} from "@toolpad/core/Account";
import type { Navigation, Router, Session } from "@toolpad/core/AppProvider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ArticleIcon from "@mui/icons-material/Article";
import theme from "../theme";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import logo from "../assets/logo.svg";
const NAVIGATION: Navigation = [
  {
    segment: "admin/dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "admin/create-blog",
    title: "Creez un nouveau blog",
    icon: <ArticleIcon />,
  },
  {
    segment: "admin/users",
    title: "Utilisateurs",
    icon: <PeopleIcon />,
  },
  {
    segment: "admin/tests",
    title: "Tests Utilisateurs",
    icon: <AssessmentIcon />,
  },
  {
    segment: "admin/feedbacks",
    title: "Retour Utilisateurs",
    icon: <FeedbackIcon />,
  },
  {
    segment: "admin/blogs",
    title: "Blogs",
    icon: <ArticleIcon />,
  },
];

const AccountSidebarPreview = (
  props: AccountPreviewProps & { mini: boolean },
) => {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? "condensed" : "expanded"}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
};

const SidebarFooterAccountPopover = () => {
  return (
    <Stack direction="column">
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
};

const createPreviewComponent = (mini: boolean) => {
  const PreviewComponent = (props: AccountPreviewProps) => {
    return <AccountSidebarPreview {...props} mini={mini} />;
  };
  return PreviewComponent;
};

const SidebarFooterAccount = ({ mini }: SidebarFooterProps) => {
  const PreviewComponent = React.useMemo(
    () => createPreviewComponent(mini),
    [mini],
  );
  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: SidebarFooterAccountPopover,
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: "left", vertical: "bottom" },
          anchorOrigin: { horizontal: "right", vertical: "bottom" },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.32)"})`,
                mt: 1,
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translate(-50%, -50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
};

interface AdminProps {
  child: React.ReactNode;
}

const AdminNav = (props: AdminProps) => {
  const { child } = props;
  const { currentUser, signOut } = useAuth();
  const navigateTo = useNavigate();

  const [pathname, setPathname] = React.useState("/dashboard");

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        setPathname(String(path));
        navigateTo(path);
      },
    };
  }, [pathname]);

  const adminSession: Session = {
    user: {
      name: currentUser?.firstname + " " + currentUser?.lastname,
      email: currentUser?.email,
      image: currentUser?.avatar,
    },
  };

  const [session, setSession] = React.useState<Session | null>(adminSession);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(adminSession);
      },
      signOut: () => {
        setSession(null);
        signOut();
        navigateTo("/connect");
      },
    };
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      branding={{
        logo: <img src={logo} alt="logo" />,
        title: "",
        homeUrl: "/admin/dashboard",
      }}
      theme={theme}
      authentication={authentication}
      session={session}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: () => null,
          sidebarFooter: SidebarFooterAccount,
        }}
      >
        {child}
      </DashboardLayout>
    </AppProvider>
  );
};

export default AdminNav;
