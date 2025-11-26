import type i18next from "i18next";

export const getAnnouncementsPageBreadcrumbs = (t: typeof i18next.t, isCreate = false) => {
  const baseBreadcrumbs = [
    { title: t("announcements.breadcrumbs.dashboard"), href: "/" },
    {
      title: t("announcements.breadcrumbs.announcements"),
      href: "/dashboard/announcements",
    },
  ];

  return isCreate
    ? [
        ...baseBreadcrumbs,
        {
          title: t("announcements.breadcrumbs.createAnnouncement"),
          href: "/dashboard/admin/announcements/new",
        },
      ]
    : baseBreadcrumbs;
};
